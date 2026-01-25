import React, { useState, useEffect } from 'react';
import {
  Hotel,
  Car,
  Utensils,
  MapPin,
  Bed,
  Sparkles,
  Camera,
  Clock,
  Info,
  Calendar
} from 'lucide-react';
// Deploy trigger: 2026-01-06 21:50
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
};
import { ComparisonRadar, BloomLine } from './components/JournalCharts';

const itineraryData = [
  {
    day: 1,
    date: "07/07 Tue.",
    title: "抵達與札幌購物夜",
    focus: "抵達、自駕、蟹、購物",
    timeline: [
      { time: "15:10", label: "抵達", activity: "飛機抵達大千歲機場，辦理入境。" },
      { time: "17:00", label: "自駕", activity: "OTS 完成領車，開往札幌市區（約 1 小時）。" },
      { time: "18:30", label: "入住", activity: "飯店 Check-in 停好車。" },
      { time: "19:00", label: "美食", activity: "步行至薄野區吃「帝王蟹/螃蟹料理」。推薦「冰雪之門」或「螃蟹家」。", highlight: true },
      { time: "20:30", label: "購物", activity: "逛狸小路商店街 1~7 段，補齊藥妝與唐吉訶德雜貨。" }
    ],
    accommodation: "札幌萬怡酒店(Courtyard by Marriott Sapporo)",
    photos: ["/images/day1/ots_rental.png", "/images/day1/tanukikoji.jpg", "/images/day1/soup_curry.jpg"],
    recommendations: [
      { type: "food", title: "湯咖哩 (Soup Curry)", desc: "札幌靈魂食物，推薦 Tenjiku 或 Samurai。" },
      { type: "food", title: "成吉思汗烤肉", desc: "狸小路附近的羊肉烤盤料理。" }
    ]
  },
  {
    day: 2,
    date: "07/08 Wed.",
    title: "小樽海鮮市場與大採購",
    focus: "海鮮、運河、購物",
    timeline: [
      { time: "09:30", label: "小樽", activity: "開車前往小樽（約 45 分鐘）。" },
      { time: "10:30", label: "美食", activity: "直奔「小樽三角市場」享用海鮮丼與現煮帝王蟹。", highlight: true },
      { time: "13:00", label: "漫步", activity: "逛小樽運河、音樂盒堂、北一硝子館。" },
      { time: "15:00", label: "出發", activity: "離開小樽開往「三井 Outlet Park 札幌北廣島」。" },
      { time: "16:00", label: "購物", activity: "在 Outlet 盡情購物至 20:00 關門。" }
    ],
    accommodation: "札幌萬怡酒店(Courtyard by Marriott Sapporo)",
    photos: ["/images/day2/otaru_canal.jpg", "/images/day2/mitsui_outlet.png", "/images/day2/vessel_inn_park.jpg"],
    recommendations: [
      { type: "food", title: "三角市場海鮮", desc: "新鮮海鮮丼與現煮帝王蟹。" },
      { type: "food", title: "小樽甜點", desc: "LeTAO 雙層乳酪蛋糕、六花亭。" }
    ]
  },
  {
    day: 3,
    date: "07/09 Thu.",
    title: "場外市場與旭山動物園",
    focus: "海鮮、親子、探索",
    timeline: [
      { time: "08:30", label: "退房", activity: "退房後前往「札幌場外市場 (Curb Market)」。" },
      { time: "09:00", label: "美食", activity: "品嚐最新鮮的干貝、海膽、現烤海鮮。", highlight: true },
      { time: "11:00", label: "自駕", activity: "開往旭山動物園（約 2 小時）。" },
      { time: "13:00", label: "親子", activity: "逛旭山動物園，看北極熊、企鵝 and 海豹。" },
      { time: "17:00", label: "入住", activity: "入住 旭川HOTEL AMANEK。" }
    ],
    accommodation: "旭川HOTEL AMANEK",
    photos: ["/images/day3/asahiyama_zoo.jpg", "/images/day3/aeon_mall.png", "/images/day3/omo7_asahikawa.jpg"],
    recommendations: [
      { type: "food", title: "味噌拉麵", desc: "元祖拉麵橫丁，濃郁味噌湯頭。" },
      { type: "spot", title: "二條市場", desc: "享用海鮮蓋飯當早餐的最佳去處。" }
    ],
    transportAdvice: "這段路程約 2 小時，沿路景觀優美。建議在休息站稍作停留，品嚐季節鮮乳。"
  },
  {
    day: 4,
    date: "07/10 Fri.",
    title: "美瑛與富良野：花季最高峰",
    focus: "花海、哈密瓜、精靈露台",
    timeline: [
      { time: "09:00", label: "美瑛", activity: "前往「四季彩之丘」，搭乘拖拉機看七彩花毯。" },
      { time: "11:30", label: "美食", activity: "富田哈密瓜工房：現切哈密瓜、冰淇淋吃到飽。", highlight: true },
      { time: "13:30", label: "賞花", activity: "隔壁「富田農場」看紫色薰衣草花海。" },
      { time: "18:00", label: "夢幻", activity: "逛「森林精靈露台」夢幻小木屋點燈。" },
      { time: "19:30", label: "入住", activity: "入住諾佐飯店 Nozo Hotel。" }
    ],
    accommodation: "諾佐飯店 Nozo Hotel",
    photos: ["/images/day4/shikisai_no_oka.jpg", "/images/day4/blue_pond.jpg", "/images/day4/tomita_farm.jpg", "/images/day4/ningle_terrace.jpg"],
    recommendations: [
      { type: "food", title: "薰衣草冰淇淋", desc: "富田農場限定，紫色浪漫滋味。" },
      { type: "food", title: "富良野咖哩", desc: "使用當地新鮮蔬菜烹製的濃郁咖哩。" }
    ]
  },
  {
    day: 5,
    date: "07/11 Sat.",
    title: "登別溫泉與水樂園大放電",
    focus: "足湯、地獄谷、溫泉水樂園",
    timeline: [
      { time: "10:30", label: "出發", activity: "慢享早餐後開往登別（約 2.5 小時）。" },
      { time: "14:00", label: "奇觀", activity: "逛「登別地獄谷」，看硫磺火山與大湯沼川足湯。" },
      { time: "16:00", label: "入住", activity: "入住登別格蘭大飯店。", highlight: true },
      { time: "18:00", label: "放電", activity: "在室內大型水樂園玩划水道，小孩絕對超嗨。" }
    ],
    accommodation: "登別格蘭大飯店 Noboribetsu Grand Hotel",
    photos: ["/images/day5/noboribetsu_jigokudani.png", "/images/day5/oyunuma.jpg", "/images/day5/dai_ichi_takimotokan.jpg"],
    recommendations: [
      { type: "spot", title: "大湯沼足湯", desc: "在森林中享受天然溫泉足浴。" }
    ],
    transportAdvice: "這段路程約 2.5 小時，沿路景觀優美。建議在休息站稍作停留，品嚐當地哈密瓜。"
  },
  {
    day: 6,
    date: "07/12 Sun.",
    title: "洞爺湖煙火之夜",
    focus: "餵熊、汽船、湖畔煙火",
    timeline: [
      { time: "09:30", label: "洞爺湖", activity: "退房後開往洞爺湖（約 1 小時）。" },
      { time: "11:00", label: "體驗", activity: "昭和新山熊牧場餵棕熊、搭乘環湖汽船。" },
      { time: "15:00", label: "入住", activity: "入住洞爺湖鶴雅度假村光之歌，享受頂級度假體驗。", highlight: true },
      { time: "20:45", label: "煙火", activity: "躺在房間看洞爺湖煙火在窗外綻放。" }
    ],
    accommodation: "洞爺湖鶴雅度假村光之歌 Lake Toya Tsuruga Resort Hikarinouta",
    photos: ["/images/day6/showa_shinzan_bear_park.jpg", "/images/day6/toyako_cruise.jpg", "/images/day6/toyako_fireworks.jpg"],
    recommendations: [
      { type: "spot", title: "洞爺湖汽船", desc: "搭船環湖，近距離觀察美麗湖景。" }
    ]
  },
  {
    day: 7,
    date: "07/13 Mon.",
    title: "新千歲空港巡禮：最後的採買與歸途",
    focus: "OTS 還車、玉米麵包、JAL 國內線",
    timeline: [
      { time: "08:30", label: "出發", activity: "退房後前往千歲市區。若想買限量玉米麵包建議此時抵達。" },
      { time: "09:15", label: "加油", activity: "於 OTS 營業所附近加油站加滿油。" },
      { time: "09:30", label: "還車", activity: "抵達 OTS 千歲營業所辦理還車手續。", highlight: true },
      { time: "09:45", label: "接駁", activity: "搭乘 OTS 免費接駁車前往機場國內線航廈。" },
      { time: "10:15", label: "報到", activity: "抵達國內線航廈，辦理行李托運與報到。" },
      { time: "11:25", label: "飛行", activity: "搭乘 JL508 班機前往羽田機場。再見，北海道！", highlight: true }
    ],
    accommodation: "東京羽田/溫慢的家",
    photos: ["/images/day7/new_chitose_airport.png", "/images/day7/airport_souvenirs.jpg"],
    recommendations: [
      { type: "food", title: "美瑛之丘玉米麵包", desc: "新千歲機場排隊名店，建議早點還車去排隊。" },
      { type: "spot", title: "新千歲伴手禮區", desc: "Royce'、六花亭、北菓樓最後掃貨。" }
    ]
  }
];

