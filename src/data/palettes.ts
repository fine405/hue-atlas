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
  { id: 'matcha-latte', name: '抹茶拿铁', english: 'Matcha Latte', mood: '自然 · 治愈', description: '一抹安静的绿，遇见温润的奶油白。让界面像午后的第一口抹茶，轻盈而有呼吸感。', colors: ['#28382D', '#52684A', '#A3B18A', '#DADFCB', '#F5F3E8'], primary: '#52684A', foreground: '#28382D', background: '#F5F3E8', muted: '#DADFCB' },
  { id: 'terracotta', name: '赤陶日落', english: 'Terracotta', mood: '温暖 · 复古', description: '落日为陶土镀上一层温暖。赤陶、杏色与沙白的组合，为品牌与生活方式产品带来手作的质感。', colors: ['#492D27', '#A94E35', '#D68B65', '#EAC6AC', '#F8EFE5'], primary: '#A94E35', foreground: '#492D27', background: '#F8EFE5', muted: '#EAC6AC' },
  { id: 'cobalt-studio', name: '钴蓝工作室', english: 'Cobalt Studio', mood: '理性 · 鲜明', description: '克制的中性色中，一笔钴蓝成为视线的落点。清晰、直接，适合需要鲜明个性的数字产品。', colors: ['#182548', '#2853CF', '#8AA8ED', '#D7E1F5', '#F3F5FA'], primary: '#2853CF', foreground: '#182548', background: '#F3F5FA', muted: '#D7E1F5' },
  { id: 'lilac-hour', name: '丁香时刻', english: 'Lilac Hour', mood: '柔和 · 浪漫', description: '暮色中的丁香，把紫调放得很轻。低饱和的层次适合创作工具，也适合记录日常的小小空间。', colors: ['#3D3049', '#75518A', '#AC91BC', '#DDD0E5', '#F6F1F8'], primary: '#75518A', foreground: '#3D3049', background: '#F6F1F8', muted: '#DDD0E5' },
  { id: 'butter-yellow', name: '黄油吐司', english: 'Butter & Toast', mood: '明亮 · 轻快', description: '像刚烤好的吐司，暖黄与焦糖棕带来恰到好处的快乐。适合亲切、轻松的品牌表达。', colors: ['#4D3A23', '#87602A', '#E6BF58', '#F1DEA0', '#FBF6E7'], primary: '#87602A', foreground: '#4D3A23', background: '#FBF6E7', muted: '#F1DEA0' },
  { id: 'midnight-tide', name: '午夜潮汐', english: 'Midnight Tide', mood: '沉静 · 深邃', description: '把深海的蓝绿带进界面。沉稳的墨色和透亮的水色，为信息密集的页面建立清晰层次。', colors: ['#193D44', '#286C75', '#71A5AA', '#C1DADB', '#EFF6F4'], primary: '#286C75', foreground: '#193D44', background: '#EFF6F4', muted: '#C1DADB' },
  { id: 'rose-dust', name: '玫瑰尘埃', english: 'Rose Dust', mood: '细腻 · 温柔', description: '褪去浓烈，留下玫瑰柔软的一面。豆沙红与浅粉白，让内容与细节在温和的底色上自然浮现。', colors: ['#4C2F36', '#985667', '#C7919D', '#E8CCD2', '#FBF2F3'], primary: '#985667', foreground: '#4C2F36', background: '#FBF2F3', muted: '#E8CCD2' },
  { id: 'graphite', name: '石墨纸张', english: 'Graphite Paper', mood: '极简 · 克制', description: '回到纸张与墨迹的关系。以暖灰替代冰冷的纯灰，让最简单的黑白也拥有细腻的温度。', colors: ['#292826', '#595651', '#95918A', '#D6D2CB', '#F5F3EF'], primary: '#595651', foreground: '#292826', background: '#F5F3EF', muted: '#D6D2CB' },
  { id: 'apricot-garden', name: '杏色花园', english: 'Apricot Garden', mood: '清新 · 活泼', description: '熟透的杏子与花园的绿意相遇。暖色的轻快与深绿的安稳，构成自然又有对比的节奏。', colors: ['#30483D', '#416450', '#E5A079', '#EFCEAF', '#F9F2E8'], primary: '#416450', foreground: '#30483D', background: '#F9F2E8', muted: '#EFCEAF' },
  { id: 'wine-not', name: '微醺酒红', english: 'Wine Not', mood: '浓郁 · 优雅', description: '深酒红、灰粉与柔白，在明暗之间找到平衡。适合需要一点仪式感的品牌与内容空间。', colors: ['#432735', '#804359', '#B18795', '#DECBD2', '#F8F1F3'], primary: '#804359', foreground: '#432735', background: '#F8F1F3', muted: '#DECBD2' },
  { id: 'coastal-air', name: '海岸来信', english: 'Coastal Air', mood: '通透 · 松弛', description: '蓝色的海、淡淡的沙，和远处的地平线。让信息自在地铺开，给每一次浏览留一点空白。', colors: ['#273F53', '#3E6E93', '#8DB3CC', '#D6E4EB', '#F3F7F8'], primary: '#3E6E93', foreground: '#273F53', background: '#F3F7F8', muted: '#D6E4EB' },
  { id: 'olive-archive', name: '橄榄档案', english: 'Olive Archive', mood: '质朴 · 经典', description: '旧书页里的橄榄绿，与略带暖意的米白搭配。沉静却不沉闷，适合阅读、知识与专注的场景。', colors: ['#373B29', '#656B41', '#A6AA7D', '#DADBC1', '#F5F4E9'], primary: '#656B41', foreground: '#373B29', background: '#F5F4E9', muted: '#DADBC1' },
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
