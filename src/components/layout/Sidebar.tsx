import { LayoutGrid, Layers, Search, X } from 'lucide-react';
import { PatternId, ScreenPattern } from '../../data/screenPatterns';

interface SidebarProps {
  patterns: ScreenPattern[];
  activePatternId: PatternId;
  viewMode: 'overview' | 'detail';
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectOverview: () => void;
  onSelectPattern: (id: PatternId) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({
  patterns,
  activePatternId,
  viewMode,
  searchQuery,
  onSearchChange,
  onSelectOverview,
  onSelectPattern,
  isMobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const filteredPatterns = patterns.filter((p) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.number.includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  const sidebarContent = (
    <div className="flex h-full flex-col bg-white border-r border-[#E5E8EB]">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3182F6] text-white shadow-sm">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-[15px] font-bold tracking-tight text-[#191F28]">
              화면 패턴 라이브러리
            </h1>
            <p className="text-[11px] font-medium text-[#8B95A1]">
              UI/UX Navigation 09
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onCloseMobile}
          aria-label="사이드바 닫기"
          className="rounded-lg p-1.5 text-[#8B95A1] hover:bg-[#F2F4F6] lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Overview Mode Button */}
      <div className="px-4 pb-3">
        <button
          type="button"
          onClick={() => {
            onSelectOverview();
            onCloseMobile();
          }}
          className={`flex w-full items-center justify-between rounded-2xl px-3.5 py-2.5 text-sm font-semibold transition-all ${
            viewMode === 'overview'
              ? 'bg-[#3182F6] text-white shadow-sm'
              : 'bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]/70 hover:text-[#191F28]'
          }`}
        >
          <span className="flex items-center gap-2.5">
            <LayoutGrid className="h-4 w-4" />
            전체 한눈에 보기
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
              viewMode === 'overview'
                ? 'bg-white/20 text-white'
                : 'bg-white text-[#3182F6]'
            }`}
          >
            9
          </span>
        </button>
      </div>

      {/* Search */}
      <div className="px-4 pb-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8B95A1]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="패턴 이름·번호 검색..."
            className="w-full rounded-xl border border-[#E5E8EB] bg-[#F9FAFB] py-2 pl-8 pr-7 text-xs text-[#191F28] placeholder:text-[#8B95A1] focus:border-[#3182F6] focus:bg-white focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="검색어 지우기"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8B95A1] hover:text-[#4E5968]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Pattern List */}
      <nav aria-label="화면 패턴 목록" className="custom-scrollbar flex-1 overflow-y-auto px-3 pb-5">
        <p className="px-2.5 pb-2 text-[11px] font-semibold uppercase tracking-wider text-[#8B95A1]">
          패턴 인덱스 (01~09)
        </p>
        <ul className="space-y-1">
          {filteredPatterns.map((pattern) => {
            const isSelected = viewMode === 'detail' && activePatternId === pattern.id;
            return (
              <li key={pattern.id}>
                <button
                  type="button"
                  onClick={() => {
                    onSelectPattern(pattern.id);
                    onCloseMobile();
                  }}
                  className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${
                    isSelected
                      ? 'bg-[#E8F3FF] text-[#191F28]'
                      : 'text-[#4E5968] hover:bg-[#F2F4F6]/80 hover:text-[#191F28]'
                  }`}
                >
                  <span
                    className={`flex h-6 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold transition-colors ${
                      isSelected
                        ? 'bg-[#3182F6] text-white'
                        : 'bg-[#F2F4F6] text-[#3182F6] group-hover:bg-white'
                    }`}
                  >
                    {pattern.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div
                      className={`truncate text-[13.5px] ${
                        isSelected ? 'font-bold text-[#191F28]' : 'font-semibold'
                      }`}
                    >
                      {pattern.title}
                    </div>
                    <div className="truncate text-[11px] text-[#8B95A1]">
                      {pattern.subtitle}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
          {filteredPatterns.length === 0 && (
            <li className="px-3 py-8 text-center text-xs text-[#8B95A1]">
              일치하는 패턴이 없습니다.
            </li>
          )}
        </ul>
      </nav>

      {/* Footer Info */}
      <div className="border-t border-[#F2F4F6] px-5 py-3.5">
        <div className="flex items-center justify-between text-[11px] text-[#8B95A1]">
          <span>Toss Design System 기반</span>
          <span className="font-semibold text-[#3182F6]">React · HTML</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block lg:w-[256px] lg:shrink-0 h-full">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={onCloseMobile}
            className="absolute inset-0 bg-[#191F28]/45 backdrop-blur-[1px]"
          />
          <aside className="relative h-full w-[272px] max-w-[82vw] shadow-2xl">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
