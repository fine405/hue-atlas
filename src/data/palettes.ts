export type Palette = {
  id: string
  name: string
  english: string
  mood: string
  description: string
  colors: [string, string, string, string, string]
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
    source: designReference,
  },
  {
    id: 'memphis', name: '孟菲斯色系', english: 'Memphis', mood: '大胆 · 玩趣',
    description: '亮粉、蓝紫、柠檬黄和青绿碰撞，让图形与色彩一起跳跃。适合充满活力的视觉表达。',
    colors: ['#F964C2', '#5A4AE8', '#CE88FF', '#F3EC46', '#38CEC4'],
    primary: '#5A4AE8', foreground: '#242136', background: '#FFFBF5', muted: '#CE88FF',
    source: designReference,
  },
  {
    id: 'rococo', name: '洛可可色系', english: 'Rococo', mood: '柔雅 · 细腻',
    description: '橄榄绿与浅蓝、柔粉、米金相伴，浅灰将丰富的层次轻轻收拢。适合温柔而有装饰感的页面。',
    colors: ['#556342', '#9DC6D8', '#D9B6AE', '#CEB498', '#EDEDED'],
    primary: '#556342', foreground: '#556342', background: '#EDEDED', muted: '#D9B6AE',
    source: designReference,
  },
  {
    id: 'macaron', name: '马卡龙色系', english: 'Macaron', mood: '甜美 · 缤纷',
    description: '莓果粉、杏黄、薄荷绿与紫色，像甜点橱窗里的缤纷组合。以棕色收尾，给轻快的颜色添一点温度。',
    colors: ['#EC8892', '#FAB85A', '#28A49A', '#5048BC', '#945850'],
    primary: '#5048BC', foreground: '#3E2D31', background: '#FFF8F5', muted: '#EC8892',
    source: designReference,
  },
  {
    id: 'dunhuang', name: '敦煌色系', english: 'Dunhuang', mood: '古朴 · 浓郁',
    description: '墨色、赭红、土金与石绿，在沙色底上展开。沉着的明暗关系，让界面呈现温厚的壁画气息。',
    colors: ['#070D10', '#56271E', '#B7824E', '#569692', '#EBD7B6'],
    primary: '#56271E', foreground: '#070D10', background: '#EBD7B6', muted: '#B7824E',
    source: designReference,
  },
  {
    id: 'morandi', name: '莫兰迪色系', english: 'Morandi', mood: '低饱和 · 静谧',
    description: '灰蓝、灰绿与柔和的土色调相互呼应。降低色彩的喧闹，留下适合阅读与专注的安静层次。',
    colors: ['#3A4E59', '#606551', '#9FACA1', '#B69664', '#D8CEC5'],
    primary: '#606551', foreground: '#3A4E59', background: '#D8CEC5', muted: '#9FACA1',
    source: designReference,
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
