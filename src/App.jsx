import React, { useState, useEffect } from 'react';
// Deploy trigger: 2026-01-06 21:50
import { ComparisonRadar, BloomLine } from './components/JournalCharts';

const itineraryData = [
  {
    day: 1,
    date: "07/07 Tue.",
    title: "抵達與札幌購物夜",
    spots: ["抵達新千歲機場入境與領行李", "搭乘 OTS 接駁車領取 7 人座 (推薦 Noah/Voxy)", "加購 HEP 高速公路通行證", "貍小路商店街補齊藥妝與零食", "晚餐：湯咖哩或成吉思汗烤肉"],
    photos: ["/images/day1/ots_rental.png", "/images/day1/tanukikoji.jpg", "/images/day1/soup_curry.jpg"]
  },
  {
    day: 2,
    date: "07/08 Wed.",
    title: "小樽漫步與 Outlet 大採購",
    spots: ["小樽運河、音樂盒堂、北一硝子館", "三井 Outlet Park 札幌北廣島 (掃貨至 20:00)", "回札幌 Vessel Inn 中島公園休息"],
    photos: ["/images/day2/otaru_canal.jpg", "/images/day2/mitsui_outlet.png", "/images/day2/vessel_inn_park.jpg"]
  },
  {
    day: 3,
    date: "07/09 Thu.",
    title: "旭山動物園與旭川親子時光",
    spots: ["自駕前往旭山動物園 (約 2 小時)", "親子時間：看到企鵝、北極熊與海豹", "AEON 購物中心補貨", "入住 OMO7 旭川 (星野集團)"],
    photos: ["/images/day3/asahiyama_zoo.jpg", "/images/day3/aeon_mall.png", "/images/day3/omo7_asahikawa.jpg"]
  },
  {
    day: 4,
    date: "07/10 Fri.",
    title: "美瑛與富良野：花季最高峰",
    spots: ["四季彩之丘 (搭乘七彩遊園車)", "青池與白鬚瀑布靜謐攝影", "富田農場：欣賞滿開薰衣草", "森林精靈露台：夜晚點燈漫步", "入住新富良野王子大飯店"],
    photos: ["https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=300", "https://images.unsplash.com/photo-1583333222624-9b6574a38340?auto=format&fit=crop&q=80&w=300"]
  },
  {
    day: 5,
    date: "07/11 Sat.",
    title: "登別溫泉與大型水樂園",
    spots: ["慢享早餐後開往登別 (約 2.5 小時)", "地獄谷散策與大湯沼川天然足湯", "入住第一瀧本館 (超大水樂園)", "溫泉泊：大人泡湯，小孩水池放電"],
    photos: ["https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&q=80&w=300", "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&q=80&w=300"]
  },
  {
    day: 6,
    date: "07/12 Sun.",
    title: "洞爺湖煙火之夜",
    spots: ["昭和新山熊牧場餵可愛棕熊", "搭乘洞爺湖汽船巡航湖光山色", "20:45 洞爺湖花火大會 (躺在房間看)", "入住乃之風渡假飯店 (面湖房)"],
    photos: ["https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?auto=format&fit=crop&q=80&w=300", "https://images.unsplash.com/photo-1535924571710-4c6e27716b6d?auto=format&fit=crop&q=80&w=300"]
  },
  {
    day: 7,
    date: "07/13 Mon.",
    title: "機場最後巡禮與返台",
    spots: ["OTS 千歲營業所還車 (附近加滿油)", "機場 2 樓名產甜點最後採買", "機場 3 樓哆啦 A 夢與 Hello Kitty 樂園", "機場還車與登機返台"],
    photos: ["https://images.unsplash.com/photo-1575253301299-db3f10d814dd?auto=format&fit=crop&q=80&w=300", "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=300"]
  }
];

