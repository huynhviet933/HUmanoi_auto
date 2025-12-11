# HUmanoi_auto
🚀 HAN AUTO BOT
Auto Task – Web3 – Proxy Auth – Multi-thread – Random VN Username

Tool này giúp tự động hóa toàn bộ quy trình làm nhiệm vụ (tasks) trên Humanoid Network (HAN):

Tự login ví bằng private key

Tự random User-Agent

Hỗ trợ proxy có user/pass

Tự đổi username X (Twitter) bằng tên tiếng Việt ngẫu nhiên

Chạy full task: Follow – Join – Tweet – Share

Tự retry proxy lỗi

Multithread xử lý nhiều ví liên tục

📦 1. Yêu cầu môi trường

Node.js v16+

File dữ liệu:

privatekey.txt

proxy.txt (nếu dùng proxy)

user_agents.txt

📁 2. Cài đặt
git clone https://github.com/YOUR_NAME/han-auto.git
cd han-auto
npm install


Dependencies được khai báo trong package.json: axios, chalk, dotenv, ethers, https-proxy-agent… 

package

📄 3. Chuẩn bị file dữ liệu
✔ privatekey.txt

1 private key mỗi dòng, không có dấu ngoặc kép.

0xabc123...
0xdeadbeef...

✔ proxy.txt (tùy chọn)

Hỗ trợ full format:

http://user:pass@host:port

✔ user_agents.txt

Mỗi UA 1 dòng:

Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...
Mozilla/5.0 (Linux; Android 10; SM-J415FN) AppleWebKit/537.36...

⚙ 4. Cách chạy tool
node Up.js


Tool sẽ hỏi:

Use Proxy? (y/n):
Number of multithreaded:
Referral Link:

🔥 5. Tính năng chính
⭐ Login ví bằng Private Key

Lấy nonce

Ký message bằng Ethers.js

Gửi signature lên server xác thực

Tự retry khi proxy chết
→ Tất cả logic nằm trong loginWallet() và loginWithRetry() 

Up

⭐ User-Agent Random

Mỗi ví lấy ngẫu nhiên UA từ user_agents.txt.

⭐ Proxy Auth Support

Dùng HttpsProxyAgent để truyền:

user

pass

host

port

Tool tự đổi proxy khi lỗi.

⭐ Random Username Tiếng Việt

Sinh họ + tên random:

NguyenAnh23
PhamBao77
LeMinh12


Được implement tại hàm randomVietnamUsername() 

Up

⭐ Chạy Full Tasks

Tool tự đọc danh sách nhiệm vụ:

SOCIAL_FOLLOW

TELEGRAM_JOIN

DISCORD_JOIN

SOCIAL_SHARE

SOCIAL_TWEET (tự tạo tweetId random)

→ Xử lý tại runTask() 

Up

⭐ Chạy lần lượt tất cả ví

Mỗi ví:

Login

Random UA

Random Proxy

Update username

Làm full task

Chờ delay random

Chuyển ví tiếp theo

→ Thực thi tại runWallet() và MAIN() 

Up

📊 6. Output Console

Ví dụ:

▶ WALLET 1/50
User-Agent: Mozilla/5.0 (Windows NT 10.0...
→ Login OK (0x12ab...89ff)
Using Proxy: http://user:pass@ip:port

→ Update X Username
✓ Username updated: NguyenAnh55

→ Tasks Found: 14
▶ Task: Follow Twitter             ✓ Completed (50 pts)
...
▶ Total Score: 320 Points

▶ Đợi 11 giây để chuyển ví tiếp...

📜 7. License

MIT — bạn có thể chỉnh sửa, thương mại hoặc chia sẻ lại tự do.

🤝 8. Credits

Maintainer: YourName

⬇ 9. Cấu trúc thư mục gợi ý
han-auto/
 ├── Up.js
 ├── package.json
 ├── package-lock.json
 ├── privatekey.txt
 ├── proxy.txt
 ├── user_agents.txt
 └── README.md  ← dán file này