const MobileView = ({ selectedDay, setSelectedDay, weather, exchangeRate, currentItinerary }) => {
  return (
    <div className="selection:bg-purple-100 min-h-screen flex flex-col items-center pb-32">
      <nav className="w-full p-6 flex justify-between items-center max-w-4xl">
        <div className="border-b-4 border-stone-800 pb-1">
          <h1 className="text-base font-bold tracking-[0.4em] font-serif-jp uppercase text-stone-800">Hokkaido '26</h1>
        </div>
        <div className="text-[10px] font-handwriting opacity-40 tracking-widest uppercase">Travel Journal</div>
      </nav>

      <div className="w-full max-w-md px-5 mt-4 mb-8 space-y-3">
        <div className="info-badge shadow-sm">
          <span>🌡️</span>
          <span className="font-medium">即時氣溫（札幌）:</span>
          <span className="font-bold">{weather.temp}°C</span>
          <span className="text-[8px] bg-green-100 text-green-600 px-1 rounded font-bold">LIVE</span>
        </div>
        <div className="info-badge shadow-sm">
          <span>💵</span>
          <span className="font-medium">參考匯率:</span>
          <span className="font-bold">1 TWD ≈ {exchangeRate} JPY</span>
          <span className="text-[8px] bg-green-100 text-green-600 px-1 rounded font-bold">LIVE</span>
        </div>
        <div className="info-badge shadow-sm">
          <span>🌸</span>
          <span className="font-medium">花況預測:</span>
          <span className="font-bold text-purple-600">滿開中</span>
          <span className="text-[8px] bg-purple-100 text-purple-600 px-1 rounded font-bold">JULY</span>
        </div>
      </div>

      <header className="relative py-20 px-6 text-center w-full overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage: `url('/hokkaido_map_watermark.png')`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>

        <div className="relative z-10">
          <h2 className="text-4xl font-serif-jp font-bold mb-6 text-stone-800 leading-tight">
            北の大地・<span className="text-purple-600">旅の手帖</span>
          </h2>
          <p className="font-handwriting text-stone-500 text-lg leading-relaxed px-10 max-w-lg mx-auto">
            「2026年、夏。親子自駕、煙火與購物、紫色的花畑。絕好の旅どきです！」
          </p>
        </div>
      </header>

      <main className="w-full max-w-md px-4">
        <section className="mb-10 wa-card p-6 shadow-sm overflow-hidden border-dashed border-stone-200">
          <div className="absolute top-0 right-0 bg-stone-800 text-white text-[10px] px-3 py-1 font-bold rounded-bl-lg">
            FLIGHT LOGISTICS
          </div>
          <h4 className="flex items-center gap-2 text-stone-800 font-bold text-sm mb-6">
            <span>✈️</span> 航班資訊 (Flight Details)
          </h4>
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-white/40 p-3 rounded-2xl border border-white/60">
              <div className="w-12 h-12 shrink-0 bg-white rounded-xl p-1 shadow-sm overflow-hidden flex items-center justify-center">
                <img src="/images/airlines/starlux_logo.png" alt="Starlux" className="w-full h-full object-contain scale-110" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-stone-400">去程 | 07/07 Tue.</span>
                  <span className="text-[10px] font-black text-wa-purple bg-purple-50 px-2 py-0.5 rounded">JX850</span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-lg font-black text-stone-700 leading-none">10:05</p>
                    <p className="text-[8px] font-bold text-stone-400 mt-1">桃機 TPE (T1)</p>
                  </div>
                  <div className="flex-1 flex flex-col items-center px-4 mb-2">
                    <div className="w-full h-[1px] bg-stone-200 relative mb-1">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-stone-300">✈️</div>
                    </div>
                    <span className="text-[8px] text-stone-300 font-mono">A330-900neo</span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-stone-700 leading-none">15:10</p>
                    <p className="text-[8px] font-bold text-stone-400 mt-1">新千歲 CTS</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/40 p-3 rounded-2xl border border-white/60">
              <div className="w-12 h-12 shrink-0 bg-white rounded-xl p-1 shadow-sm overflow-hidden flex items-center justify-center">
                <img src="/images/airlines/jal_logo.png" alt="JAL" className="w-full h-full object-contain" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-stone-400">回程 | 07/13 Mon.</span>
                  <span className="text-[10px] font-black text-red-500 bg-red-50 px-2 py-0.5 rounded">JL508</span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-lg font-black text-stone-700 leading-none">11:25</p>
                    <p className="text-[8px] font-bold text-stone-400 mt-1">新千歲 (國內線D)</p>
                  </div>
                  <div className="flex-1 flex flex-col items-center px-4 mb-2">
                    <div className="w-full h-[1px] bg-stone-200 relative mb-1">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-stone-300 rotate-180">✈️</div>
                    </div>
                    <span className="text-[8px] text-stone-300 font-mono">A350 廣體機</span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-stone-700 leading-none">13:05</p>
                    <p className="text-[8px] font-bold text-stone-400 mt-1">羽田 HND (T1)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-6 bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-[40px] border border-orange-100 shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-200/20 rounded-full blur-2xl"></div>
          <h4 className="flex items-center gap-2 text-orange-600 font-bold text-sm mb-4">
            <span>🌟</span> 7月限定・旬の味 (July Specials)
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="glass-light p-3 rounded-2xl border border-orange-200/50 flex flex-col items-center text-center">
              <span className="text-2xl mb-1">🍈</span>
              <p className="text-[10px] font-bold text-orange-800">夕張哈密瓜</p>
              <p className="text-[8px] text-orange-600/70">香甜多汁，夏季必嚐</p>
            </div>
            <div className="glass-light p-3 rounded-2xl border border-orange-200/50 flex flex-col items-center text-center">
              <span className="text-2xl mb-1">🌽</span>
              <p className="text-[10px] font-bold text-orange-800">北海道甜玉米</p>
              <p className="text-[8px] text-orange-600/70">七月採收，口感極鮮</p>
            </div>
          </div>
        </section>

        <section className="mb-10 bg-white/50 p-8 rounded-[40px] border border-stone-100 shadow-sm relative overflow-hidden">
          <h4 className="flex items-center gap-2 text-wa-purple font-bold text-sm mb-8">
            <span>📊</span> 視覺化方案分析 (Visual Analysis)
          </h4>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col items-center">
              <p className="text-[10px] font-bold text-stone-300 uppercase tracking-[0.2em] mb-8 text-center">行程平衡雷達圖 (Itinerary Radar)</p>
              <div className="w-full max-w-[260px] relative">
                <ComparisonRadar />
              </div>

              <div className="grid grid-cols-5 gap-0 mt-10 w-full bg-white/30 rounded-2xl p-4 border border-white/50 max-w-[260px]">
                {['景點', '餘裕', '購物', '效率', '預算'].map((label, idx) => (
                  <div key={label} className="text-center border-r last:border-r-0 border-stone-100">
                    <p className="text-[10px] font-black text-stone-700 leading-none">
                      {[95, 65, 60, 95, 85][idx]}%
                    </p>
                    <p className="text-[8px] text-stone-400 mt-1.5 font-bold">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-[1px] bg-gradient-to-r from-transparent via-stone-100 to-transparent w-full"></div>

            <div className="flex flex-col items-center px-2">
              <p className="text-[10px] font-bold text-stone-300 uppercase tracking-[0.2em] mb-8 text-center">七月薰衣草花況預測 (Bloom Forecast)</p>
              <div className="w-full max-w-[260px] h-32 mb-4">
                <BloomLine />
              </div>
              <p className="text-[8px] text-stone-400 text-center italic opacity-60">根據 2026 年預計花期資料生成</p>
            </div>
          </div>
        </section>

        <section className="mb-10 bg-white/50 p-6 rounded-[40px] border border-stone-200 shadow-sm">
          <h4 className="flex items-center gap-2 text-stone-400 font-bold text-[10px] uppercase tracking-wider mb-4">
            旅行手帖貼士 (Travel Tips)
          </h4>
          <div className="grid grid-cols-1 gap-4 text-xs text-stone-600 leading-relaxed font-serif-jp">
            <div className="bg-white/60 p-4 rounded-2xl border border-stone-100 italic">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">🛌</span>
                <p className="font-bold text-stone-700">房型選擇建議</p>
              </div>
              <p>預訂時註明需要「Triple Room (三床房)」或「和洋室」，3 位大人才能住得舒適。</p>
            </div>
          </div>
        </section>

        <section className="mb-10 rental-card shadow-sm overflow-hidden">
          <div className="absolute top-0 right-0 bg-wa-purple text-white text-[10px] px-3 py-1 font-bold rounded-bl-lg">
            PRE-TRIP ADVICE
          </div>
          <h4 className="flex items-center gap-2 text-wa-purple font-bold text-sm mb-4">
            <span>🚗</span> 租車與用車建議 (Rental Tips)
          </h4>
          <div className="space-y-4 text-xs text-stone-600 leading-relaxed font-serif-jp">
            <p>
              <strong>建議車型：</strong> 務必預約 <span className="text-wa-purple font-bold">7 人座</span> (如 Toyota Noah 或 Voxy)。3 大 1 小加上 4 件大行李與推車，5 人座休旅車絕對塞不下。
            </p>
            <p>
              <strong>必備配件：</strong> 領車時務必加購 <span className="text-wa-purple font-bold">HEP (Hokkaido Expressway Pass)</span>，全包高速公路路費最划算。
            </p>
          </div>
        </section>

        <section id="itinerary" className="relative pt-6">
          <div className="flex flex-col gap-8">
            <div className="flex overflow-x-auto gap-3 pb-6 pt-4 no-scrollbar -mx-4 px-6 snap-x snap-mandatory scroll-smooth">
              {currentItinerary.map((item) => (
                <button
                  key={item.day}
                  onClick={() => setSelectedDay(item.day)}
                  className={`snap-center shrink-0 flex flex-col items-center justify-center w-[84px] h-[100px] rounded-[32px] border-2 transition-all duration-300 ${selectedDay === item.day
                    ? 'bg-wa-purple text-white border-wa-purple shadow-lg scale-105'
                    : 'bg-white/50 text-stone-400 border-white/80 hover:bg-white/80'
                    }`}
                >
                  <span className={`text-[10px] font-bold ${selectedDay === item.day ? 'opacity-90' : 'opacity-40'}`}>DAY</span>
                  <span className="text-2xl font-black">{item.day}</span>
                  <span className={`text-[8px] font-bold mt-1 ${selectedDay === item.day ? 'opacity-90' : 'opacity-50'}`}>
                    {item.date.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>

            {currentItinerary.filter(d => d.day === selectedDay).map((item) => (
              <div key={item.day} className="wa-card p-8 pb-0">
                <div className="washi-tape flex items-center justify-around px-2 text-[10px] select-none">
                  <span>🪻</span>
                  <span>🍈</span>
                  <span>🪻</span>
                </div>
                <div className="flex justify-between items-start mb-6 relative">
                  <div className="absolute -left-2 top-0 writing-vertical-rl text-xs font-serif-jp text-stone-300 tracking-widest opacity-60">
                    第{item.day}日
                  </div>

                  <div className="w-16 h-16 rounded-full border border-white/50 backdrop-blur-md flex flex-col items-center justify-center text-wa-purple bg-white/30 shadow-sm -rotate-6 ml-6">
                    <span className="text-[10px] opacity-40 font-bold">DAY</span>
                    <span className="text-2xl font-black">{item.day}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black tracking-widest text-stone-300 uppercase mb-1">LOCAL HIGHLIGHTS</p>
                    <p className="text-xs font-medium text-purple-400 bg-purple-50 px-2 py-0.5 rounded-full inline-block">{item.focus}</p>
                    <p className="text-sm font-serif-jp text-stone-400 mt-2">{item.date}</p>
                  </div>
                </div>

                <h3 className="text-2xl font-serif-jp font-bold mb-8 border-l-4 border-wa-purple/20 pl-4">{item.title}</h3>

                <div className="flex flex-col gap-8 mb-8">
                  <div className="flex gap-4 overflow-x-auto pb-4 snap-x pl-2 no-scrollbar">
                    {item.photos.map((photo, pIdx) => (
                      <div key={pIdx} className="snap-center shrink-0 w-40 h-52 bg-white p-2 shadow-sm rotate-1 first:-rotate-2 last:rotate-2 border border-gray-100">
                        <div className="w-full h-40 bg-gray-100 overflow-hidden mb-2">
                          <img src={photo} alt="travel memory" className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div className="text-[8px] text-center font-handwriting text-stone-400 italic">Memory Snapshot</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 mb-8">
                    <h5 className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                      <span className="w-4 h-[1px] bg-purple-200"></span>
                      夏の絶品グルメ & スポット
                    </h5>
                    <div className="grid grid-cols-1 gap-3">
                      {item.recommendations.map((rec, rIdx) => (
                        <div key={rIdx} className="glass-light p-3 rounded-2xl border border-white flex items-center gap-3">
                          <span className="text-lg">{rec.type === 'food' ? '🍲' : '📍'}</span>
                          <div>
                            <p className="text-xs font-bold text-stone-700">{rec.title}</p>
                            <p className="text-[10px] text-stone-400">{rec.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="timeline-container">
                    <div className="timeline-line"></div>
                    {item.timeline.map((event, eIdx) => (
                      <div key={eIdx} className={`timeline-item ${event.highlight ? 'highlight' : ''}`}>
                        <div className="timeline-dot"></div>
                        <div className="flex items-baseline gap-3">
                          <span className="text-xs font-black text-stone-400 font-mono w-10 shrink-0">{event.time}</span>
                          <span className="text-xs font-bold text-wa-purple bg-purple-50 px-2 py-0.5 rounded leading-none shrink-0">{event.label}</span>
                          {event.highlight && <span className="highlight-badge">亮點</span>}
                        </div>
                        <p className="text-sm text-stone-600 mt-2 font-handwriting leading-relaxed pl-14">
                          {event.activity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="accommodation-note">
                  <span className="text-xl">🏨</span>
                  <div>
                    <p className="text-[8px] font-bold text-stone-300 uppercase leading-none mb-1">Accommodation</p>
                    <p className="text-xs font-bold text-stone-700 font-serif-jp">{item.accommodation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div >
  );
};

const MagazineView = ({ selectedDay, setSelectedDay, weather, exchangeRate, currentItinerary }) => {
  return (
    <div className="min-h-screen bg-transparent selection:bg-pink-100 flex flex-col lg:flex-row font-sans-editorial text-wa-ink">
      {/* 1. PC SIDEBAR (Desktop Only) */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-80 bg-white/10 backdrop-blur-3xl border-r border-white/30 z-50 flex-col p-10 transition-all overflow-hidden">
        <div className="absolute -right-20 top-20 writing-vertical-magazine text-[120px] font-black text-wa-pink/5 select-none pointer-events-none">
          HOKKAIDO
        </div>

        <div className="mb-14 relative z-10">
          <Sparkles className="w-12 h-12 text-wa-pink mb-6" />
          <h2 className="editorial-title text-4xl text-wa-ink leading-none">THE<br />SUMMER<br />JOURNAL</h2>
          <div className="h-1 w-12 bg-wa-cyan mt-4"></div>
        </div>

        <nav className="flex flex-col gap-1 overflow-y-auto no-scrollbar relative z-10 pr-4">
          {currentItinerary.map((item) => (
            <button
              key={item.day}
              onClick={() => setSelectedDay(item.day)}
              className={`flex items-baseline gap-4 py-3.5 px-3 rounded-2xl transition-all duration-500 group border-l-4 ${selectedDay === item.day
                ? 'border-wa-pink bg-white/40 shadow-xl shadow-wa-pink/5 text-wa-ink translate-x-1'
                : 'border-transparent text-gray-400 hover:text-wa-pink hover:bg-white/20 hover:translate-x-1'
                }`}
            >
              <span className={`text-xl font-black italic transition-opacity ${selectedDay === item.day ? 'opacity-100' : 'opacity-20 group-hover:opacity-100'}`}>0{item.day}</span>
              <div className="text-left">
                <p className="legible-caps opacity-40">{item.date.split(' ')[0]}</p>
                <p className={`text-sm font-black leading-none mt-1 transition-colors ${selectedDay === item.day ? 'text-wa-ink' : 'text-gray-400 group-hover:text-wa-ink'}`}>{item.title.split(' ')[0]}</p>
              </div>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/20 relative z-10">
          <div className="flex items-center gap-3 text-wa-ink/60 mb-2">
            <span className="text-xs font-bold uppercase tracking-widest">Live Status</span>
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <p className="text-[10px] leading-relaxed opacity-60">2026 SUMMER EXPEDITION<br />SAPPORO · FURANO · OTARU</p>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 lg:ml-80 min-h-screen flex flex-col items-center overflow-x-hidden">
        {/* Responsive Navbar (Editorial Style for PC/Tablet) */}
        <nav className="w-full px-8 py-10 hidden md:flex justify-between items-end max-w-[1400px] border-b border-wa-ink/5 mb-10">
          <div className="space-y-1">
            <p className="text-[10px] font-black tracking-[0.5em] text-wa-pink uppercase">Issue No. 01 — Hokkaido</p>
            <h1 className="editorial-title text-2xl text-wa-ink">SEASONAL DISCOVERY</h1>
          </div>
          <div className="flex items-center gap-8 pr-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black text-gray-400 uppercase">Weather</p>
              <p className="text-sm font-black text-wa-ink">{weather.temp}°C {weather.condition}</p>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black text-gray-400 uppercase">Exchange</p>
              <p className="text-sm font-black text-wa-ink">1:{exchangeRate} JPY</p>
            </div>
          </div>
        </nav>

        {/* --- TABLET/PC ONLY: MAGAZINE SECTIONS --- */}
        <div className="hidden md:block w-full max-w-[1400px] px-8 pb-32">
          {/* Cover Section (Magazine Spread Style) */}
          <section className="mb-24">
            <div className="magazine-grid">
              <div className="col-span-12 lg:col-span-9 relative group">
                <div className="absolute -top-6 -left-6 writing-vertical-magazine text-[10px] font-black tracking-[0.8em] text-wa-pink/30 uppercase hidden xl:block">EXPLORATION GUIDE</div>
                <div className="aspect-[21/9] overflow-hidden rounded-[2.5rem] shadow-2xl relative">
                  <img
                    src="/hokkaido_cover_custom.jpg"
                    alt="Hokkaido Summer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-wa-ink/80 via-wa-ink/20 to-transparent"></div>
                  <div className="absolute bottom-12 left-12 text-white drop-shadow-2xl">
                    <div className="w-12 h-1 bg-wa-cyan mb-6"></div>
                    <p className="text-[12px] font-black tracking-[0.6em] opacity-90 mb-4 uppercase">SUMMER 2026</p>
                    <h2 className="editorial-title text-7xl md:text-8xl leading-none">北海道 · 夏。</h2>
                  </div>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-3 flex flex-col justify-end gap-10 pb-6 lg:pl-4">
                <div className="glass-magazine p-10 rounded-[2.5rem] border-white/80 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 bg-wa-ink text-white legible-caps !opacity-100 px-4 py-1.5 tracking-tighter">Logistics</div>
                  <h4 className="legible-caps text-wa-pink mb-8">Flight Status</h4>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl p-1 shadow-sm flex items-center justify-center">
                        <img src="/images/airlines/starlux_logo.png" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-wa-ink leading-none">JX850 — TPE/CTS</p>
                        <p className="text-[8px] font-bold text-gray-400 mt-1">10:05 → 15:10</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl p-1 shadow-sm flex items-center justify-center">
                        <img src="/images/airlines/jal_logo.png" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-wa-ink leading-none">JL508 — CTS/HND</p>
                        <p className="text-[8px] font-bold text-gray-400 mt-1">11:25 → 13:05</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 border-l-4 border-wa-pink pl-8">
                  <p className="text-[11px] font-black text-wa-pink uppercase tracking-widest">Introduction</p>
                  <p className="text-lg font-serif-jp text-wa-ink leading-relaxed italic font-bold">
                    「在薰衣草盛開的海，<br />找尋北國最溫柔的風。」
                  </p>
                </div>
                <div className="bg-wa-pink/5 hover:bg-wa-pink/10 transition-colors p-8 rounded-[2.5rem] border border-wa-pink/10 shadow-sm group cursor-pointer">
                  <p className="text-[10px] font-black text-wa-pink mb-4 uppercase tracking-[0.2em]">Bloom Alert</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm rotate-3 group-hover:rotate-0 transition-transform">🌸</div>
                    <div>
                      <p className="text-sm font-black text-wa-ink">富良野・薰衣草</p>
                      <p className="text-[10px] text-wa-pink font-bold">盛開期 Full Bloom</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Day Detail Spread (Editorial Grid) */}
          {currentItinerary.filter(d => d.day === selectedDay).map((item) => (
            <div key={item.day} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              {/* Left Column: Visual Storytelling (8 Columns on Tablet/PC) */}
              <div className="col-span-1 md:col-span-7 lg:col-span-8 space-y-12 md:space-y-16">
                <div>
                  <div className="flex items-center gap-6 mb-8">
                    <span className="editorial-title text-6xl md:text-8xl text-wa-pink/20">0{item.day}</span>
                    <div className="h-0.5 flex-1 bg-wa-ink/5"></div>
                    <span className="text-[10px] font-black tracking-widest text-wa-ink/30 uppercase">{item.date}</span>
                  </div>
                  <h3 className="editorial-title text-4xl md:text-5xl text-wa-ink mb-6 max-w-2xl leading-tight">{item.title}</h3>
                  <div className="flex gap-4">
                    <span className="bg-wa-cyan/10 text-wa-cyan text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-wa-cyan/20">{item.focus}</span>
                    <span className="bg-wa-pink/10 text-wa-pink text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-wa-pink/20">Summer Limited</span>
                  </div>
                </div>

                {/* Photo Gallery (Magazine Collage Style) */}
                <div className="grid grid-cols-12 gap-4 md:gap-6 items-start">
                  {item.photos.map((photo, pIdx) => (
                    <div
                      key={pIdx}
                      className={`${pIdx === 0 ? 'col-span-12 md:col-span-8' : 'col-span-6 md:col-span-4'} overflow-hidden rounded-2xl shadow-xl hover-lift group relative`}
                    >
                      <img src={photo} alt="" className="w-full aspect-[4/5] object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                        <p className="text-[8px] font-black text-white bg-wa-ink/80 px-2 py-1 inline-block uppercase tracking-widest">Memory #{pIdx + 1}</p>
                      </div>
                    </div>
                  ))}
                  <div className="col-span-12 mt-6">
                    <div className="glass-magazine p-8 rounded-[3rem] border-white/80">
                      <h4 className="editorial-title text-xl text-wa-ink mb-4 flex items-center gap-3">
                        <Hotel className="w-5 h-5 text-wa-pink" /> 住宿精選 (Stay)
                      </h4>
                      <p className="text-xl font-serif-jp text-wa-ink font-black">{item.accommodation}</p>
                      <p className="text-xs text-wa-ink/60 mt-2 leading-relaxed">入住這間精選飯店，為明天的冒險補給能量。建議提前預約晚餐。</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Practical Details (5/4 Columns on Tablet/PC) */}
              <div className="col-span-1 md:col-span-5 lg:col-span-4 space-y-12 md:sticky md:top-10 h-fit">
                {/* Timeline */}
                <div className="bg-white/40 p-8 md:p-10 rounded-[2.5rem] border border-white/60 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><Clock className="w-20 h-20" /></div>
                  <h4 className="editorial-title text-sm text-wa-ink mb-10 tracking-[0.2em] relative z-10">SCHEDULE</h4>
                  <div className="space-y-8 relative z-10">
                    {item.timeline.map((event, eIdx) => (
                      <div key={eIdx} className="flex gap-6 group">
                        <span className="text-xs font-black text-wa-pink/40 w-10 group-hover:text-wa-pink transition-colors font-mono">{event.time}</span>
                        <div className="flex-1 space-y-1">
                          <p className="text-[10px] font-black text-wa-cyan uppercase tracking-tighter">{event.label}</p>
                          <p className="text-sm font-serif-jp text-wa-ink leading-snug">{event.activity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="space-y-6">
                  <h4 className="editorial-title text-sm text-wa-ink tracking-[0.2em] pl-4">LOCAL PICKS</h4>
                  <div className="space-y-4">
                    {item.recommendations.map((rec, rIdx) => (
                      <div key={rIdx} className="glass-magazine p-6 rounded-3xl border-white/60 flex items-start gap-5 hover:bg-white/80 transition-all cursor-pointer group">
                        <div className={`p-4 rounded-2xl ${rec.type === 'food' ? 'bg-orange-100/50 text-orange-500' : 'bg-cyan-100/50 text-cyan-500'}`}>
                          {rec.type === 'food' ? <Utensils className="w-6 h-6" /> : <MapPin className="w-6 h-6" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-black text-wa-ink group-hover:text-wa-pink transition-colors">{rec.title}</p>
                          <p className="text-[10px] text-wa-ink/60 mt-2 leading-relaxed line-clamp-2">{rec.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Logistics Info (Quick view) - Only show if transportAdvice exists */}
                {item.transportAdvice && (
                  <div className="bg-gradient-to-br from-wa-ink to-[#1a365d] p-8 rounded-[2.5rem] text-white shadow-2xl shadow-wa-ink/20 border border-white/10">
                    <Car className="w-8 h-8 mb-6 text-wa-pink" />
                    <h5 className="legible-caps !text-white !opacity-60 mb-3">Transport Advice</h5>
                    <p className="text-base md:text-lg leading-relaxed font-serif-jp tracking-tight font-bold">
                      "{item.transportAdvice}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* --- COMMON: BOTTOM DOCK (Tablet Only) --- */}
        <nav className="fixed bottom-6 left-6 right-6 h-20 bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[2.5rem] shadow-2xl z-[100] hidden md:flex lg:hidden justify-around items-center">
          {[{ icon: MapPin, l: 'Plan' }, { icon: Camera, l: 'Photos' }, { icon: Sparkles, l: 'Highlights' }, { icon: Utensils, l: 'Local' }].map(({ icon: Icon, l }, i) => (
            <button key={i} className="flex flex-col items-center gap-1 group relative">
              <div className="p-3 rounded-2xl group-active:bg-wa-pink/20 transition-all">
                <Icon className="w-6 h-6 text-wa-pink" />
              </div>
              <span className="text-[8px] font-black uppercase text-wa-pink mt-1">{l}</span>
            </button>
          ))}
        </nav>
      </main>
    </div>
  );
};

function App() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [weather, setWeather] = useState({ temp: '--', condition: 'Loading' });
  const [exchangeRate, setExchangeRate] = useState('--');
  const isMobile = useIsMobile();

  const currentItinerary = itineraryData;

  useEffect(() => {
    // Fetch Weather (Sapporo)
    fetch('https://api.open-meteo.com/v1/forecast?latitude=43.0642&longitude=141.3468&current_weather=true')
      .then(res => res.json())
      .then(data => {
        if (data.current_weather) {
          setWeather({ temp: Math.round(data.current_weather.temperature), condition: 'Live' });
        }
      })
      .catch(err => console.error('Weather error:', err));

    // Fetch Exchange Rate (TWD -> JPY)
    fetch('https://open.er-api.com/v6/latest/TWD')
      .then(res => res.json())
      .then(data => {
        if (data.rates && data.rates.JPY) {
          setExchangeRate(data.rates.JPY.toFixed(2));
        }
      })
      .catch(err => console.error('Rate error:', err));
  }, []);

  const props = { selectedDay, setSelectedDay, weather, exchangeRate, currentItinerary };

  return isMobile ? <MobileView {...props} /> : <MagazineView {...props} />;
}

export default App;
