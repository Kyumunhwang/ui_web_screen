import { useState } from 'react';
import { ChevronRight, Headphones, Home, Laptop, Watch } from 'lucide-react';

interface CategoryNode {
  id: string;
  label: string;
  description: string;
  children?: { id: string; label: string; count: string }[];
  items?: { name: string; price: string }[];
}

const TREE: Record<string, CategoryNode> = {
  home: {
    id: 'home',
    label: '홈',
    description: '전체 카테고리를 탐색해 보세요.',
    children: [
      { id: 'electronics', label: '가전', count: '128개 상품' },
      { id: 'accessories', label: '모바일 액세서리', count: '64개 상품' },
    ],
  },
  electronics: {
    id: 'electronics',
    label: '가전',
    description: '인기 디지털 및 음향 가전을 모아봤어요.',
    children: [
      { id: 'earbuds', label: '무선 이어폰', count: '24개 상품' },
      { id: 'laptops', label: '노트북 · 태블릿', count: '18개 상품' },
      { id: 'watches', label: '스마트 워치', count: '15개 상품' },
    ],
  },
  accessories: {
    id: 'accessories',
    label: '모바일 액세서리',
    description: '케이스, 고속 충전기, 케이블 모음입니다.',
    items: [
      { name: '맥세이프 실리콘 케이스', price: '39,000원' },
      { name: 'C-to-C 100W 고속 케이블', price: '14,500원' },
    ],
  },
  earbuds: {
    id: 'earbuds',
    label: '무선 이어폰',
    description: '액티브 노이즈 캔슬링을 지원하는 최신 무선 이어폰입니다.',
    items: [
      { name: '에어 사운드 프로 3세대', price: '289,000원' },
      { name: '스튜디오 버즈 라이트', price: '149,000원' },
      { name: '커널형 Hi-Fi 무선 이어폰', price: '198,000원' },
    ],
  },
  laptops: {
    id: 'laptops',
    label: '노트북 · 태블릿',
    description: '가볍고 오래가는 울트라북 라인업입니다.',
    items: [
      { name: '울트라 슬림 14인치 노트북', price: '1,490,000원' },
      { name: '프로 크리에이터 태블릿 11', price: '980,000원' },
    ],
  },
  watches: {
    id: 'watches',
    label: '스마트 워치',
    description: '건강과 운동을 기록하는 웨어러블 기기입니다.',
    items: [
      { name: '피트니스 워치 Active 6', price: '329,000원' },
      { name: '티타늄 울트라 워치', price: '799,000원' },
    ],
  },
};

export function BreadcrumbDemo() {
  const [trail, setTrail] = useState<string[]>(['home', 'electronics', 'earbuds']);

  const currentId = trail[trail.length - 1];
  const currentNode = TREE[currentId];

  const handleJump = (index: number) => {
    setTrail((prev) => prev.slice(0, index + 1));
  };

  const handleDrillDown = (childId: string) => {
    setTrail((prev) => [...prev, childId]);
  };

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Breadcrumb Bar */}
      <div className="border-b border-[#F2F4F6] px-5 pt-4 pb-3">
        <nav aria-label="브레드크럼" className="flex flex-wrap items-center gap-1 text-xs">
          {trail.map((nodeId, idx) => {
            const node = TREE[nodeId];
            const isLast = idx === trail.length - 1;
            return (
              <div key={nodeId} className="flex items-center gap-1">
                {idx > 0 && <ChevronRight className="h-3.5 w-3.5 text-[#B0B8C1]" />}
                {isLast ? (
                  <span aria-current="page" className="font-bold text-[#191F28]">
                    {node.label}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleJump(idx)}
                    className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 font-medium text-[#8B95A1] transition-colors hover:bg-[#E8F3FF] hover:text-[#3182F6]"
                  >
                    {idx === 0 && <Home className="h-3 w-3" />}
                    {node.label}
                  </button>
                )}
              </div>
            );
          })}
        </nav>

        <h3 className="mt-2.5 text-xl font-extrabold tracking-tight text-[#191F28]">
          {currentNode.label}
        </h3>
        <p className="mt-1 text-xs text-[#4E5968]">{currentNode.description}</p>
      </div>

      {/* Category / Product Body */}
      <div className="custom-scrollbar flex-1 overflow-y-auto bg-[#F2F4F6] p-4 space-y-2.5">
        {currentNode.children && (
          <>
            <p className="px-1 text-[11px] font-semibold text-[#8B95A1]">
              하위 카테고리 (클릭하여 이동)
            </p>
            {currentNode.children.map((child) => (
              <button
                key={child.id}
                type="button"
                onClick={() => handleDrillDown(child.id)}
                className="flex w-full items-center justify-between rounded-2xl bg-white p-4 text-left transition-all hover:shadow-sm active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#3182F6]">
                    {child.id === 'earbuds' ? (
                      <Headphones className="h-4 w-4" />
                    ) : child.id === 'watches' ? (
                      <Watch className="h-4 w-4" />
                    ) : (
                      <Laptop className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#191F28]">{child.label}</p>
                    <p className="text-[11px] text-[#8B95A1]">{child.count}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#8B95A1]" />
              </button>
            ))}
          </>
        )}

        {currentNode.items && (
          <>
            <p className="px-1 text-[11px] font-semibold text-[#8B95A1]">
              추천 상품 ({currentNode.items.length})
            </p>
            {currentNode.items.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-2xl bg-white p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-xl bg-[#E8F3FF]" />
                  <div>
                    <p className="text-xs font-bold text-[#191F28]">{item.name}</p>
                    <p className="mt-0.5 text-xs font-bold text-[#3182F6]">{item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
