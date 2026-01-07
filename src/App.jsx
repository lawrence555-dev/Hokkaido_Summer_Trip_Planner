import React, { useState, useEffect } from 'react';
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
    accommodation: "札幌 Vessel Inn 中島公園 (海鮮早餐極強)",
    photos: ["/images/day1/ots_rental.png", "/images/day1/tanukikoji.jpg", "/images/day1/soup_curry.jpg"]
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
    accommodation: "札幌 Vessel Inn 中島公園 (續住免搬行李)",
    photos: ["/images/day2/otaru_canal.jpg", "/images/day2/mitsui_outlet.png", "/images/day2/vessel_inn_park.jpg"]
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
      { time: "17:00", label: "入住", activity: "入住 OMO7 旭川 (星野集團)。" }
    ],
    accommodation: "OMO7 旭川 (親子友善飯店)",
    photos: ["/images/day3/asahiyama_zoo.jpg", "/images/day3/aeon_mall.png", "/images/day3/omo7_asahikawa.jpg"]
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
    photos: ["/images/day4/shikisai_no_oka.jpg", "/images/day4/blue_pond.jpg", "/images/day4/tomita_farm.jpg", "/images/day4/ningle_terrace.jpg"]
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
    photos: ["/images/day5/noboribetsu_jigokudani.png", "/images/day5/oyunuma.jpg", "/images/day5/dai_ichi_takimotokan.jpg"]
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
    photos: ["/images/day6/showa_shinzan_bear_park.jpg", "/images/day6/toyako_cruise.jpg", "/images/day6/toyako_fireworks.jpg"]
  },
  {
    day: 7,
    date: "07/13 Mon.",
    title: "機場最後巡禮與返台",
    focus: "還車、補貨、伴手禮",
    timeline: [
      { time: "08:45", label: "出發", activity: "準時退房，開往 OTS 千歲營業所（約 1.25 小時）。" },
      { time: "10:00", label: "還車", activity: "附近加油站加滿油後，完成 OTS 還車。" },
      { time: "11:00", label: "逛街", activity: "機場 2 樓買六花亭、北菓樓等螃蟹名產補貨。", highlight: true },
      { time: "12:00", label: "親子", activity: "機場 3 樓哆啦 A 夢與 Hello Kitty 樂園。" },
      { time: "15:00", label: "登機", activity: "辦理登機，準備帶著滿滿回憶返台。" }
    ],
    accommodation: "溫暖的家",
    photos: ["/images/day7/new_chitose_airport.png", "/images/day7/airport_souvenirs.jpg"]
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
    <div className="selection:bg-purple-100 min-h-screen flex flex-col items-center pb-32">
      <nav className="w-full p-6 flex justify-between items-center max-w-4xl">
        <div className="border-b-4 border-stone-800 pb-1">
          <h1 className="text-base font-bold tracking-[0.4em] font-serif-jp uppercase text-stone-800">Hokkaido '26</h1>
        </div>
        <div className="text-[10px] font-handwriting opacity-40 tracking-widest uppercase">Travel Journal</div>
      </nav>

      {/* 資訊欄 */}
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
                    <p className="text-lg font-black text-stone-700 leading-none">11:45</p>
                    <p className="text-[8px] font-bold text-stone-400 mt-1">新千歲 (國內線D)</p>
                  </div>
                  <div className="flex-1 flex flex-col items-center px-4 mb-2">
                    <div className="w-full h-[1px] bg-stone-200 relative mb-1">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-stone-300 rotate-180">✈️</div>
                    </div>
                    <span className="text-[8px] text-stone-300 font-mono">A350 廣體機</span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-stone-700 leading-none">13:25</p>
                    <p className="text-[8px] font-bold text-stone-400 mt-1">羽田 HND (T1)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10 bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-[40px] border border-orange-100 shadow-sm">
          <h4 className="flex items-center gap-2 text-orange-600 font-bold text-sm mb-4">
            <span>🌟</span> 3 大 1 小 行程貼士 (Pro Tips)
          </h4>
          <div className="grid grid-cols-1 gap-4 text-xs text-stone-600 leading-relaxed font-serif-jp">
            <div className="bg-white/60 p-3 rounded-2xl">
              <p className="font-bold text-orange-700 mb-1">🍈 哈密瓜盛產期</p>
              <p>7/10 前後是富良野哈密瓜最盛產的時候，路邊農場通常比超市更便宜好食。</p>
            </div>
            <div className="bg-white/60 p-3 rounded-2xl">
              <p className="font-bold text-orange-700 mb-1">🦀 螃蟹/海鮮秘訣</p>
              <p>在小樽三角市場建議挑選活蟹現煮，味道最鮮。記得提早預約札幌的螃蟹餐廳。</p>
            </div>
            <div className="bg-white/60 p-3 rounded-2xl">
              <p className="font-bold text-orange-700 mb-1">🛌 房型選擇建議</p>
              <p>預訂時註明需要「Triple Room (三床房)」或「和洋室」，3 位大人才能住得舒適。</p>
            </div>
            <div className="bg-white/60 p-3 rounded-2xl">
              <p className="font-bold text-orange-700 mb-1">🎆 煙火觀賞提示</p>
              <p>洞爺湖煙火 20:45 施放。乃之風房內觀賞最愜意，泡完溫泉換上浴衣最享受。</p>
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
                <div className="washi-tape"></div>
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
}

export default App;
