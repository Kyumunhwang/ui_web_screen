import { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Eye,
  LayoutGrid,
  Menu,
  Sliders,
} from 'lucide-react';
import { CodeViewer } from './components/code/CodeViewer';
import { Sidebar } from './components/layout/Sidebar';
import { DeviceFrame } from './components/preview/DeviceFrame';
import { OverviewGrid } from './components/preview/OverviewGrid';
import { BackNavigationDemo } from './components/preview/demos/BackNavigationDemo';
import { BreadcrumbDemo } from './components/preview/demos/BreadcrumbDemo';
import { DrawerDemo } from './components/preview/demos/DrawerDemo';
import { FloatingButtonDemo } from './components/preview/demos/FloatingButtonDemo';
import { InfiniteScrollDemo } from './components/preview/demos/InfiniteScrollDemo';
import { PaginationDemo } from './components/preview/demos/PaginationDemo';
import { StickyHeaderDemo } from './components/preview/demos/StickyHeaderDemo';
import { TabBarDemo } from './components/preview/demos/TabBarDemo';
import { TopTabsDemo } from './components/preview/demos/TopTabsDemo';
import { PatternId, SCREEN_PATTERNS } from './data/screenPatterns';

function renderDemo(id: PatternId, resetKey: number) {
  switch (id) {
    case 'tab-bar':
      return <TabBarDemo key={resetKey} />;
    case 'top-tabs':
      return <TopTabsDemo key={resetKey} />;
    case 'drawer':
      return <DrawerDemo key={resetKey} />;
    case 'breadcrumb':
      return <BreadcrumbDemo key={resetKey} />;
    case 'sticky-header':
      return <StickyHeaderDemo key={resetKey} />;
    case 'floating-button':
      return <FloatingButtonDemo key={resetKey} />;
    case 'pagination':
      return <PaginationDemo key={resetKey} />;
    case 'infinite-scroll':
      return <InfiniteScrollDemo key={resetKey} />;
    case 'back-navigation':
      return <BackNavigationDemo key={resetKey} />;
  }
}

