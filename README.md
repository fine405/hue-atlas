# Hue Atlas · 色谱

一个中文配色样本册，使用 **TanStack Start + React + TypeScript + Tailwind CSS + shadcn/ui** 构建。

## 初版功能

- 按组浏览 14 套预置色系：经典色系 6 套（每套 5 色）、宝石色系 8 套（每套 4 色）；分组保留在链接中。
- 色系独立链接、服务端渲染，以及未知色系的 404 页面。
- 单色 / 整组复制；经典画面与宝石照片均使用 Canvas 实时换色；支持原生取色器、HEX 输入、原色对比与恢复。
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
- `src/components/palette-artwork.tsx`：原图纹理上的 Canvas 颜色映射，首页和详情共用；宝石换色保护白色背景、高光与深色阴影。
- `src/lib/personal-palettes.ts`：版本化本地存储、格式校验及跨标签页刷新。
- `src/lib/feedback.ts`：反馈仓库地址、类型与 GitHub URL 生成。
- `.github/ISSUE_TEMPLATE/`：仓库中的反馈表单。

个人色系链接包含本地记录 ID，只有保存该记录的浏览器能打开；链接不包含完整配色数据。保存失败会保留当前编辑并显示错误，不覆盖无法解析的旧数据。

[反馈与建议](https://github.com/fine405/hue-atlas/issues) · [TanStack Start](https://tanstack.com/start/latest/docs/framework/react/overview) · [shadcn/ui 主题](https://ui.shadcn.com/docs/theming)

## 色系来源

蒙德里安、孟菲斯、洛可可、马卡龙、敦煌、莫兰迪，来自 [Y设计的抖音图文](https://www.douyin.com/note/7308946796603067667)（2023-12-05，用户提供的视觉参考）。五个 HEX 色值与排列顺序按原图录入。

`public/artwork/` 中的六套经典色系图片是参考图下方效果画面的裁切，用于本次参考还原。来源为 1080 × 1620 图文：蒙德里安从 y=966、孟菲斯从 y=960、洛可可/马卡龙/敦煌从 y=961、莫兰迪从 y=956 裁切到底部。原图与艺术作品的权利归各自权利人，未作开源授权声明。

默认画面保留原始像素。自定义配色使用 Canvas 2D 的软颜色蒙版与 RGB 差值映射保留笔触、摄影明暗和细节；几何图案保护黑白线条。它是基于原图的换色，不是可独立编辑物体或笔触的矢量/3D 重建。色卡和效果图本身并非逐像素相同颜色，修改某一色值会影响画面中接近该色值的区域。

宝石色系来自 [東丁设计的抖音图文](https://www.douyin.com/note/7353602417352641844)（2024-04-03，用户提供的视觉参考）：海蓝宝、蓝萤石、摩根石、橄榄石、重晶石、迪奥普塔兹、蓝石英、绿碧玺。每套四个 HEX 色值与排列顺序按原图录入。宝石画面根据用户选择改为原图纹理 + Canvas 换色，保留照片中的天然断面、裂纹和明暗，不再使用几何 SVG 插画。八张源图均从 (180, 370) 裁切到 (900, 980)，等比缩放为 519 × 440，置于 720 × 440 白色画布的 (100, 0) 位置，保存为无损 WebP。默认 Canvas 像素与本地图片一致；自定义颜色映射会影响接近色值的区域，白色背景和高光受到保护。这是二维照片换色，不提供三维旋转或物理折射模拟。原始图像权利归各自权利人。
