# Hue Atlas · 色谱

一个中文配色样本册，使用 **TanStack Start + React + TypeScript + Tailwind CSS + shadcn/ui** 构建。

## 初版功能

- 按组浏览 14 套预置色系：经典色系 6 套（每套 5 色）、宝石色系 8 套（每套 4 色）；分组保留在链接中。
- 色系独立链接、服务端渲染，以及未知色系的 404 页面。
- 单色 / 整组复制；14 张按原参考由 ImageGen 重生成的高清素材，使用 Canvas 实时换色；支持原生取色器、HEX 输入、原色对比与恢复。
- 个人色系：命名保存、首页展示同步换色封面、再次编辑、删除和撤销。保存在当前浏览器 localStorage；不提供账号或跨设备同步，清除站点数据后会丢失。
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

- `src/data/palettes.ts`：分组、14 套预置色系与原始色值。
- `src/components/palette-detail.tsx`：配色编辑与保存流程。
- `src/components/palette-artwork.tsx`：高清素材上的 Canvas 颜色映射，首页和详情共用；宝石换色保护白色背景、高光与深色阴影。
- `src/data/artwork.ts`：当前高清素材路径和实际像素尺寸。
- `docs/imagegen-prompts.json`：内置 ImageGen 生成方式、完整提示词、输入参考与输出文件记录。
- `src/lib/personal-palettes.ts`：版本化本地存储、格式校验及跨标签页刷新。
- `src/lib/feedback.ts`：反馈仓库地址、类型与 GitHub URL 生成。
- `.github/ISSUE_TEMPLATE/`：仓库中的反馈表单。

个人色系链接包含本地记录 ID，只有保存该记录的浏览器能打开；链接不包含完整配色数据。保存失败会保留当前编辑并显示错误，不覆盖无法解析的旧数据。

[反馈与建议](https://github.com/fine405/hue-atlas/issues) · [TanStack Start](https://tanstack.com/start/latest/docs/framework/react/overview) · [shadcn/ui 主题](https://ui.shadcn.com/docs/theming)

## 色系来源与当前素材

当前封面与详情使用 `public/artwork/*-hd.webp`，共 14 张。它们通过内置 ImageGen 以旧版参考裁切为输入重新生成，实际输出宽 1602–1604、高 981–982 像素，按原尺寸无损转换为 WebP，没有二次缩小。输入要求保留构图、主体与配色并重建清晰细节；完整提示词与文件路径见 `docs/imagegen-prompts.json`。这是 AI 重生成，细节与原照片/绘画存在差异，不代表对原始记录的无损修复。精确 HEX 色卡与顺序未改。

经典色系参考：蒙德里安、孟菲斯、洛可可、马卡龙、敦煌、莫兰迪，来自 [Y设计的抖音图文](https://www.douyin.com/note/7308946796603067667)（2023-12-05）。旧版裁切保留在不带 `-hd` 的 WebP 中：1080 × 1620 图文分别从 y=966、960、961、961、961、956 裁切到底部。

宝石色系参考来自 [東丁设计的抖音图文](https://www.douyin.com/note/7353602417352641844)（2024-04-03）：海蓝宝、蓝萤石、摩根石、橄榄石、重晶石、迪奥普塔兹、蓝石英、绿碧玺。旧版输入裁切为 (180, 370)–(900, 980)，原始 720 × 610 像素置于 1008 × 616 白色画布的 (140, 3) 位置，同样保留为不带 `-hd` 的文件。

原始图像与艺术作品权利归各自权利人，未作开源授权声明。原始裁切用于本次参考还原与重生成追溯。

## 大图清晰度与换色

详情图与已调色封面使用屏幕像素密度自适应 Canvas 和高质量插值，监听窗口尺寸、浏览器缩放与屏幕密度变化。Canvas 最多绘制到 3240 像素宽。默认 Canvas 保留新素材的像素，不再叠加旧版锐化。静态封面直接使用同一高清素材。

自定义配色使用软颜色蒙版与 RGB 差值映射，保留纹理和明暗；几何图案保护黑白线条，宝石保护浅色背景、高光和深色阴影。修改某个色值会影响画面中接近该色值的区域。这是二维图片换色，不提供独立物体编辑、三维旋转或物理折射模拟。
