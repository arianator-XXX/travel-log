import { createClient } from '@supabase/supabase-js';

// Supabaseとの接続設定
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Home() {
  // DBの 'trip' テーブルからデータを全部取ってくる
  const { data: trips, error } = await supabase
    .from('trip')
    .select('*')
    .order('date', { ascending: false }); // 日付が新しい順

  if (error) return <div>エラーが発生しました: {error.message}</div>;

  return (
    <main className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">俺の旅行記 DB連携版</h1>
      
      <div className="max-w-xl mx-auto space-y-4">
        {trips?.map((trip) => (
          <div key={trip.id} className="bg-white p-5 rounded-lg shadow-md border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-bold text-blue-600">{trip.location}</h2>
              <span className="text-sm text-gray-400 font-mono">{trip.date}</span>
            </div>
            <p className="text-gray-700 leading-relaxed">{trip.comment}</p>
          </div>
        ))}
        
        {trips?.length === 0 && (
          <p className="text-center text-gray-500">まだデータがないよ。SupabaseでInsertしてみて！</p>
        )}
      </div>
    </main>
  );
}