function App() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [checkedItems, setCheckedItems] = useState({});
  const [weather, setWeather] = useState({ temp: '--', condition: 'Loading' });
  const [exchangeRate, setExchangeRate] = useState('--');

  const currentItinerary = itineraryData;

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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
        <section className="mb-20 bg-stone-200/20 p-6 rounded-[40px] border border-white/50 backdrop-blur-sm shadow-inner">
          <div className="space-y-12">
            <div>
              <h4 className="text-[10px] font-bold tracking-widest text-center text-stone-300 uppercase mb-4">Analysis Radar</h4>
              <div className="h-[280px] flex items-center justify-center">
                <ComparisonRadar />
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-bold tracking-widest text-center text-stone-300 uppercase mb-4">Bloom Forecast</h4>
              <div className="h-[180px] flex items-center justify-center">
                <BloomLine />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10 bg-purple-50/50 p-6 rounded-[40px] border border-purple-100/50 backdrop-blur-sm shadow-sm">
          <h4 className="flex items-center gap-2 text-wa-purple font-bold text-sm mb-4">
            <span>💡</span> 旅程小撇步 (Travel Tips)
          </h4>
          <ul className="text-xs space-y-3 text-stone-600 leading-relaxed font-serif-jp">
            <li className="flex gap-2">
              <span className="text-purple-400">🚗</span>
              <span><strong>OTS 租車：</strong> 建議選 7 人座 (Noah/Voxy)。3大1小+4行李+推車，一般 SUV 放不下。領車必買 <strong>HEP</strong> 全包高速路費。</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-400">🏨</span>
              <span><strong>住宿建議：</strong> 札幌推 Vessel Inn (早餐強)；溫泉區找 <strong>和洋室</strong> 房型，空間最大。</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-400">🎆</span>
              <span><strong>洞爺湖煙火：</strong> 20:45 施放。住 <strong>乃之風</strong> 面湖房可直接在陽台觀賞最佳效果。</span>
            </li>
          </ul>
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
              <div key={item.day} className="wa-card p-8">
                <div className="washi-tape"></div>
                <div className="flex justify-between items-start mb-8 relative">
                  <div className="absolute -left-2 top-0 writing-vertical-rl text-xs font-serif-jp text-stone-300 tracking-widest opacity-60">
                    第{item.day}日
                  </div>

                  <div className="w-16 h-16 rounded-full border border-white/50 backdrop-blur-md flex flex-col items-center justify-center text-wa-purple bg-white/30 shadow-sm -rotate-6 ml-6">
                    <span className="text-[10px] opacity-40 font-bold">DAY</span>
                    <span className="text-2xl font-black">{item.day}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black tracking-widest text-stone-300 uppercase mb-1">SCHEDULE</p>
                    <p className="text-md font-serif-jp text-stone-400 font-bold">{item.date}</p>
                  </div>
                </div>
                <h3 className="text-2xl font-serif-jp font-bold mb-10 border-l-4 border-wa-purple/20 pl-4">{item.title}</h3>
                <div className="flex flex-col gap-6">
                  <div className="flex gap-4 overflow-x-auto pb-4 snap-x pl-2 no-scrollbar">
                    {item.photos.map((photo, pIdx) => (
                      <div key={pIdx} className="snap-center shrink-0 w-40 h-52 bg-white p-2 shadow-sm rotate-1 first:-rotate-2 last:rotate-2 border border-gray-100">
                        <div className="w-full h-40 bg-gray-100 overflow-hidden mb-2">
                          <img src={photo} alt="travel memory" className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div className="text-[8px] text-center font-handwriting text-stone-400">Memory {pIdx + 1}</div>
                      </div>
                    ))}
                  </div>

                  {item.spots.map((spot, sIdx) => {
                    const spotId = `${item.day}-${sIdx}`;
                    const isChecked = checkedItems[spotId];
                    return (
                      <div key={sIdx}
                        className="flex items-start gap-4 cursor-pointer group"
                        onClick={() => toggleCheck(spotId)}
                      >
                        <div className={`relative w-6 h-6 shrink-0 mt-1 border-2 rounded-full flex items-center justify-center transition-colors ${isChecked ? 'border-red-400' : 'border-stone-300'}`}>
                          {isChecked && (
                            <span className="text-red-500 font-serif-jp font-bold text-xs stamp-animation">済</span>
                          )}
                        </div>
                        <span className={`text-lg font-handwriting transition-colors leading-relaxed ${isChecked ? 'text-stone-300 line-through decoration-stone-300' : 'text-stone-600 group-hover:text-wa-purple'}`}>
                          {spot}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
