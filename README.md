```md
# 🚀 HAN AUTO BOT – FULL HƯỚNG DẪN SỬ DỤNG TOOL (READY FOR GITHUB)

Dưới đây là **README.md hoàn chỉnh**, chỉ cần **copy nguyên khối** và dán lên GitHub → sẽ hiển thị block chuẩn, không lỗi format.

> Tool dựa trên các file bạn cung cấp:  
> - package.json :contentReference[oaicite:0]{index=0}  
> - package-lock.json :contentReference[oaicite:1]{index=1}  
> - Up.js (code chính) :contentReference[oaicite:2]{index=2}  

---

# 📌 1. GIỚI THIỆU
Đây là tool **HAN AUTO BOT**, dùng để:
- Auto login bằng private key
- Retry proxy cho đến khi login thành công
- Random User-Agent
- Random username X kiểu Việt Nam
- Auto làm tất cả nhiệm vụ `/tasks`
- Delay hợp lý để tránh flag
- Chạy tuần tự qua từng ví

Tool viết bằng **Node.js + Axios + Ethers + Proxy Agent**.

---

# 📦 2. CẦN CÀI ĐẶT

### ✔ Node.js 16+
Tải tại: https://nodejs.org

Kiểm tra:

```bash
node -v
npm -v
```

---

# 📁 3. CÀI ĐẶT TOOL

Clone code hoặc đặt vào thư mục bất kỳ:

```bash
npm install
```

Lệnh này sẽ tự cài dependency theo file:

- axios
- chalk
- dotenv
- ethers
- https-proxy-agent

(Theo đúng package.json của bạn.)

---

# 📝 4. CHUẨN BỊ DATA FILES

Trong thư mục chứa `Up.js`, tạo 3 file:

---

## 4.1. privatekey.txt

```txt
0xPRIVATE_KEY_1
0xPRIVATE_KEY_2
0xPRIVATE_KEY_3
```

Lưu ý:
- Mỗi dòng = 1 ví
- Không được để khoảng trắng dư
- Không dấu ngoặc kép

---

## 4.2. proxy.txt (tuỳ chọn)

```txt
http://user:pass@ip:port
http://ip:port
```

Nếu không dùng proxy:
- Khi tool hỏi **Use Proxy? (y/n)** → nhập `n`.

---

## 4.3. user_agents.txt

```txt
Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120 Safari/537
Mozilla/5.0 (Linux; Android 14) Chrome/120 Mobile Safari/537
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605
```

Tool sẽ random mỗi lần login.

---

# 📂 5. CẤU TRÚC THƯ MỤC

```txt
HAN-AUTO/
 ├── Up.js
 ├── package.json
 ├── package-lock.json
 ├── privatekey.txt
 ├── proxy.txt
 └── user_agents.txt
```

---

# ▶️ 6. CHẠY TOOL

Chạy lệnh:

```bash
node Up.js
```

Tool sẽ hỏi:

```
Use Proxy? (y/n):
Number of multithreaded:
Referral Link:
```

Giải thích:

- **Use Proxy?**  
  - `y` → dùng proxy trong proxy.txt  
  - `n` → bỏ qua proxy

- **Number of multithreaded:**  
  (Hiện code chưa dùng đa luồng thật, có thể nhập 1)

- **Referral Link:**  
  Dán link ref bạn muốn gắn.

---

# 🔄 7. FLOW HOẠT ĐỘNG CỦA TOOL

## ✔ LOGIN + RETRY PROXY  
Hàm `loginWithRetry()` sẽ:
- Pick random proxy
- Login
- Nếu die → log lỗi → thử proxy khác

Hoạt động đến khi thành công.

## ✔ RANDOM USERNAME X VIỆT NAM  
Dùng họ + tên + số:
- NguyenLinh33  
- PhamHuy77  
- LeMinh40  

## ✔ LẤY & CHẠY TOÀN BỘ TASK  
Tool tự động:

```
SOCIAL_FOLLOW
TELEGRAM_JOIN
DISCORD_JOIN
SOCIAL_SHARE
SOCIAL_TWEET (auto tạo tweetId fake)
```

Hoàn thành task → log điểm → delay 3–7s → tiếp tục.

## ✔ CHẠY TỪNG VÍ  
Sau mỗi ví:
- Log tổng điểm
- Delay random 5–15s
- Sang ví tiếp theo

---

# 🔐 8. LƯU Ý QUAN TRỌNG

Không bao giờ đưa các file sau lên GitHub:

```txt
privatekey.txt
proxy.txt
user_agents.txt
.env
```

Thêm vào `.gitignore`:

```txt
privatekey.txt
proxy.txt
user_agents.txt
.env
```

---

# 🎉 9. TÓM TẮT CHO NGƯỜI DÙNG

1. Tạo file privatekey.txt  
2. Tạo proxy.txt + user_agents.txt  
3. Chạy `npm install`  
4. Chạy `node Up.js`  
5. Treo máy → tool tự làm hết

---

# ✔ 10. DONE – CHỈ VIỆC COPY NGUYÊN KHỐI NÀY LÊN GITHUB

Toàn bộ nội dung đã được format lại chuẩn GitHub, nằm trong **một code block duy nhất** theo đúng rule bạn yêu cầu.

```

---

# ❤️ Support the Developer (Donate)

If you find this project useful and want to support further development, you can donate using any of the wallets below.  
Your support means a lot — thank you! 🙏

---

## 💸 Crypto Wallets

### 🔷 EVM (ETH / BNB / Arbitrum / Polygon / Base / Linea / zkSync / Optimism / Scroll)
```
0x4bAADCd4AB4Df11D121F1662e048Dd84261c40b2
```

### 🌕 Aptos
```
0x64e46626b1213e3c0e66e733a014f4d453e322e20a0630dd428ef8e6058ae0df
```

### 🟧 Bitcoin (BTC)
```
bc1qqhxa6yvaey0fyed8gngpx2p52uhtzxfj43yju0
```

### 🔵 TON
```
UQDGarW35S8X03zr6vn-iKEoh5as69D7Ar-xU91kORsF2lLn
```

### 🟣 Sui
```
0x26924fffb59be46bd3a527a48f66babfe8d0dcb4a7084c38a18e8b56764feb66
```

### 🔺 Tron (TRX / USDT-TRC20)
```
TPhcXjHrg22kvv7jKKMrhPhBr167FFV8vN
```

### 🟩 Solana (SOL)
```
FBf5yRzFzXhi447mKNKCRedV2jVbsmmF6iRdgi3MLmga
```

---

## ⚡ Thank You!

Every donation helps keep this project alive and encourages more updates, features, and improvements.  
Thank you for your support! ❤️

---

