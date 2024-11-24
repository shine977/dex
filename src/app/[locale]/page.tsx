import TradingList from "@/components/TradingList";
import TopNav from "@/components/TopNav";
import SideNav from "@/components/SideNav";

export default function Home() {
  return (
    <div className="flex h-screen bg-background">
      {/* 侧边导航 */}
      <SideNav />

      <div className="flex-1 flex flex-col min-h-0">
        {/* 顶部导航 */}
        <TopNav />

        {/* 主要内容区域 */}
        <main className="flex-1 overflow-auto p-4 bg-background">
          <div className="container mx-auto">
            <TradingList />
          </div>
        </main>
      </div>
    </div>
  );
}
