import { createClient } from '@supabase/supabase-js';

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
    // 背景を深いネイビーのグラデーションに
    <main className="p-6 md:p-12 bg-slate-950 min-h-screen text-slate-100 font-sans">
      
      {/* タイトルに光彩エフェクト */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-center tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          MY TRAVEL LOG
        </span>
      </h1>
      
      <div className="max-w-2xl mx-auto space-y-10">
        {trips?.map((trip) => (
          <div key={trip.id} className="group relative bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-800 overflow-hidden hover:border-blue-500/50 transition-all duration-500 shadow-2xl">
            
            {/* 写真エリア：アスペクト比を維持しつつ綺麗に見せる */}
            {trip.image_url && (
              <div className="w-full bg-slate-800 flex items-center justify-center overflow-hidden">
                <img 
                  src={trip.image_url} 
                  alt={trip.location} 
                  className="w-full h-auto max-h-[500px] object-contain group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
            )}

            <div className="p-8">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-1">Destination</p>
                  <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {trip.location}
                  </h2>
                </div>
                <span className="text-sm text-slate-500 font-mono bg-slate-800 px-3 py-1 rounded-full">
                  {trip.date}
                </span>
              </div>
              
              <div className="h-px w-full bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 mb-4" />
              
              <p className="text-slate-300 text-lg leading-relaxed italic">
                "{trip.comment}"
              </p>
            </div>
          </div>
        ))}
        
        {trips?.length === 0 && (
          <div className="text-center p-20 border-2 border-dashed border-slate-800 rounded-3xl">
            <p className="text-slate-500">まだ旅の記録がありません。冒険に出かけましょう！</p>
          </div>
        )}
      </div>
    </main>
  );
}