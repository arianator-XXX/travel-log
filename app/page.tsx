import { createClient } from '@supabase/supabase-js';

// Supabaseとの接続設定
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Home() {
  // あなたのデータベース名に合わせて 'trip' に戻しました
  const { data: trips, error } = await supabase
    .from('trip') 
    .select('*')
    .order('date', { ascending: false });

  if (error) return <div>エラーが発生しました: {error.message}</div>;

  return (
    <main className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">俺の旅行記 DB連携版</h1>
      
      <div className="max-w-xl mx-auto space-y-6">
        {trips?.map((trip) => (
          <div key={trip.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            
            {/* 写真を表示する設定。tripテーブルに image_url という列が必要です */}
            {trip.image_url && (
              <img 
                src={trip.image_url} 
                alt={trip.location} 
                className="w-full h-64 object-cover" 
              />
            )}

            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-blue-600">{trip.location}</h2>
                <span className="text-sm text-gray-400 font-mono">{trip.date}</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{trip.comment}</p>
            </div>
          </div>
        ))}
        
        {trips?.length === 0 && (
          <p className="text-center text-gray-500">まだデータがないよ。SupabaseでInsertしてみて！</p>
        )}
      </div>
    </main>
  );
}