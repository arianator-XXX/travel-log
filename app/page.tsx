import { createClient } from '@supabase/supabase-js';
// 修正前：import Spline from '@splinetool/react-spline/next';
// 修正後：
import Spline from '@splinetool/react-spline';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Home() {
  const { data: trips, error } = await supabase
    .from('trip') 
    .select('*')
    .order('date', { ascending: false });

  if (error) return <div className="text-white p-10">エラーが発生しました: {error.message}</div>;

  return (
    <main className="relative min-h-screen text-slate-100 overflow-x-hidden">
      
      {/* --- 3D 背景エリア --- */}
      <div className="fixed inset-0 -z-10 bg-black">
        <Spline
          scene="https://prod.spline.design/z3ywadi0kjFAVa5oRhlnJs8e/scene.splinecode" 
        />
        {/* 背景が明るすぎて文字が見えにくい場合のオーバーレイ */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </div>

      {/* --- コンテンツエリア --- */}
      <div className="relative z-10 p-6 md:p-12">
        <h1 className="text-4xl md:text-6xl font-black mb-16 text-center tracking-tighter">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
            TRAVEL ARCHIVE
          </span>
        </h1>
        
        <div className="max-w-2xl mx-auto space-y-12">
          {trips?.map((trip) => (
            <div key={trip.id} className="group bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden hover:border-white/30 transition-all duration-500">
              
              {trip.image_url && (
                <div className="w-full bg-black/20 flex items-center justify-center overflow-hidden">
                  <img 
                    src={trip.image_url} 
                    alt={trip.location} 
                    className="w-full h-auto max-h-[500px] object-contain group-hover:scale-105 transition-transform duration-1000" 
                  />
                </div>
              )}

              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-3xl font-bold text-white italic tracking-tight">
                    {trip.location}
                  </h2>
                  <span className="text-xs text-slate-400 font-mono border border-slate-700 px-3 py-1 rounded-full">
                    {trip.date}
                  </span>
                </div>
                <p className="text-slate-300 text-lg leading-relaxed font-light">
                  {trip.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}