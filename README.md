# ZYc5146.github.io

本项目是 **张阳城 (Yangcheng Zhang)** 的个人主页仓库。通过 **豆包 AI** 协作构建，记录了如何利用 GitHub Actions 实现从代码推送自动化部署到个人域名的全过程。

**🌐 预览地址：[https://zhangyangcheng.xyz](https://zhangyangcheng.xyz)**

---

### ✨ 特性 (Features)
- **自动化部署**：向 `main` 分支推送代码时自动部署到 GitHub Pages，无需手动操作。
- **直接部署**：直接部署根目录内容，无需额外构建步骤，流程更简单。
- **高效 CI/CD**：基于 GitHub Actions 的轻量高效持续集成与部署工作流。

### 🚀 部署流程 (Deployment Workflow)
#### 触发条件
- 仅当代码被推送到 `main` 分支时，自动化流水线才会启动。

#### 部署步骤
1. **拉取代码**：GitHub Actions 服务器将仓库最新代码下载到运行环境。
2. **部署到 Pages**：使用 `peaceiris/actions-gh-pages` 插件将根目录文件同步至 GitHub Pages 服务。

### 📝 使用方法 (Usage)
1. **克隆仓库**：
   ```bash
   git clone https://github.com/ZYc5146/ZYc5146.github.io.git
   ```
2. **修改内容**：根据需求编辑根目录的静态文件（如 `index.html`）。
3. **推送部署**：
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
    steps:
      - uses: actions/checkout@v3

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
          publish_branch: main
```

### 📚 相关资源 (Related Resources)
- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [peaceiris/actions-gh-pages 插件文档](https://github.com/peaceiris/actions-gh-pages)
- [GitHub Actions 官方文档](https://docs.github.com/en/actions)

---

### ⭐ Star History

<a href="[https://star-history.com/#ZYc5146/ZYc5146.github.io&Date](https://star-history.com/#ZYc5146/ZYc5146.github.io&Date)">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="[https://api.star-history.com/svg?repos=ZYc5146/ZYc5146.github.io&type=Date&theme=dark](https://api.star-history.com/svg?repos=ZYc5146/ZYc5146.github.io&type=Date&theme=dark)" />
    <source media="(prefers-color-scheme: light)" srcset="[https://api.star-history.com/svg?repos=ZYc5146/ZYc5146.github.io&type=Date](https://api.star-history.com/svg?repos=ZYc5146/ZYc5146.github.io&type=Date)" />
    <img alt="Star History Chart" src="[https://api.star-history.com/svg?repos=ZYc5146/ZYc5146.github.io&type=Date](https://api.star-history.com/svg?repos=ZYc5146/ZYc5146.github.io&type=Date)" />
  </picture>
</a>