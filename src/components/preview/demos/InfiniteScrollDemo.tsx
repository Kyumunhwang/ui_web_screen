import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react';

const MAX_ITEMS = 28;

export function InfiniteScrollDemo() {
  const [items, setItems] = useState<number[]>(() => Array.from({ length: 8 }, (_, i) => i + 1));
  const [isLoading, setIsLoading] = useState(false);
  const scrollRootRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadMore = () => {
    if (isLoading || items.length >= MAX_ITEMS) return;
    setIsLoading(true);
    setTimeout(() => {
      setItems((prev) => {
        const remaining = MAX_ITEMS - prev.length;
        const batchSize = Math.min(5, remaining);
        return [...prev, ...Array.from({ length: batchSize }, (_, i) => prev.length + i + 1)];
      });
      setIsLoading(false);
    }, 550);
  };

  useEffect(() => {
    const rootEl = scrollRootRef.current;
    const targetEl = sentinelRef.current;
    if (!rootEl || !targetEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { root: rootEl, rootMargin: '40px', threshold: 0.1 },
    );

    observer.observe(targetEl);
    return () => observer.disconnect();
  });

  const hasMore = items.length < MAX_ITEMS;

  return (
    <div className="flex h-full flex-col bg-[#F2F4F6]">
      <header className="flex items-center justify-between bg-white px-5 py-3.5 border-b border-[#E5E8EB]">
        <h3 className="text-[16px] font-bold text-[#191F28]">탐색 피드</h3>
        <span className="rounded-full bg-[#E8F3FF] px-2.5 py-0.5 text-[11px] font-bold text-[#3182F6]">
          {items.length} / {MAX_ITEMS}
        </span>
      </header>

      <div ref={scrollRootRef} className="custom-scrollbar flex-1 overflow-y-auto p-4 space-y-2">
        {items.map((id) => (
          <div
            key={id}
            className="flex items-center gap-3 rounded-2xl bg-white px-3.5 py-3 shadow-[0_1px_3px_rgba(25,31,40,0.03)]"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#3182F6]">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#191F28]">실시간 추천 콘텐츠 #{id}</p>
              <p className="text-[11px] text-[#8B95A1]">스크롤 하단 도달 시 자동 로드됩니다</p>
            </div>
          </div>
        ))}

        {/* Sentinel */}
        <div ref={sentinelRef} className="flex flex-col items-center justify-center py-4 text-xs">
          {isLoading ? (
            <div className="flex items-center gap-2 font-semibold text-[#3182F6]">
              <Loader2 className="h-4 w-4 animate-spin" />
              다음 항목 불러오는 중...
            </div>
          ) : hasMore ? (
            <button
              type="button"
              onClick={loadMore}
              className="rounded-xl bg-white px-3.5 py-1.5 text-[11px] font-semibold text-[#4E5968] shadow-sm hover:text-[#3182F6]"
            >
              아래로 스크롤하거나 클릭해 더 보기
            </button>
          ) : (
            <div className="flex items-center gap-1.5 font-semibold text-[#8B95A1]">
              <CheckCircle2 className="h-4 w-4 text-[#3182F6]" />
              모든 피드를 확인했어요
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
