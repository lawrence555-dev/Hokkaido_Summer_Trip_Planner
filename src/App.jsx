import React, { useState, useEffect } from 'react';
import { ComparisonRadar, BloomLine } from './components/JournalCharts';

const itineraryData = [
  {
    day: 1,
    date: "07/07 Tue.",
    title: "抵達．北國之門",
    spots: ["新千歲機場入境與取車手續", "旭川市區：大雪地啤酒館午餐", "成吉思汗大黑屋烤肉晚餐"],
    photos: ["https://images.unsplash.com/photo-1674725690428-948af1d7f5a1?auto=format&fit=crop&q=80&w=300", "https://images.unsplash.com/photo-1614563637806-1d0e645e0940?auto=format&fit=crop&q=80&w=300"]
  },
  {
    day: 2,
    date: "07/08 Wed.",
    title: "動物園與拼布花海",
    spots: ["旭山動物園：企鵝與海豹館", "美瑛：北西之丘展望公園", "拼布之路：七星之樹"],
    photos: ["https://images.unsplash.com/photo-1631848351521-c99aed909530?auto=format&fit=crop&q=80&w=300", "https://images.unsplash.com/photo-1722482445722-19c5c4989ec6?auto=format&fit=crop&q=80&w=300"]
  },
  {
    day: 3,
    date: "07/09 Thu.",
    title: "青池幻境與四季彩",
    spots: ["白金青池：晨間靜謐攝影", "四季彩之丘：花海巡禮", "純平炸蝦飯"],
    photos: ["https://images.unsplash.com/photo-1687784529277-3d3709faec5e?auto=format&fit=crop&q=80&w=300", "https://images.unsplash.com/photo-1757140093290-3ff3d53d9b85?auto=format&fit=crop&q=80&w=300"]
  },
  {
    day: 4,
    date: "07/10 Fri.",
    title: "薰衣草花道制霸",
    spots: ["富田農場：五彩花田", "精靈露台：夜晚點燈漫步", "入住富良野溫泉飯店"],
    photos: ["https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=300", "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&q=80&w=300"]
  },
  {
    day: 5,
    date: "07/11 Sat.",
    title: "森林公路與札幌",
    spots: ["札幌市區：大通公園電視塔", "狸小路商店街：藥妝補貨", "藻岩山纜車：欣賞百萬夜景"],
    photos: ["https://images.unsplash.com/photo-1645611539916-e9b328d3832c?auto=format&fit=crop&q=80&w=300", "https://images.unsplash.com/photo-1557409518-691ebcd96038?auto=format&fit=crop&q=80&w=300"]
  },
  {
    day: 6,
    date: "07/12 Sun.",
    title: "浪漫小樽時光",
    spots: ["小樽運河：歷史建築漫步", "堺町通：LeTAO 總店甜點巡禮", "壽司名店午餐"],
    photos: ["https://images.unsplash.com/photo-1542931287-023b922fa89b?auto=format&fit=crop&q=80&w=300", "https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&q=80&w=300"]
  },
  {
    day: 7,
    date: "07/13 Mon.",
    title: "歸途．新千歲",
    spots: ["二條市場：海鮮丼早餐", "機場還車與登機", "告別北海道"],
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
            「2026年、夏。紫色的花畑で会いましょう。今は絕好の旅どきです！」
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
