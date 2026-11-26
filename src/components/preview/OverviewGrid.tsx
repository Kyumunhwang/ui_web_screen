import { ArrowUpRight } from 'lucide-react';
import { PatternId, ScreenPattern } from '../../data/screenPatterns';

interface OverviewGridProps {
  patterns: ScreenPattern[];
  onSelectPattern: (id: PatternId) => void;
}

function SkeletonRow({ widthClass = 'w-28' }: { widthClass?: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-[#F7F8FA] px-2.5 py-2 border border-[#F0F2F5]">
      <span className="h-3.5 w-3.5 shrink-0 rounded-[4px] bg-[#BDDAFF]" />
      <div className="flex-1 space-y-1">
        <div className={`h-1.5 rounded-full bg-[#D7DCE2] ${widthClass}`} />
        <div className="h-1 w-14 rounded-full bg-[#E9ECEF]" />
      </div>
    </div>
  );
}

function PatternThumbnail({ id }: { id: PatternId }) {
  switch (id) {
    case 'tab-bar':
      return (
        <div className="flex h-full flex-col justify-between bg-white">
          <div className="px-3 pt-2.5">
            <div className="mb-2 text-[10px] font-bold text-[#191F28]">쇼핑</div>
            <div className="space-y-1.5">
              <SkeletonRow widthClass="w-24" />
              <SkeletonRow widthClass="w-20" />
            </div>
          </div>
          <div className="grid grid-cols-4 border-t border-[#F0F2F5] bg-white px-2 py-1.5">
            {[
              { label: '홈', active: false },
              { label: '검색', active: false },
              { label: '쇼핑', active: true },
              { label: 'MY', active: false },
            ].map((tab) => (
              <div key={tab.label} className="flex flex-col items-center gap-0.5">
                <span
                  className={`h-2.5 w-2.5 rounded-[3px] ${
                    tab.active ? 'bg-[#3182F6]' : 'bg-[#D0D5DC]'
                  }`}
                />
                <span
                  className={`text-[7.5px] font-semibold ${
                    tab.active ? 'text-[#3182F6]' : 'text-[#9CA3AF]'
                  }`}
                >
                  {tab.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'top-tabs':
      return (
        <div className="flex h-full flex-col bg-white">
          <div className="grid grid-cols-3 border-b border-[#ECEFF3] px-2 pt-2">
            <div className="pb-1.5 text-center text-[8.5px] font-medium text-[#9CA3AF]">추천</div>
            <div className="pb-1.5 text-center text-[8.5px] font-medium text-[#9CA3AF]">팔로잉</div>
            <div className="border-b-2 border-[#3182F6] pb-1.5 text-center text-[8.5px] font-bold text-[#191F28]">
              저장
            </div>
          </div>
          <div className="flex-1 space-y-1.5 p-2.5">
            <SkeletonRow widthClass="w-24" />
            <SkeletonRow widthClass="w-16" />
            <SkeletonRow widthClass="w-28" />
          </div>
        </div>
      );

    case 'drawer':
      return (
        <div className="relative flex h-full bg-[#8A8F99]">
          <div className="flex h-full w-[58%] flex-col bg-white p-3 shadow-md">
            <div className="mb-2 text-[10px] font-bold text-[#191F28]">메뉴</div>
            <ul className="space-y-1.5 text-[8.5px]">
              <li className="text-[#4E5968]">내 프로필</li>
              <li className="font-bold text-[#3182F6]">저장한 글</li>
              <li className="text-[#4E5968]">주문 내역</li>
              <li className="text-[#4E5968]">설정</li>
            </ul>
          </div>
          <div className="flex-1 bg-[#7A808A]/80" />
        </div>
      );

    case 'breadcrumb':
      return (
        <div className="flex h-full flex-col bg-white p-3">
          <div className="flex items-center gap-1 text-[7.5px] text-[#9CA3AF]">
            <span>홈</span>
            <span>›</span>
            <span>가전</span>
            <span>›</span>
            <span className="font-semibold text-[#191F28]">무선 이어폰</span>
          </div>
          <div className="mt-2.5 text-[11px] font-bold text-[#191F28]">무선 이어폰</div>
          <div className="mt-3 space-y-2">
            <div className="h-1.5 w-28 rounded-full bg-[#D7DCE2]" />
            <div className="h-1.5 w-20 rounded-full bg-[#E5E8EB]" />
          </div>
        </div>
      );

    case 'sticky-header':
      return (
        <div className="flex h-full flex-col bg-white">
          <div className="border-b border-[#ECEFF3] px-3 py-2 shadow-[0_2px_6px_rgba(25,31,40,0.05)]">
            <span className="text-[10px] font-bold text-[#191F28]">
              장바구니 <span className="text-[#3182F6]">12</span>
            </span>
          </div>
          <div className="space-y-1.5 p-2.5">
            <SkeletonRow widthClass="w-24" />
            <SkeletonRow widthClass="w-28" />
            <SkeletonRow widthClass="w-20" />
          </div>
        </div>
      );

    case 'floating-button':
      return (
        <div className="relative flex h-full flex-col bg-white p-2.5">
          <div className="space-y-1.5">
            <SkeletonRow widthClass="w-24" />
            <SkeletonRow widthClass="w-28" />
            <SkeletonRow widthClass="w-20" />
          </div>
          <div className="absolute bottom-2.5 right-2.5 rounded-full bg-[#3182F6] px-3 py-1.5 text-[8.5px] font-bold text-white shadow-[0_4px_10px_rgba(49,130,246,0.35)]">
            + 새 글 쓰기
          </div>
        </div>
      );

    case 'pagination':
      return (
        <div className="flex h-full flex-col justify-between bg-white p-2.5">
          <div className="space-y-1.5">
            <SkeletonRow widthClass="w-28" />
            <SkeletonRow widthClass="w-20" />
            <SkeletonRow widthClass="w-24" />
          </div>
          <div className="flex items-center justify-center gap-1.5 pb-0.5 text-[8.5px] font-semibold text-[#4E5968]">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span className="flex h-4 w-4 items-center justify-center rounded bg-[#3182F6] text-white">
              4
            </span>
            <span>5</span>
          </div>
        </div>
      );

    case 'infinite-scroll':
      return (
        <div className="relative flex h-full flex-col gap-1.5 overflow-hidden bg-white p-2.5">
          <SkeletonRow widthClass="w-24" />
          <SkeletonRow widthClass="w-28" />
          <SkeletonRow widthClass="w-20" />
          <SkeletonRow widthClass="w-24" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent" />
        </div>
      );

    case 'back-navigation':
      return (
        <div className="relative h-full overflow-hidden bg-[#E9ECEF]">
          <div className="absolute inset-y-0 left-3 right-0 rounded-l-xl bg-white p-3 shadow-[-6px_0_14px_rgba(25,31,40,0.1)]">
            <div className="mb-2 text-[10px] font-bold text-[#191F28]">주문 내역</div>
            <div className="space-y-1.5">
              <SkeletonRow widthClass="w-24" />
              <SkeletonRow widthClass="w-20" />
            </div>
          </div>
        </div>
      );
  }
}

export function OverviewGrid({ patterns, onSelectPattern }: OverviewGridProps) {
  return (
    <div className="mx-auto w-full max-w-[1040px] px-4 py-6 sm:px-8 sm:py-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center rounded-full bg-[#E8F3FF] px-3 py-1 text-xs font-bold text-[#3182F6]">
            9가지 핵심 UI/UX 내비게이션 패턴
          </span>
          <h2 className="mt-2.5 text-2xl font-extrabold tracking-tight text-[#191F28] sm:text-[26px]">
            화면 패턴 한눈에 보기
          </h2>
          <p className="mt-1 text-sm text-[#4E5968]">
            카드를 클릭하면 실제 작동하는 인터랙티브 프리뷰와 복사용 코드 스니펫으로 바로 이동합니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {patterns.map((pattern) => (
          <button
            key={pattern.id}
            type="button"
            onClick={() => onSelectPattern(pattern.id)}
            className="group flex flex-col rounded-[28px] bg-white p-5 text-left shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-cardHover focus:outline-none focus:ring-2 focus:ring-[#3182F6]"
          >
            {/* Miniature UI Preview Box */}
            <div className="h-[168px] w-full overflow-hidden rounded-[20px] border border-[#ECEFF3] bg-[#F8FAFC] shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] transition-transform duration-200 group-hover:scale-[1.015]">
              <PatternThumbnail id={pattern.id} />
            </div>

            {/* Label & Subtitle */}
            <div className="mt-4 flex items-start justify-between gap-2 px-1">
              <div>
                <div className="flex items-center gap-2 text-[19px] leading-snug tracking-tight">
                  <span className="font-extrabold text-[#3182F6]">{pattern.number}</span>
                  <span className="font-bold text-[#191F28]">{pattern.title}</span>
                </div>
                <p className="mt-0.5 text-sm font-medium text-[#8B95A1]">
                  {pattern.subtitle}
                </p>
              </div>
              <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F2F4F6] text-[#8B95A1] transition-colors group-hover:bg-[#3182F6] group-hover:text-white">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
