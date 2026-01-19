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
              className={`flex items-baseline gap-4 py-3 px-2 rounded-xl transition-all duration-500 group border-l-2 ${selectedDay === item.day
                ? 'border-wa-pink text-wa-ink translate-x-1'
                : 'border-transparent text-gray-400 hover:text-wa-pink hover:translate-x-1'
                }`}
            >
              <span className="text-xl font-black italic opacity-20 group-hover:opacity-100 transition-opacity">0{item.day}</span>
              <div className="text-left">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]">{item.date.split(' ')[0]}</p>
                <p className={`text-xs font-bold leading-none mt-1 ${selectedDay === item.day ? 'text-wa-ink' : 'text-gray-400'}`}>{item.title.split(' ')[0]}</p>
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

        {/* --- MOBILE ONLY: ORIGINAL SECTIONS --- */}
        <div className="w-full max-w-5xl px-6 pt-12 pb-32 flex flex-col gap-10 md:hidden">
          {/* Mobile Header */}
          <section className="text-center relative py-6">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-2xl">
                <Sparkles className="w-10 h-10 text-wa-pink" />
              </div>
            </div>
            <h1 className="text-4xl font-serif-jp font-black text-wa-ink mb-2">北海道 夏日親子自駕</h1>
            <p className="text-sm font-handwriting text-pink-400 italic">2026年、夏。和家人一起的北國冒險。</p>
          </section>

          {/* Mobile Quick Stats */}
          <section className="grid grid-cols-3 gap-3">
            <div className="bg-white/40 p-4 rounded-3xl border border-white/60 flex flex-col items-center gap-1 shadow-sm">
              <Clock className="w-4 h-4 text-wa-pink" />
              <p className="text-xs font-black">{weather.temp}°C</p>
              <p className="text-[8px] font-black text-wa-pink/40 uppercase">SAPPORO</p>
            </div>
            <div className="bg-white/40 p-4 rounded-3xl border border-white/60 flex flex-col items-center gap-1 shadow-sm">
              <Info className="w-4 h-4 text-wa-cyan" />
              <p className="text-xs font-black">1:{exchangeRate}</p>
              <p className="text-[8px] font-black text-wa-cyan/40 uppercase">JPY/TWD</p>
            </div>
            <div className="bg-white/40 p-4 rounded-3xl border border-white/60 flex flex-col items-center gap-1 shadow-sm">
              <span className="text-sm">🌸</span>
              <p className="text-xs font-black text-orange-600">滿開</p>
              <p className="text-[8px] font-black text-orange-600/40 uppercase">BLOOM</p>
            </div>
          </section>

          {/* Mobile Logistics */}
          <div className="grid grid-cols-1 gap-4">
            <section className="wa-card p-6 shadow-xl border-dashed border-wa-pink/20 relative bg-white/60">
              <h4 className="flex items-center gap-2 text-wa-ink font-bold text-sm mb-4"><Calendar className="w-4 h-4 text-wa-cyan" /> 交通與規劃</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-black">
                  <span className="text-wa-ink/40 uppercase tracking-widest">Flight JX850</span>
                  <span className="text-wa-cyan">10:05 TPE → 15:10 CTS</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black">
                  <span className="text-wa-ink/40 uppercase tracking-widest">Rental OTS</span>
                  <span className="text-wa-pink">NOAH/VOXY 7-SEAT</span>
                </div>
              </div>
            </section>
          </div>

          {/* Mobile Day Selector (Horizontal) */}
          <section className="mt-4">
            <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar -mx-6 px-6 snap-x">
              {currentItinerary.map((item) => (
                <button
                  key={item.day}
                  onClick={() => setSelectedDay(item.day)}
                  className={`snap-center shrink-0 flex flex-col items-center justify-center w-[80px] h-[100px] rounded-[32px] border-2 transition-all duration-300 ${selectedDay === item.day
                    ? 'bg-wa-pink text-white border-wa-pink shadow-xl -translate-y-2'
                    : 'bg-white/50 text-wa-pink/40 border-white/80'
                    }`}
                >
                  <span className="text-[8px] font-bold opacity-60">DAY</span>
                  <span className="text-2xl font-black">{item.day}</span>
                  <span className="text-[8px] font-bold mt-1 opacity-60 uppercase">{item.date.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Mobile Detail Card (Original Style) */}
          {currentItinerary.filter(d => d.day === selectedDay).map((item) => (
            <section key={item.day} className="wa-card p-0 shadow-2xl relative overflow-visible border-white/80 bg-white/40">
              {/* Washi Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-wa-pink/20 backdrop-blur-md border border-white/40 rotate-1 flex items-center justify-around px-4 z-[60] shadow-sm">
                <span className="text-[8px]">🌸</span><span className="text-[8px]">🍈</span><span className="text-[8px]">🌸</span>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center border-b border-wa-pink/10 pb-4">
                  <div className="w-14 h-14 rounded-2xl bg-wa-ink text-white flex flex-col items-center justify-center shadow-lg -rotate-2 border-2 border-white/20">
                    <span className="text-[8px] font-black opacity-60">D0{item.day}</span>
                    <span className="text-xl font-black italic">{item.date.split('/')[1].split(' ')[0]}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-wa-pink uppercase tracking-widest mb-1">{item.focus.split('、')[0]}</p>
                    <p className="text-base font-black text-wa-ink leading-tight max-w-[180px]">{item.title}</p>
                  </div>
                </div>

                {/* Horizontal Photo Strip */}
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x no-scrollbar -mx-2">
                  {item.photos.map((photo, pIdx) => (
                    <div key={pIdx} className="snap-center shrink-0 w-44 h-56 bg-white p-3 shadow-xl border border-stone-100 rotate-1 hover:rotate-0 transition-transform">
                      <img src={photo} alt="" className="w-full h-full object-cover rounded-sm grayscale-[0.1]" />
                      <p className="text-[8px] font-handwriting mt-2 text-stone-400 text-center">Memory #{selectedDay}-{pIdx + 1}</p>
                    </div>
                  ))}
                </div>

                {/* Vertical Timeline (Original Style) */}
                <div className="relative pl-6 py-2">
                  <div className="absolute left-[7px] top-0 bottom-0 w-[1.5px] bg-wa-pink/10"></div>
                  <div className="space-y-8">
                    {item.timeline.map((event, eIdx) => (
                      <div key={eIdx} className={`relative flex gap-4 ${event.highlight ? 'scale-105 origin-left' : ''}`}>
                        <div className={`absolute -left-[23px] top-1.5 w-3 h-3 rounded-full border-2 bg-white z-10 ${event.highlight ? 'border-wa-cyan' : 'border-wa-pink'}`}></div>
                        <span className="text-[10px] font-black text-wa-pink/40 w-10 pt-0.5">{event.time}</span>
                        <div className="flex-1">
                          <p className={`text-[11px] font-black uppercase tracking-tighter ${event.highlight ? 'text-wa-cyan' : 'text-wa-pink/60'}`}>{event.label}</p>
                          <p className="text-sm font-serif-jp text-wa-ink leading-snug font-bold">{event.activity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Accommodation info */}
                <div className="bg-wa-ink/5 p-5 rounded-[2rem] border border-white flex items-start gap-4 shadow-inner">
                  <div className="p-3 bg-white rounded-2xl shadow-sm"><Hotel className="w-5 h-5 text-wa-pink" /></div>
                  <div>
                    <p className="text-[10px] font-black text-wa-ink/40 uppercase tracking-widest mb-1">Stay / Night</p>
                    <p className="text-sm font-black text-wa-ink font-serif-jp leading-tight">{item.accommodation}</p>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* --- TABLET/PC ONLY: MAGAZINE SECTIONS --- */}
        <div className="hidden md:block w-full max-w-[1400px] px-8 pb-32">
          {/* Cover Section (Magazine Spread Style) */}
          <section className="mb-24">
            <div className="magazine-grid">
              <div className="col-span-12 lg:col-span-9 relative group">
                <div className="absolute -top-6 -left-6 writing-vertical-magazine text-[10px] font-black tracking-[0.8em] text-wa-pink/30 uppercase hidden xl:block">EXPLORATION GUIDE</div>
                <div className="aspect-[21/9] overflow-hidden rounded-[2.5rem] shadow-2xl relative">
                  <img
                    src="https://images.unsplash.com/photo-1550850839-8dc0c480d530?auto=format&fit=crop&q=80&w=2071"
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
                      <div key={rIdx} className="bg-wa-ink/5 p-6 rounded-3xl border border-wa-ink/5 flex items-start gap-5 hover:bg-wa-ink/10 transition-all cursor-pointer group">
                        <div className={`p-3 rounded-2xl ${rec.type === 'food' ? 'bg-orange-100/50 text-orange-500' : 'bg-cyan-100/50 text-cyan-500'}`}>
                          {rec.type === 'food' ? <Utensils className="w-6 h-6" /> : <MapPin className="w-6 h-6" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-black text-wa-ink group-hover:text-wa-pink transition-colors">{rec.title}</p>
                          <p className="text-[10px] text-wa-ink/50 mt-1 leading-relaxed line-clamp-2">{rec.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Logistics Info (Quick view) */}
                <div className="bg-gradient-to-br from-wa-cyan to-cyan-600 p-8 rounded-[2.5rem] text-white shadow-2xl">
                  <Car className="w-8 h-8 mb-4 opacity-50" />
                  <h5 className="text-[10px] font-black uppercase tracking-widest mb-2">Transport Advice</h5>
                  <p className="text-xs leading-relaxed opacity-90 font-serif-jp italic">"這段路程約 2.5 小時，沿路景觀優美。建議在休息站稍作停留，品嚐當地哈密瓜。"</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- COMMON: BOTTOM DOCK (Mobile/Tablet Only) --- */}
        <nav className="fixed bottom-6 left-6 right-6 h-20 bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[2.5rem] shadow-2xl z-[100] flex justify-around items-center lg:hidden">
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
}

export default App;
