"use client";

export default function TradingList() {
  const mockData = [
    {
      id: 1,
      name: "$RIF/SOL",
      price: "$0.0506",
      marketCap: "$4,828.6万",
      volume: "$124.6万",
      holders: "99,603",
      trades: "16,398",
      change24h: "+3.3%",
    },
    // 添加更多模拟数据...
  ];

  return (
    <div className="w-full">
      <table className="w-full">
        <thead className="bg-card-background">
          <tr className="text-left text-sm text-gray-400">
            <th className="p-4">#</th>
            <th className="p-4">配对</th>
            <th className="p-4">价格</th>
            <th className="p-4">市值</th>
            <th className="p-4">池子</th>
            <th className="p-4">24h交易量</th>
            <th className="p-4">24h交易数</th>
            <th className="p-4">24h涨跌</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((item) => (
            <tr
              key={item.id}
              className="border-b border-gray-800 hover:bg-gray-800/50"
            >
              <td className="p-4">{item.id}</td>
              <td className="p-4">{item.name}</td>
              <td className="p-4">{item.price}</td>
              <td className="p-4">{item.marketCap}</td>
              <td className="p-4">{item.volume}</td>
              <td className="p-4">{item.holders}</td>
              <td className="p-4">{item.trades}</td>
              <td
                className={`p-4 ${
                  item.change24h.startsWith("+")
                    ? "text-positive"
                    : "text-negative"
                }`}
              >
                {item.change24h}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
