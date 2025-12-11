import axios from "axios";
import { ethers } from "ethers";
import fs from "fs";
import readline from "readline";
import chalk from "chalk";
import HttpsProxyAgent from "https-proxy-agent";

// ======= CONFIG =======
const API = "https://app.humanoidnetwork.org/api";

// Random helpers
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const random = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

// ======= INPUT =======
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, res));

// ======= LOAD FILE =======
function loadList(file) {
    if (!fs.existsSync(file)) return [];
    return fs.readFileSync(file, "utf-8").split("\n").map(x => x.trim()).filter(Boolean);
}

// ======= RANDOM USERNAME VN =======
function randomVietnamUsername() {
    const hoList = ["Nguyen","Tran","Le","Pham","Hoang","Huynh","Phan","Vu","Vo","Dang","Do","Bui","Duong","Dinh"];
    const tenList = ["Linh","Nhi","Thanh","Hung","Anh","Trung","Bao","Khanh","Hau","Huy","Quyen","Ngan","Minh","Thien","Thu","Nam","Long","Triet","Khang","Hieu"];

    const ho = hoList[random(0, hoList.length - 1)];
    const ten = tenList[random(0, tenList.length - 1)];
    const num = random(1, 99);

    return ho + ten + num;
}

// ===== RANDOM TWEETID =====
function randomTweetId() {
    return "Nice_" + Date.now() + "_" + random(1000, 9999);
}

// ======= AXIOS CLIENT WITH PROXY AUTH =======
function apiClient(token, proxy, ua) {
    const config = {
        baseURL: API,
        timeout: 20000,
        headers: {
            "User-Agent": ua,
            "Content-Type": "application/json"
        },
        proxy: false      // IMPORTANT: disable axios default proxy
    };

    if (token) config.headers["Authorization"] = `Bearer ${token}`;

    if (proxy) {
        // Create agent for proxy with auth
        const agent = new HttpsProxyAgent(proxy);
        config.httpAgent = agent;
        config.httpsAgent = agent;
    }

    return axios.create(config);
}

// ======= LOGIN WALLET =======
async function loginWallet(pk, proxy, ua, ref) {
    const wallet = new ethers.Wallet(pk);
    const address = await wallet.getAddress();

    const api = apiClient(null, proxy, ua);

    const nonceRes = await api.post("/auth/nonce", { walletAddress: address, refLink: ref });
    const msg = nonceRes.data.message;

    const sig = await wallet.signMessage(msg);

    const authRes = await api.post("/auth/authenticate", {
        walletAddress: address,
        message: msg,
        signature: sig
    });

    const token = authRes.data.token;
    const session = apiClient(token, proxy, ua);

    return { address, session };
}

// ======= LOGIN WITH RETRY PROXY =======
async function loginWithRetry(pk, proxies, ua, ref) {
    let attempt = 0;

    while (true) {
        attempt++;

        const proxy = proxies.length ? proxies[random(0, proxies.length - 1)] : null;
        console.log(`→ Login attempt #${attempt} using proxy: ${proxy}`);

        try {
            const { address, session } = await loginWallet(pk, proxy, ua, ref);
            console.log(chalk.green(`✓ Login OK with proxy: ${proxy}`));
            return { address, session, proxy };
        } catch (err) {
            console.log(chalk.red(`✗ Proxy failed: ${proxy}`));
            console.log("→ Switching to next proxy...\n");
            await delay(700);
        }
    }
}

// ======= UPDATE X USERNAME =======
async function updateUsername(api) {
    console.log("→ Update X Username");

    while (true) {
        const username = randomVietnamUsername();
        console.log(`   Trying: ${username}`);

        try {
            const res = await api.post("/user/update-x-username", {
                twitterUsername: username
            });

            if (res.data?.success) {
                console.log(`   ${chalk.green("✓")} Username updated: ${username}`);
                return;
            }
        } catch (e) {
            console.log(`   ${chalk.red("✗")} Username taken, retrying...`);
        }

        await delay(400);
    }
}

// ======= GET TASKS =======
async function getTasks(api) {
    const res = await api.get("/tasks");
    return res.data;
}

// ======= RUN ONE TASK =======
async function runTask(api, task) {
    let data = {};

    if (task.type === "SOCIAL_FOLLOW") data = { url: task.requirements.url };
    if (task.type === "TELEGRAM_JOIN") data = { url: task.requirements.url };
    if (task.type === "DISCORD_JOIN") data = { url: task.requirements.url };
    if (task.type === "SOCIAL_SHARE") data = {};
    if (task.type === "SOCIAL_TWEET") data = { tweetId: randomTweetId() };

    await api.post("/tasks", { taskId: task.id, data });

    console.log(`▶ Task: ${task.title.padEnd(30)} ${chalk.green("✓")} Completed (${task.points} pts)`);

    if (task.type === "SOCIAL_TWEET") {
        console.log(`    (tweetId auto: ${data.tweetId})`);
    }

    await delay(random(3000, 7000));
}

// ======= RUN WALLET =======
async function runWallet(index, total, pk, proxies, agents, ref) {
    console.log("═══════════════════════════════════════════════════════");
    console.log(`▶ WALLET ${index}/${total}`);

    const ua = agents[random(0, agents.length - 1)];
    console.log(`   User-Agent: ${ua.slice(0, 60)}...`);

    const { address, session, proxy } = await loginWithRetry(pk, proxies, ua, ref);

    console.log(`→ Login OK (${address.slice(0, 6)}...${address.slice(-6)})`);
    console.log(`   Using Proxy: ${proxy}\n`);

    await updateUsername(session);

    const tasks = await getTasks(session);
    console.log(`\n→ Tasks Found: ${tasks.length}\n`);

    let totalPoints = 0;
    for (let task of tasks) {
        await runTask(session, task);
        totalPoints += (task.points || 0);
    }

    console.log(`\n▶ Total Score: ${totalPoints} Points`);

    const next = random(5000, 15000);
    console.log(`▶ Đợi ${Math.floor(next / 1000)} giây để chuyển ví tiếp...\n`);
    await delay(next);
}

// ======= MAIN =======
(async () => {
    console.log(chalk.cyan("\nHAN AUTO BOT – Proxy Auth Fixed Version\n"));

    const useProxy = (await ask("Use Proxy? (y/n): ")).trim().toLowerCase() === "y";
    const threads = Number(await ask("Number of multithreaded: "));
    const ref = await ask("Referral Link: ");
    console.log("");

    const pkList = loadList("privatekey.txt");
    const proxies = useProxy ? loadList("proxy.txt") : [];
    const agents = loadList("user_agents.txt");

    if (pkList.length === 0) {
        console.log(chalk.red("No private keys found in privatekey.txt"));
        process.exit();
    }

    console.log(`Loaded ${pkList.length} wallets`);
    console.log(`Loaded ${agents.length} user agents`);
    if (useProxy) console.log(`Loaded ${proxies.length} proxies`);
    console.log("");

    let i = 1;
    for (let pk of pkList) {
        await runWallet(i, pkList.length, pk, proxies, agents, ref);
        i++;
    }

    rl.close();
    console.log(chalk.green("\nDONE ALL WALLETS!\n"));
})();
