# Hue Atlas · 色谱

为好设计，找到好颜色。一个中文配色样本册，使用 **TanStack Start + React + TypeScript + Tailwind CSS + shadcn/ui** 构建。

## 初版功能

- 18 套预置色系（12 套原创 + 6 套参考色系），每套包含 5 个 HEX 色值、风格说明与语义颜色映射。
- 色系独立链接、服务端渲染，以及未知色系的 404 页面。
- 单色 / 整组复制；使用同一组颜色变量的可交互界面预览。
- GitHub Issues 反馈：校验表单并打开预填草稿，用户在 GitHub 登录后确认提交。支持附带当前配色，没有后端凭证或自动发布。
- 适配桌面与手机、键盘导航、弹窗焦点管理与减少动画设置。

搜索过滤、深色主题、design tokens 导出与一键集成暂不包含在 v0.1 中。

## 本地运行

需要 Node.js 22.12+（开发验证使用 Node.js 24）。

```sh
npm ci
npm run dev
```

访问 http://127.0.0.1:4317 。

```sh
npm run build     # 构建并检查 TypeScript
npm run lint
npm run test     # Playwright，默认使用已安装的 Google Chrome
```

如果没有 Google Chrome，安装 Playwright Chromium，并移除 `playwright.config.ts` 的 `channel: 'chrome'` 后运行测试。

## 生产运行

```sh
npm run build
npm run start
```

生产服务器默认监听 3000 端口，可通过 `PORT` 配置。Nitro 输出位于 `.output/`，当前使用 Node.js 运行方式；尚未配置或执行网站托管部署。

TanStack Start 官方文档目前标记为 RC，Nitro Vite 适配器也在持续迭代。提交 lockfile 并固定直接依赖版本，使用 `npm ci` 重现安装；升级后运行构建与浏览器测试。

## 修改色系与反馈

- `src/data/palettes.ts`：色系唯一数据源；primary / foreground / background / muted 用于组件预览。
- `src/components/palette-detail.tsx`：使用 shadcn 语义 CSS 变量展示配色，便于下一阶段添加 tokens 导出。
- `src/lib/feedback.ts`：反馈仓库地址、类型与 GitHub URL 生成。
- `.github/ISSUE_TEMPLATE/`：仓库中的反馈表单。

对比度提示仅验证主按钮的背景和文字组合，不代表整组颜色在任意搭配下都满足可访问性要求。

[反馈与建议](https://github.com/fine405/hue-atlas/issues) · [TanStack Start](https://tanstack.com/start/latest/docs/framework/react/overview) · [shadcn/ui 主题](https://ui.shadcn.com/docs/theming)

## 新增参考色系

蒙德里安、孟菲斯、洛可可、马卡龙、敦煌、莫兰迪，来自 [Y设计的抖音图文](https://www.douyin.com/note/7308946796603067667)。五个 HEX 色值与排列顺序按原图录入；描述为本站撰写，未转载原图。组件预览单独分配语义颜色，部分配色补充中性色以保证文字可读性。
