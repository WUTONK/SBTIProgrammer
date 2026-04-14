# 工业级零成本上线指南：从本地到 GitHub Pages 的自动部署

本指南详细说明了如何将本项目（SBTIProgrammer）部署到 GitHub Pages，并采用 GitHub Actions 进行自动化 CI/CD。

## 第一步：确认 Vite 基础路径配置

确保 `vite.config.js` 中的 `base` 属性与 GitHub 仓库名称一致。

- **仓库名称**: `SBTIProgrammer`
- **配置内容**:
  ```javascript
  base: '/SBTIProgrammer/',
  ```

## 第二步：代码推送至 GitHub

确保所有本地更改已提交并推送到远程仓库。

```bash
git add .
git commit -m "chore: prepare for deployment"
git push origin main
```

## 第三步：配置 GitHub Actions 工作流

在 `.github/workflows/` 目录下创建 `deploy.yml`，内容如下：

```yaml
name: Deploy Vite React App to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build the project
        run: npm run build

      - name: Setup GitHub Pages
        uses: actions/configure-pages@v4

      - name: Upload production artifacts
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 第四步：在 GitHub Settings 中激活 Pages

1. 访问 GitHub 仓库的 **Settings**。
2. 在左侧菜单中点击 **Pages**。
3. 在 **Build and deployment** 下，将 **Source** 设置为 **GitHub Actions**。

完成上述步骤后，每次向 `main` 分支推送代码都会自动触发部署流程。
