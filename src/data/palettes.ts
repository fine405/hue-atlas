export const paletteGroups = [
  { id: 'classic', name: '经典色系' },
  { id: 'gemstones', name: '宝石色系' },
] as const
export type PaletteGroup = typeof paletteGroups[number]['id']
export type GemShape = 'aquamarine' | 'fluorite' | 'morganite' | 'peridot' | 'barite' | 'dioptase' | 'quartz' | 'tourmaline'

export type Palette = {
  id: string
  group: PaletteGroup
  gemShape?: GemShape
  name: string
  english: string
  mood: string
  description: string
  colors: string[]
  primary: string
  foreground: string
  background: string
  muted: string
  source?: { title: string; url: string }
}

const designReference = {
  title: 'Y设计 · 六大色系（抖音）',
  url: 'https://www.douyin.com/note/7308946796603067667',
}

// Referenced palettes retain the source's HEX values and order.
// Semantic colors are assigned separately for readable interface previews.
export const palettes: Palette[] = [
  {
    id: 'mondrian', name: '蒙德里安色系', english: 'Mondrian', mood: '鲜明 · 几何',
    description: '红、蓝、黄构成鲜明的视觉节奏，白色留出空隙，橙色增添暖意。适合几何构图与强调对比的设计。',
    colors: ['#F50F0F', '#1286DD', '#FFF100', '#FFFFFF', '#F66814'],
    primary: '#1286DD', foreground: '#20201E', background: '#FFFFFF', muted: '#FFF100',
    source: designReference, group: 'classic',
  },
  {
    id: 'memphis', name: '孟菲斯色系', english: 'Memphis', mood: '大胆 · 玩趣',
    description: '亮粉、蓝紫、柠檬黄和青绿碰撞，让图形与色彩一起跳跃。适合充满活力的视觉表达。',
    colors: ['#F964C2', '#5A4AE8', '#CE88FF', '#F3EC46', '#38CEC4'],
    primary: '#5A4AE8', foreground: '#242136', background: '#FFFBF5', muted: '#CE88FF',
    source: designReference, group: 'classic',
  },
  {
    id: 'rococo', name: '洛可可色系', english: 'Rococo', mood: '柔雅 · 细腻',
    description: '橄榄绿与浅蓝、柔粉、米金相伴，浅灰将丰富的层次轻轻收拢。适合温柔而有装饰感的页面。',
    colors: ['#556342', '#9DC6D8', '#D9B6AE', '#CEB498', '#EDEDED'],
    primary: '#556342', foreground: '#556342', background: '#EDEDED', muted: '#D9B6AE',
    source: designReference, group: 'classic',
  },
  {
    id: 'macaron', name: '马卡龙色系', english: 'Macaron', mood: '甜美 · 缤纷',
    description: '莓果粉、杏黄、薄荷绿与紫色，像甜点橱窗里的缤纷组合。以棕色收尾，给轻快的颜色添一点温度。',
    colors: ['#EC8892', '#FAB85A', '#28A49A', '#5048BC', '#945850'],
    primary: '#5048BC', foreground: '#3E2D31', background: '#FFF8F5', muted: '#EC8892',
    source: designReference, group: 'classic',
  },
  {
    id: 'dunhuang', name: '敦煌色系', english: 'Dunhuang', mood: '古朴 · 浓郁',
    description: '墨色、赭红、土金与石绿，在沙色底上展开。沉着的明暗关系，让界面呈现温厚的壁画气息。',
    colors: ['#070D10', '#56271E', '#B7824E', '#569692', '#EBD7B6'],
    primary: '#56271E', foreground: '#070D10', background: '#EBD7B6', muted: '#B7824E',
    source: designReference, group: 'classic',
  },
  {
    id: 'morandi', name: '莫兰迪色系', english: 'Morandi', mood: '低饱和 · 静谧',
    description: '灰蓝、灰绿与柔和的土色调相互呼应。降低色彩的喧闹，留下适合阅读与专注的安静层次。',
    colors: ['#3A4E59', '#606551', '#9FACA1', '#B69664', '#D8CEC5'],
    primary: '#606551', foreground: '#3A4E59', background: '#D8CEC5', muted: '#9FACA1',
    source: designReference, group: 'classic',
  },
  {
    id: 'aquamarine', group: 'gemstones', gemShape: 'aquamarine', name: '海蓝宝', english: 'Aquamarine', mood: '清透 · 冰蓝',
    description: '海蓝宝矿物晶体的自然配色。',
    colors: ['#5F888A', '#86B6BA', '#8E8F8A', '#7D7865'],
    primary: '#5F888A', foreground: '#20201E', background: '#FFFFFF', muted: '#8E8F8A',
    source: { title: '東丁设计 · 大自然配色', url: 'https://www.douyin.com/note/7353602417352641844' },
  },
  {
    id: 'fluorite', group: 'gemstones', gemShape: 'fluorite', name: '蓝萤石', english: 'Blue Fluorite', mood: '幽蓝 · 层叠',
    description: '蓝萤石矿物晶体的自然配色。',
    colors: ['#424278', '#2A4A73', '#6C6284', '#7994B2'],
    primary: '#424278', foreground: '#20201E', background: '#FFFFFF', muted: '#6C6284',
    source: { title: '東丁设计 · 大自然配色', url: 'https://www.douyin.com/note/7353602417352641844' },
  },
  {
    id: 'morganite', group: 'gemstones', gemShape: 'morganite', name: '摩根石', english: 'Morganite', mood: '柔粉 · 晶莹',
    description: '摩根石矿物晶体的自然配色。',
    colors: ['#DC8B87', '#E1BBBA', '#E1D3D3', '#69957A'],
    primary: '#DC8B87', foreground: '#20201E', background: '#FFFFFF', muted: '#E1D3D3',
    source: { title: '東丁设计 · 大自然配色', url: 'https://www.douyin.com/note/7353602417352641844' },
  },
  {
    id: 'peridot', group: 'gemstones', gemShape: 'peridot', name: '橄榄石', english: 'Peridot', mood: '青绿 · 透亮',
    description: '橄榄石矿物晶体的自然配色。',
    colors: ['#507901', '#7A964C', '#AAD351', '#DBEB57'],
    primary: '#507901', foreground: '#20201E', background: '#FFFFFF', muted: '#AAD351',
    source: { title: '東丁设计 · 大自然配色', url: 'https://www.douyin.com/note/7353602417352641844' },
  },
  {
    id: 'barite', group: 'gemstones', gemShape: 'barite', name: '重晶石', english: 'Barite', mood: '蜜金 · 温润',
    description: '重晶石矿物晶体的自然配色。',
    colors: ['#D49432', '#F1D45F', '#FFF5D1', '#795845'],
    primary: '#D49432', foreground: '#20201E', background: '#FFFFFF', muted: '#FFF5D1',
    source: { title: '東丁设计 · 大自然配色', url: 'https://www.douyin.com/note/7353602417352641844' },
  },
  {
    id: 'dioptase', group: 'gemstones', gemShape: 'dioptase', name: '迪奥普塔兹', english: 'Dioptase', mood: '深翠 · 冷冽',
    description: '迪奥普塔兹矿物晶体的自然配色。',
    colors: ['#146576', '#347071', '#0A989C', '#45DEDB'],
    primary: '#146576', foreground: '#20201E', background: '#FFFFFF', muted: '#0A989C',
    source: { title: '東丁设计 · 大自然配色', url: 'https://www.douyin.com/note/7353602417352641844' },
  },
  {
    id: 'quartz', group: 'gemstones', gemShape: 'quartz', name: '蓝石英', english: 'Blue Quartz', mood: '澄蓝 · 纯净',
    description: '蓝石英矿物晶体的自然配色。',
    colors: ['#158BA9', '#40DEEA', '#9CCCF4', '#C2EDFD'],
    primary: '#158BA9', foreground: '#20201E', background: '#FFFFFF', muted: '#9CCCF4',
    source: { title: '東丁设计 · 大自然配色', url: 'https://www.douyin.com/note/7353602417352641844' },
  },
  {
    id: 'tourmaline', group: 'gemstones', gemShape: 'tourmaline', name: '绿碧玺', english: 'Green Tourmaline', mood: '碧绿 · 通透',
    description: '绿碧玺矿物晶体的自然配色。',
    colors: ['#1D908D', '#3CB28F', '#2ADFCE', '#95DFC8'],
    primary: '#1D908D', foreground: '#20201E', background: '#FFFFFF', muted: '#2ADFCE',
    source: { title: '東丁设计 · 大自然配色', url: 'https://www.douyin.com/note/7353602417352641844' },
  },
]

export function readableInk(hex: string) {
  return contrastRatio(hex, '#FFFFFF') >= contrastRatio(hex, '#20201E') ? '#FFFFFF' : '#20201E'
}

export function contrastRatio(a: string, b: string) {
  const luminance = (hex: string) => {
    const rgb = [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16) / 255)
      .map((c) => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722
  }
  const first = luminance(a), second = luminance(b)
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05)
}
