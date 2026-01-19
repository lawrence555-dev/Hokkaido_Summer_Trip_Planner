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
      { time: "13:00", label: "親子", activity: "逛旭山動物園，看北極熊、企鵝和海豹。" },
      { time: "17:00", label: "入住", activity: "入住 旭川HOTEL AMANEK。" }
    ],
    accommodation: "旭川HOTEL AMANEK",
    photos: ["/images/day3/asahiyama_zoo.jpg", "/images/day3/aeon_mall.png", "/images/day3/omo7_asahikawa.jpg"],
    recommendations: [
      { type: "food", title: "味噌拉麵", desc: "元祖拉麵橫丁，濃郁味噌湯頭。" },
      { type: "spot", title: "二條市場", desc: "享用海鮮蓋飯當早餐的最佳去處。" }
    ]
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
      { time: "19:30", label: "入住", activity: "入住新富良野王子大飯店。" }
    ],
    accommodation: "新富良野王子大飯店",
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
      { time: "16:00", label: "入住", activity: "入住第一瀧本館，使用 35 種溫泉池。", highlight: true },
      { time: "18:00", label: "放電", activity: "在室內大型水樂園玩划水道，小孩絕對超嗨。" }
    ],
    accommodation: "第一瀧本館 (超強親子溫泉飯店)",
    photos: ["/images/day5/noboribetsu_jigokudani.png", "/images/day5/oyunuma.jpg", "/images/day5/dai_ichi_takimotokan.jpg"],
    recommendations: [
      { type: "spot", title: "大湯沼足湯", desc: "在森林中享受天然溫泉足浴。" }
    ]
  },
  {
    day: 6,
    date: "07/12 Sun.",
    title: "洞爺湖煙火之夜",
    focus: "餵熊、汽船、湖畔煙火",
    timeline: [
      { time: "09:30", label: "洞爺湖", activity: "退房後開往洞爺湖（約 1 小時）。" },
      { time: "11:00", label: "體驗", activity: "昭和新山熊牧場餵棕熊、搭乘環湖汽船。" },
      { time: "15:00", label: "入住", activity: "入住乃之風渡假飯店，享受全湖景房。", highlight: true },
      { time: "20:45", label: "煙火", activity: "躺在房間看洞爺湖煙火在窗外綻放。" }
    ],
    accommodation: "乃之風渡假飯店 (每房皆有面湖大窗)",
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
      { time: "08:30", label: "出發", activity: "乃之風退房，前往千歲市區。若想買限量玉米麵包建議此時抵達。" },
      { time: "09:15", label: "加油", activity: "於 OTS 營業所附近加油站加滿油。" },
      { time: "09:30", label: "還車", activity: "抵達 OTS 千歲營業所辦理還車手續。", highlight: true },
      { time: "09:45", label: "接駁", activity: "搭乘 OTS 免費接駁車前往機場國內線航廈。" },
      { time: "10:15", label: "報到", activity: "抵達國內線航廈，辦理行李托運與報到。" },
      { time: "11:45", label: "飛行", activity: "搭乘 JL508 班機前往羽田機場。再見，北海道！", highlight: true }
    ],
    accommodation: "東京羽田/溫暖的家",
    photos: ["/images/day7/new_chitose_airport.png", "/images/day7/airport_souvenirs.jpg"],
    recommendations: [
      { type: "food", title: "美瑛之丘玉米麵包", desc: "新千歲機場排隊名店，建議早點還車去排隊。" },
      { type: "spot", title: "新千歲伴手禮區", desc: "Royce'、六花亭、北菓樓最後掃貨。" }
    ]
  }
];

