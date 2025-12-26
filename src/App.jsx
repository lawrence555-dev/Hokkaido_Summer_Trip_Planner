import React, { useState, useEffect } from 'react';
import { ComparisonRadar, BloomLine } from './components/JournalCharts';

const itineraryData = [
  { day: 1, date: "07/07 Tue.", title: "抵達．北國之門", spots: ["新千歲機場入境與取車手續", "機場國內線商店街採買零食", "道央自動車道：岩見澤休息站", "旭川市區：大雪地啤酒館午餐", "AEON Mall 旭川站前店採買", "入住旭川精品商旅", "成吉思汗大黑屋烤肉晚餐"] },
  { day: 2, date: "07/08 Wed.", title: "動物園與拼布花海", spots: ["旭山動物園：企鵝與海豹館", "旭川拉麵村：午餐時光", "美瑛：北西之丘展望公園", "拼布之路：七星之樹與親子之樹", "亞斗夢之丘：自駕賞花點", "Ken & Mary 之樹攝影", "入住美瑛森林系民宿"] },
  { day: 3, date: "07/09 Thu.", title: "青池幻境與四季彩", spots: ["十勝岳望岳台展望站", "白金瀑布：感受藍色溪流", "白金青池：晨間靜謐攝影", "四季彩之丘：搭乘遊覽牽引車", "拓真館：美瑛風景攝影展", "美瑛選果：在地農產品採買", "純平炸蝦飯 (需提早排隊)"] },
  { day: 4, date: "07/10 Fri.", title: "薰衣草花道制霸", spots: ["富田農場：五彩花田與哈密瓜", "薰衣草東站：搭乘賞花吊椅", "中富良野：北星山町營花園", "森之時計咖啡館：磨咖啡豆體驗", "富良野起司工房：手工冰淇淋", "精靈露台：夜晚點燈漫步", "入住富良野溫泉飯店"] },
  { day: 5, date: "07/11 Sat.", title: "森林公路與札幌", spots: ["富良野果醬園：採買自製果醬", "麵包超人專門店 (伴手禮)", "桂澤湖景觀自駕公路", "札幌市區：大通公園電視塔", "狸小路商店街：藥妝最後補貨", "藻岩山纜車：欣賞百萬夜景", "札幌必吃：湯咖哩名店之旅"] },
  { day: 6, date: "07/12 Sun.", title: "浪漫小樽時光", spots: ["小樽運河：歷史建築漫步", "北一硝子三號館：煤氣燈咖啡", "堺町通：LeTAO 總店甜點巡禮", "小樽音樂盒堂：欣賞報時鳴奏", "天狗山纜車：眺望海港落日", "政壽司：品嚐新鮮海港味", "運河沿岸居酒屋小酌"] },
  { day: 7, date: "07/13 Mon.", title: "最終採買與歸途", spots: ["二條市場：海鮮丼早餐", "北海道大學：銀杏林散策", "三井 Outlet Park 札幌北廣島", "機場還車中心：歸還租賃車", "新千歲機場國內線：Royce 巧克力", "機場美食區：最後一碗拉麵", "平安登機，告別北海道"] }
];

function App() {
  const [currentPlan, setCurrentPlan] = useState('A');
  const [carPos, setCarPos] = useState(0);
  const [carRotation, setCarRotation] = useState(0);
  const [weather, setWeather] = useState({ temp: '--', condition: 'Loading' });
  const [exchangeRate, setExchangeRate] = useState('--');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef(null);

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

    const handleScroll = () => {
      const iten = document.getElementById('itinerary');
      if (!iten) return;
      const rect = iten.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      setCarPos(progress * (rect.height - 100));
      setCarRotation(Math.sin(window.scrollY * 0.1) * 5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="selection:bg-purple-100 min-h-screen flex flex-col items-center pb-32">
      {/* Background Music */}
      <audio ref={audioRef} loop>
        <source src="https://cdn.pixabay.com/audio/2022/05/13/audio_257112e87f.mp3" type="audio/mpeg" />
      </audio>

      {/* Music Control Button */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-purple-200 flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Toggle music"
      >
        {isPlaying ? (
          <span className="text-2xl">🎵</span>
        ) : (
          <span className="text-2xl opacity-50">🎵</span>
        )}
      </button>
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
        {/* Map Watermark Background */}
        <div
          className="absolute inset-0 z-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage: `url('/hokkaido_map_watermark.png')`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'grayscale(100%)'
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
          <div className="flex flex-col gap-2 bg-stone-200/40 p-2 rounded-[28px] mb-8">
            <button className={`py-4 rounded-2xl font-bold transition-all ${currentPlan === 'A' ? 'bg-white text-wa-purple shadow-md' : 'text-stone-400'}`} onClick={() => setCurrentPlan('A')}>PLAN A 精華</button>
            <button className={`py-4 rounded-2xl font-bold transition-all ${currentPlan === 'B' ? 'bg-white text-wa-purple shadow-md' : 'text-stone-400'}`} onClick={() => setCurrentPlan('B')}>PLAN B 慢賞</button>
          </div>
          <div className="space-y-12">
            <div>
              <h4 className="text-[10px] font-bold tracking-widest text-center text-stone-300 uppercase mb-4">Analysis Radar</h4>
              <div className="h-[280px] flex items-center justify-center">
                <ComparisonRadar plan={currentPlan} />
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

        <section id="itinerary" className="relative pt-10">
          <div className="timeline-path"></div>
          <div id="scrolling-car" style={{ top: `${carPos}px`, transform: `rotate(${carRotation}deg)` }}>🚗</div>

          <div className="flex flex-col gap-[40vh]">
            {itineraryData.map((item, idx) => (
              <div key={idx} className="wa-card p-8">
                <div className="washi-tape"></div>
                <div className="flex justify-between items-start mb-8">
                  <div className="w-16 h-16 rounded-full border border-wa-purple/20 flex flex-col items-center justify-center text-wa-purple bg-white shadow-sm -rotate-6">
                    <span className="text-[10px] opacity-40 font-bold">DAY</span>
                    <span className="text-2xl font-black">{idx + 1}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black tracking-widest text-stone-300 uppercase">SCHEDULE</p>
                    <p className="text-md font-serif-jp text-stone-400 font-bold">{item.date}</p>
                  </div>
                </div>
                <h3 className="text-2xl font-serif-jp font-bold mb-10 border-l-4 border-wa-purple/20 pl-4">{item.title}</h3>
                <div className="flex flex-col gap-6">
                  {item.spots.map((spot, sIdx) => (
                    <label key={sIdx} className="flex items-start gap-4 cursor-pointer group">
                      <input type="checkbox" className="wa-checkbox mt-1 shrink-0" />
                      <span className="text-lg font-handwriting text-stone-600 group-hover:text-wa-purple transition-colors leading-relaxed">
                        {spot}
                      </span>
                    </label>
                  ))}
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
