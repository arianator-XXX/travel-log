export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-4">
          俺の旅行記 2026
        </h1>
        <p className="text-slate-600 mb-8">
          Vercelへのデプロイに成功！ここから旅の記録を刻んでいく。
        </p>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800">最初の旅：Web開発の海</h2>
            <p className="text-slate-500 text-sm mb-2">2026年4月25日</p>
            <p className="text-slate-700">
              GitHubとVercelを連携させて、世界にサイトを公開した。
              次は動的な処理を実装して、もっと面白いサイトにしたい。
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}