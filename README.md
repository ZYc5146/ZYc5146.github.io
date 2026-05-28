# ZYc5146.github.io

本项目是 **张阳城 (ZhangYangcheng)** 的个人主页仓库。通过 **豆包 AI**、**CodeWhale（DeepSeek-V4-Pro）** 协作构建，记录了如何利用 GitHub Actions 实现从代码推送自动化部署到个人域名的全过程。

**🌐 预览地址：[https://zhangyangcheng.xyz](https://zhangyangcheng.xyz)**

---

### ✨ 特性 (Features)
- **自动化部署**：向 `main` 分支推送代码时自动部署到 GitHub Pages，无需手动操作。
- **Tailwind CSS 构建流水线**：通过 npm 安装依赖并编译 Tailwind CSS，生成生产级样式。
- **安全验证**：集成 Cloudflare Turnstile，保护页面免受恶意访问。
- **高效 CI/CD**：基于 GitHub Actions 的轻量高效持续集成与部署工作流。

### 🛠️ 技术栈 (Tech Stack)
- **前端**：HTML + Tailwind CSS + JavaScript
- **构建工具**：PostCSS、Tailwind CSS CLI
- **安全**：Cloudflare Turnstile
- **CI/CD**：GitHub Actions (`peaceiris/actions-gh-pages`)
- **域名**：zhangyangcheng.xyz（CNAME）

### 🚀 部署流程 (Deployment Workflow)
#### 触发条件
- 仅当代码被推送到 `main` 分支时，自动化流水线才会启动。

#### 部署步骤
1. **拉取代码**：GitHub Actions 服务器将仓库最新代码下载到运行环境。
2. **设置 Node.js**：安装 Node.js 20 运行环境。
3. **安装依赖**：执行 `npm ci` 安装项目依赖（Tailwind CSS、PostCSS 等）。
4. **构建样式**：运行 `npm run build` 编译 Tailwind CSS，生成 `output.css`。
5. **部署到 Pages**：使用 `peaceiris/actions-gh-pages` 插件将构建产物同步至 GitHub Pages 服务。

### 📝 使用方法 (Usage)
1. **克隆仓库**：
   ```bash
   git clone https://github.com/ZYc5146/ZYc5146.github.io.git
   ```
2. **安装依赖**：
   ```bash
   npm install
   ```
3. **修改内容**：根据需求编辑根目录的静态文件（如 `index.html`）及样式源文件 `input.css`。
4. **本地预览**（可选）：
   ```bash
   npm run build
   ```
   然后直接用浏览器打开 `index.html`。
5. **推送部署**：
   ```bash
   git add .
   git commit -m "update site"
   git push origin main
   ```

### 🛠️ 配置详情 (Configuration Details)
核心配置文件 `.github/workflows/deploy.yml` 如下：

```yaml
name: Deploy GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build Tailwind CSS
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_branch: main
          publish_dir: ./
```

### 📚 相关资源 (Related Resources)
- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [peaceiris/actions-gh-pages 插件文档](https://github.com/peaceiris/actions-gh-pages)
- [GitHub Actions 官方文档](https://docs.github.com/en/actions)
- [Tailwind CSS 官方文档](https://tailwindcss.com/docs)

---

### ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=ZYc5146/ZYc5146.github.io&type=date&legend=top-left)](https://www.star-history.com/#ZYc5146/ZYc5146.github.io&type=date&legend=top-left)
