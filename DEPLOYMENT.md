# 🚀 如何將專案佈署到 Zeabur

Zeabur 是一個支援自動化佈署的平台，對於 Vite + React 專案非常友善。請按照以下步驟操作：

## 1. 登入 Zeabur
前往 [Zeabur 官網](https://zeabur.com) 並使用 GitHub 帳號登入。

## 2. 建立新專案
1. 在 Dashboard 點擊 **"Create Project"**。
2. 選擇離你最近的區域（例如 `pre-dev` 或 `Asia East`）。

## 3. 部署原始碼
1. 點擊 **"Deploy Service"**。
2. 選擇 **"Deploy your source code"**。
3. 授權 GitHub 存取權（如果你尚未執行此操作）。
4. 選擇你的儲存庫：`lawrence555-dev/Hokkaido_Summer_Trip_Planner`。

## 4. 自動偵測與佈署
Zeabur 會自動檢查你的代碼並發現這是一個 Vite 專案：
- **編譯指令**：它會自動運行 `npm install` 與 `npm run build`。
- **輸出目錄**：我已經在專案中新增了 `zbpack.json` 指定輸出目錄為 `dist`。

## 5. 綁定網域名稱
1. 佈署完成後，點擊該服務。
2. 切換到 **"Networking"** 標籤。
3. 點擊 **"Generate Domain"** 或綁定你自己的域名。

---
完成以上步驟後，你的北海道旅行手帖就會正式上線囉！✨
