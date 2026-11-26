import { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';

const ALL_ITEMS = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `서비스 공지 및 릴리즈 노트 v1.${i + 1}`,
  date: `2026.11.${String((i % 28) + 1).padStart(2, '0')}`,
}));

const ITEMS_PER_PAGE = 4;
const TOTAL_PAGES = Math.ceil(ALL_ITEMS.length / ITEMS_PER_PAGE);

export function PaginationDemo() {
  const [page, setPage] = useState(4);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const pageItems = ALL_ITEMS.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="flex h-full flex-col justify-between bg-[#F2F4F6]">
      <div>
        <header className="flex items-center justify-between bg-white px-5 py-3.5 border-b border-[#E5E8EB]">
          <h3 className="text-[16px] font-bold text-[#191F28]">공지사항</h3>
          <span className="text-xs font-semibold text-[#8B95A1]">
            {page} / {TOTAL_PAGES} 페이지
          </span>
        </header>

        <div className="p-4 space-y-2.5">
          {pageItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-[0_1px_4px_rgba(25,31,40,0.03)]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#3182F6]">
                <FileText className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-[#191F28]">{item.title}</p>
                <p className="mt-0.5 text-[11px] text-[#8B95A1]">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Bar */}
      <nav
        aria-label="페이지 선택"
        className="flex items-center justify-center gap-1.5 border-t border-[#E5E8EB] bg-white px-4 py-3.5"
      >
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          aria-label="이전 페이지"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#4E5968] transition-colors hover:bg-[#F2F4F6] disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {Array.from({ length: TOTAL_PAGES }, (_, idx) => idx + 1).map((num) => {
          const isCurrent = page === num;
          return (
            <button
              key={num}
              type="button"
              onClick={() => setPage(num)}
              aria-current={isCurrent ? 'page' : undefined}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                isCurrent
                  ? 'bg-[#3182F6] text-white shadow-sm'
                  : 'text-[#4E5968] hover:bg-[#F2F4F6]'
              }`}
            >
              {num}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
          disabled={page === TOTAL_PAGES}
          aria-label="다음 페이지"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#4E5968] transition-colors hover:bg-[#F2F4F6] disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </nav>
    </div>
  );
}
