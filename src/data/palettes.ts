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
}

// Color order: ink, primary, accent, soft surface, canvas.
export const palettes: Palette[] = [
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