export function App() {
  const [viewMode, setViewMode] = useState<'overview' | 'detail'>('detail');
  const [activePatternId, setActivePatternId] = useState<PatternId>('tab-bar');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [mobilePanelTab, setMobilePanelTab] = useState<'preview' | 'code'>('preview');

  const currentIndex = SCREEN_PATTERNS.findIndex((p) => p.id === activePatternId);
  const activePattern = SCREEN_PATTERNS[currentIndex] ?? SCREEN_PATTERNS[0];

  const handleSelectPattern = (id: PatternId) => {
    setActivePatternId(id);
    setViewMode('detail');
    setMobilePanelTab('preview');
  };

  const handleStepPattern = (delta: -1 | 1) => {
    const nextIndex = (currentIndex + delta + SCREEN_PATTERNS.length) % SCREEN_PATTERNS.length;
    handleSelectPattern(SCREEN_PATTERNS[nextIndex].id);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F2F4F6] text-[#191F28]">
      {/* Column 1: Left Fixed Navigation Sidebar */}
      <Sidebar
        patterns={SCREEN_PATTERNS}
        activePatternId={activePatternId}
        viewMode={viewMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectOverview={() => setViewMode('overview')}
        onSelectPattern={handleSelectPattern}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area (Columns 2 & 3) */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Top Utility Bar */}
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-[#E5E8EB] bg-white px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              aria-label="메뉴 열기"
              className="rounded-xl p-2 text-[#4E5968] hover:bg-[#F2F4F6] lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            {viewMode === 'overview' ? (
              <div className="min-w-0">
                <h2 className="truncate text-base font-bold text-[#191F28]">
                  전체 화면 패턴 한눈에 보기
                </h2>
              </div>
            ) : (
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="rounded-lg bg-[#E8F3FF] px-2 py-0.5 text-xs font-extrabold text-[#3182F6]">
                  {activePattern.number}
                </span>
                <h2 className="truncate text-base font-bold text-[#191F28]">
                  {activePattern.title}
                </h2>
                <span className="hidden text-xs font-medium text-[#8B95A1] sm:inline">
                  {activePattern.subtitle}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {viewMode === 'detail' && (
              <>
                <div className="hidden items-center gap-1 sm:flex">
                  <button
                    type="button"
                    onClick={() => handleStepPattern(-1)}
                    aria-label="이전 패턴"
                    className="rounded-xl border border-[#E5E8EB] bg-white p-1.5 text-[#4E5968] hover:bg-[#F2F4F6]"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStepPattern(1)}
                    aria-label="다음 패턴"
                    className="rounded-xl border border-[#E5E8EB] bg-white p-1.5 text-[#4E5968] hover:bg-[#F2F4F6]"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Mobile/Tablet Preview vs Code Toggle */}
                <div className="flex items-center rounded-xl bg-[#F2F4F6] p-0.5 xl:hidden">
                  <button
                    type="button"
                    onClick={() => setMobilePanelTab('preview')}
                    className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold ${
                      mobilePanelTab === 'preview'
                        ? 'bg-white text-[#191F28] shadow-sm'
                        : 'text-[#8B95A1]'
                    }`}
                  >
                    <Eye className="h-3.5 w-3.5" />
                    프리뷰
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobilePanelTab('code')}
                    className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold ${
                      mobilePanelTab === 'code'
                        ? 'bg-white text-[#191F28] shadow-sm'
                        : 'text-[#8B95A1]'
                    }`}
                  >
                    <Code2 className="h-3.5 w-3.5" />
                    코드
                  </button>
                </div>
              </>
            )}

            <button
              type="button"
              onClick={() => setViewMode(viewMode === 'overview' ? 'detail' : 'overview')}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
                viewMode === 'overview'
                  ? 'bg-[#3182F6] text-white'
                  : 'bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB] hover:text-[#191F28]'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">
                {viewMode === 'overview' ? '상세 워크벤치' : '전체 한눈에 보기'}
              </span>
            </button>
          </div>
        </header>

        {/* Body */}
        {viewMode === 'overview' ? (
          <main className="custom-scrollbar flex-1 overflow-y-auto">
            <OverviewGrid patterns={SCREEN_PATTERNS} onSelectPattern={handleSelectPattern} />
          </main>
        ) : (
          <div className="flex min-h-0 flex-1 overflow-hidden">
            {/* Column 2: Live Preview + UX Guide */}
            <main
              className={`custom-scrollbar flex-1 overflow-y-auto px-4 py-6 sm:px-8 ${
                mobilePanelTab === 'code' ? 'hidden xl:block' : 'block'
              }`}
            >
              <div className="mx-auto max-w-[600px] space-y-6">
                {/* Pattern Header Summary */}
                <div className="rounded-3xl bg-white p-5 shadow-card">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#E8F3FF] px-2.5 py-0.5 text-[11px] font-bold text-[#3182F6]">
                      {activePattern.category}
                    </span>
                    <span className="text-xs font-medium text-[#8B95A1]">
                      Pattern {activePattern.number} · {activePattern.subtitle}
                    </span>
                  </div>
                  <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#191F28]">
                    {activePattern.title}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#4E5968]">
                    {activePattern.summary}
                  </p>
                </div>

                {/* Live Interactive Device Frame */}
                <DeviceFrame pattern={activePattern}>
                  {(resetKey) => renderDemo(activePattern.id, resetKey)}
                </DeviceFrame>

                {/* UX Design Guide Card */}
                <section className="rounded-3xl bg-white p-6 shadow-card space-y-5">
                  <div className="flex items-center gap-2 border-b border-[#F2F4F6] pb-3">
                    <BookOpen className="h-4 w-4 text-[#3182F6]" />
                    <h3 className="text-base font-bold text-[#191F28]">실무 UX 설계 가이드</h3>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wide text-[#3182F6]">
                        언제 사용하면 좋을까요?
                      </h4>
                      <ul className="mt-2.5 space-y-2">
                        {activePattern.uxGuide.whenToUse.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs leading-relaxed text-[#4E5968]">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#3182F6]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wide text-[#191F28]">
                        설계 원칙 & 주의사항
                      </h4>
                      <ul className="mt-2.5 space-y-2">
                        {activePattern.uxGuide.bestPractices.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs leading-relaxed text-[#4E5968]">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8B95A1]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#F2F4F6] p-4">
                    <div className="mb-2.5 flex items-center gap-1.5 text-xs font-bold text-[#191F28]">
                      <Sliders className="h-3.5 w-3.5 text-[#3182F6]" />
                      권장 UI 스펙
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                      {activePattern.uxGuide.specs.map((spec) => (
                        <div key={spec.label} className="rounded-xl bg-white px-3 py-2.5">
                          <div className="text-[11px] font-medium text-[#8B95A1]">{spec.label}</div>
                          <div className="mt-0.5 text-xs font-bold text-[#191F28]">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </main>

            {/* Column 3: Code Viewer Panel */}
            <aside
              className={`h-full w-full xl:w-[460px] 2xl:w-[520px] shrink-0 ${
                mobilePanelTab === 'code' ? 'block' : 'hidden xl:block'
              }`}
            >
              <CodeViewer pattern={activePattern} />
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