function App() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [weather, setWeather] = useState({ temp: '--', condition: 'Loading' });
  const [exchangeRate, setExchangeRate] = useState('--');

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

  return (
    <div className="min-h-screen bg-transparent selection:bg-pink-100 flex flex-col lg:flex-row">
      {/* 1. PC SIDEBAR (Desktop Only) */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-72 bg-white/20 backdrop-blur-2xl border-r border-white/40 z-50 flex-col p-8 transition-all">
        <div className="mb-10">
          <Sparkles className="w-10 h-10 text-wa-pink mb-4" />
          <h2 className="text-2xl font-serif-jp font-black text-wa-ink leading-tight">HOKKAIDO<br />SUMMER 2026</h2>
        </div>
        <nav className="flex flex-col gap-3 overflow-y-auto no-scrollbar">
          {currentItinerary.map((item) => (
            <button
              key={item.day}
              onClick={() => setSelectedDay(item.day)}
              className={`flex items-center gap-4 p-4 rounded-3xl transition-all duration-300 group ${selectedDay === item.day
                ? 'bg-wa-pink text-white shadow-xl scale-[1.02]'
                : 'bg-white/40 text-pink-400 hover:bg-white/60'
                }`}
            >
              <span className="text-lg font-black opacity-30">0{item.day}</span>
              <div className="text-left">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Day</p>
                <p className="text-xs font-bold leading-none">{item.date.split(' ')[0]}</p>
              </div>
              {selectedDay === item.day && <div className="ml-auto w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse" />}
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-6">
          <div className="bg-wa-pink/10 p-4 rounded-2xl border border-wa-pink/20">
            <p className="text-[10px] font-bold text-wa-pink mb-1 uppercase">Pro Tip</p>
            <p className="text-[10px] text-wa-ink/70 leading-relaxed font-serif-jp">使用 PC 模式可同時查看地圖與詳細行程。</p>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT */}
      <main className="flex-1 lg:ml-72 min-h-screen flex flex-col items-center">
        {/* Global Toolbar */}
        <nav className="w-full p-6 flex justify-between items-center max-w-5xl">
          <div className="border-b-4 border-stone-800 pb-1">
            <h1 className="text-sm font-bold tracking-[0.4em] font-serif-jp uppercase text-stone-800">Sapporo - Otaru - Furano</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 bg-white/40 px-4 py-2 rounded-full border border-white/60 shadow-sm">
              <span className="text-xs font-bold">🌡️ {weather.temp}°C</span>
              <span className="text-stone-300">|</span>
              <span className="text-xs font-bold">💵 1:{exchangeRate}</span>
            </div>
            <div className="text-[10px] font-handwriting opacity-40 tracking-widest uppercase">Journal '26</div>
          </div>
        </nav>

        <div className="w-full max-w-5xl px-6 py-4 flex flex-col gap-10">
          {/* Header Section */}
          <section className="text-center relative py-12">
            <div className="absolute top-0 right-0 flex items-center gap-2">
              <span className="text-[10px] bg-white/80 px-2 py-0.5 rounded text-pink-400 font-bold uppercase tracking-tighter shadow-sm border border-pink-100">Official</span>
              <span className="text-[10px] bg-wa-pink px-2 py-0.5 rounded text-white font-bold uppercase tracking-tighter shadow-sm">VER. 2026</span>
            </div>
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-2xl">
                <Sparkles className="w-10 h-10 text-pink-500" />
              </div>
            </div>
            <h1 className="text-5xl font-serif-jp font-black text-wa-ink mb-2 drop-shadow-sm tracking-tight">北海道 夏日親子自駕</h1>
            <p className="text-base font-handwriting text-pink-400 italic">2026年、夏。親子自駕、煙火與購物、紫色的花畑。</p>
          </section>

          {/* Quick Stats Grid (Mobile/iPad) */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:hidden">
            <div className="bg-white/40 p-4 rounded-3xl border border-white/60 flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-500"><Clock className="w-5 h-5" /></div>
              <div><p className="text-[10px] text-pink-400 font-bold uppercase">Temp</p><p className="text-sm font-black">{weather.temp}°C</p></div>
            </div>
            <div className="bg-white/40 p-4 rounded-3xl border border-white/60 flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-500"><Info className="w-5 h-5" /></div>
              <div><p className="text-[10px] text-cyan-400 font-bold uppercase">Rate</p><p className="text-sm font-black">1:{exchangeRate}</p></div>
            </div>
            <div className="bg-white/40 p-4 rounded-3xl border border-white/60 flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500">🌸</div>
              <div><p className="text-[10px] text-orange-400 font-bold uppercase">Bloom</p><p className="text-sm font-black text-orange-600">滿開中</p></div>
            </div>
          </section>

          {/* Logistic Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="wa-card p-6 shadow-xl border-dashed border-wa-pink/20 relative">
              <div className="absolute top-0 right-0 bg-wa-ink text-white text-[10px] px-3 py-1 font-bold rounded-bl-lg">LOGISTICS</div>
              <h4 className="flex items-center gap-2 text-wa-ink font-bold text-sm mb-6"><Sparkles className="w-4 h-4 text-cyan-500" /> 航班重點 (Flights)</h4>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 bg-white/40 p-3 rounded-2xl border border-white/60 justify-between">
                  <span className="text-[10px] font-bold text-stone-400">去程 JX850</span>
                  <span className="text-xs font-black text-cyan-600">10:05 TPE → 15:10 CTS</span>
                </div>
                <div className="flex items-center gap-4 bg-white/40 p-3 rounded-2xl border border-white/60 justify-between">
                  <span className="text-[10px] font-bold text-stone-400">回程 JL508</span>
                  <span className="text-xs font-black text-rose-600">11:45 CTS → 13:25 HND</span>
                </div>
              </div>
            </section>

            <section className="rental-card shadow-xl overflow-hidden bg-white/20 backdrop-blur-md">
              <div className="absolute top-0 right-0 bg-wa-pink text-white text-[10px] px-3 py-1 font-bold rounded-bl-lg uppercase">Advice</div>
              <h4 className="flex items-center gap-2 text-wa-pink font-bold text-sm mb-4"><Car className="w-5 h-5" /> 租車準備 (Rental)</h4>
              <p className="text-xs text-wa-ink/70 leading-relaxed font-serif-jp">
                建議預約 **7 人座** (Toyota Noah/Voxy)。3 大 1 小行李與推車，5 人座休旅車無法容納。領車時加購 **HEP** 最划算。
              </p>
            </section>
          </div>

          {/* Visualization Analysis */}
          <section className="bg-white/30 backdrop-blur-xl p-8 rounded-[3rem] border border-white/60 shadow-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start justify-around">
              <div className="flex flex-col items-center">
                <p className="text-[10px] font-bold text-pink-300 uppercase tracking-widest mb-6">Itinerary Radar</p>
                <div className="w-64 h-64"><ComparisonRadar /></div>
              </div>
              <div className="flex-1 w-full max-w-sm flex flex-col items-center">
                <p className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest mb-6">Bloom Forecast</p>
                <div className="w-full h-32 mb-4"><BloomLine /></div>
                <p className="text-[8px] text-pink-300 italic">2026 年預計花期資料生成</p>
              </div>
            </div>
          </section>

          {/* DAY SELECTION (Active on Mobile/iPad) */}
          <section className="lg:hidden">
            <div className="flex overflow-x-auto gap-3 pb-6 no-scrollbar -mx-6 px-6 snap-x">
              {currentItinerary.map((item) => (
                <button
                  key={item.day}
                  onClick={() => setSelectedDay(item.day)}
                  className={`snap-center shrink-0 flex flex-col items-center justify-center w-[84px] h-[100px] rounded-[32px] border-2 transition-all duration-300 ${selectedDay === item.day ? 'bg-wa-pink text-white border-wa-pink shadow-lg' : 'bg-white/50 text-pink-300 border-white/80'
                    }`}
                >
                  <span className="text-[10px] font-bold opacity-40">DAY</span>
                  <span className="text-2xl font-black">{item.day}</span>
                  <span className="text-[8px] font-bold mt-1 opacity-50">{item.date.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </section>

          {/* THE ITINERARY DETAIL (The "Big Card") */}
          {currentItinerary.filter(d => d.day === selectedDay).map((item) => (
            <section key={item.day} className="wa-card p-8 md:p-12 mb-20 shadow-2xl relative overflow-visible border-white/80">
              {/* Washi Tape */}
              <div className="washi-tape flex items-center justify-around px-2 text-[10px] z-[60]">
                <span>🌸</span><span>🍈</span><span>🌸</span>
              </div>

              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-16">
                {/* Left Side: Header & Photos */}
                <div className="space-y-10">
                  <div className="flex justify-between items-start">
                    <div className="relative">
                      <div className="absolute -left-12 top-0 writing-vertical-rl text-[10px] font-black tracking-[0.5em] text-cyan-200/50 hidden md:block">JOURNAL SECTION</div>
                      <div className="w-16 h-16 rounded-[2rem] bg-gradient-to-br from-wa-pink to-pink-400 text-white flex flex-col items-center justify-center shadow-lg -rotate-3 border-2 border-white/50">
                        <span className="text-[10px] font-bold opacity-60">DAY</span>
                        <span className="text-2xl font-black">{item.day}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-rose-300 mb-1">LOCAL HIGHLIGHTS</p>
                      <p className="text-xs font-bold text-cyan-500 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100">{item.focus}</p>
                      <p className="text-xs font-serif-jp text-stone-400 mt-2 italic">{item.date}</p>
                    </div>
                  </div>

                  <h2 className="text-4xl font-serif-jp font-black text-wa-ink leading-tight border-l-8 border-cyan-100 pl-6">{item.title}</h2>

                  <div className="flex gap-4 overflow-x-auto pb-4 snap-x no-scrollbar md:grid md:grid-cols-2 md:overflow-visible">
                    {item.photos.map((photo, pIdx) => (
                      <div key={pIdx} className="snap-center shrink-0 w-44 h-56 md:w-full md:h-64 bg-white p-3 shadow-xl rotate-1 first:-rotate-3 last:rotate-3 border border-stone-50 transition-transform hover:rotate-0 hover:scale-[1.03] cursor-pointer">
                        <img src={photo} alt="" className="w-full h-4/5 object-cover mb-2 rounded-sm" />
                        <p className="text-[10px] text-center font-handwriting text-stone-300 italic">Memory #{pIdx + 1}</p>
                      </div>
                    ))}
                  </div>

                  <div className="hidden lg:block">
                    <div className="bg-wa-paper/40 p-6 rounded-[2.5rem] border border-white flex items-center gap-6 shadow-inner">
                      <div className="w-12 h-12 bg-wa-pink rounded-full flex items-center justify-center text-white shadow-lg"><Hotel className="w-6 h-6" /></div>
                      <div>
                        <p className="text-[10px] font-black text-pink-300 mb-1">STAY & REST</p>
                        <p className="text-sm font-bold text-pink-900 font-serif-jp">{item.accommodation}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Timeline & Recommendations */}
                <div className="space-y-12">
                  <div className="timeline-container pl-4">
                    <div className="absolute left-[11px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-transparent via-pink-100 to-transparent"></div>
                    {item.timeline.map((event, eIdx) => (
                      <div key={eIdx} className={`timeline-item pl-8 pb-10 relative last:pb-0 ${event.highlight ? 'highlight' : ''}`}>
                        <div className={`absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 bg-white z-10 transition-colors ${event.highlight ? 'border-wa-cyan bg-wa-cyan shadow-[0_0_12px_rgba(6,182,212,0.4)]' : 'border-wa-pink'
                          }`}></div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-black text-pink-300 font-mono w-10">{event.time}</span>
                          <span className="text-[10px] font-black text-wa-cyan bg-cyan-50 px-2 py-0.5 rounded uppercase tracking-tighter">{event.label}</span>
                        </div>
                        <p className="text-sm font-handwriting text-stone-600 mt-2 leading-relaxed">{event.activity}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h5 className="text-[10px] font-black text-pink-400 uppercase tracking-widest flex items-center gap-3">
                      <span className="h-0.5 w-6 bg-pink-100"></span> 絶品グルメ & 優選景點
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                      {item.recommendations.map((rec, rIdx) => (
                        <div key={rIdx} className="bg-white/50 backdrop-blur-sm p-4 rounded-3xl border border-white/60 flex items-center gap-4 transition-all hover:-translate-y-1 shadow-sm">
                          <div className={`p-2.5 rounded-2xl ${rec.type === 'food' ? 'bg-orange-50 text-orange-400' : 'bg-cyan-50 text-cyan-400'}`}>
                            {rec.type === 'food' ? <Utensils className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="text-xs font-black text-stone-700">{rec.title}</p>
                            <p className="text-[10px] text-stone-400 line-clamp-1">{rec.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:hidden mt-8 bg-wa-paper/40 p-4 rounded-3xl flex items-center gap-4 border border-white">
                <Hotel className="w-5 h-5 text-wa-pink" />
                <p className="text-xs font-bold text-pink-900 font-serif-jp">{item.accommodation}</p>
              </div>
            </section>
          ))}
        </div>

        {/* 3. MOBILE/IPAD BOTTOM DOCK */}
        <nav className="fixed bottom-6 left-6 right-6 h-18 bg-white/20 backdrop-blur-3xl border border-white/40 rounded-[2.5rem] shadow-2xl z-[100] flex justify-around items-center lg:hidden transition-transform">
          {[{ icon: MapPin, l: 'Plan' }, { icon: Camera, l: 'Photos' }, { icon: Sparkles, l: 'Highlights' }, { icon: Utensils, l: 'Local' }].map(({ icon: Icon, l }, i) => (
            <button key={i} className="flex flex-col items-center gap-1 group">
              <div className="p-2 rounded-2xl group-active:bg-pink-100 group-active:text-wa-pink transition-colors">
                <Icon className="w-6 h-6 text-pink-300" />
              </div>
              <span className="text-[8px] font-black uppercase text-pink-300">{l}</span>
            </button>
          ))}
        </nav>
      </main>
    </div>
  );
}

export default App;
