export type PatternId =
  | 'tab-bar'
  | 'top-tabs'
  | 'drawer'
  | 'breadcrumb'
  | 'sticky-header'
  | 'floating-button'
  | 'pagination'
  | 'infinite-scroll'
  | 'back-navigation';

export interface ScreenPattern {
  id: PatternId;
  number: string;
  title: string;
  subtitle: string;
  category: '전역 탐색' | '계층 · 경로' | '스크롤 · 액션' | '목록 탐색';
  summary: string;
  interactionHint: string;
  supportsViewportSwitch: boolean;
  uxGuide: {
    whenToUse: string[];
    bestPractices: string[];
    specs: { label: string; value: string }[];
  };
  snippets: {
    reactTailwind: string;
    vanillaHtml: string;
  };
}

export const SCREEN_PATTERNS: ScreenPattern[] = [
  {
    id: 'tab-bar',
    number: '01',
    title: '하단 탭바',
    subtitle: 'Tab bar',
    category: '전역 탐색',
    summary: '모바일 앱의 최상위 핵심 메뉴를 엄지손가락 영역에 고정 배치하는 1차 내비게이션입니다.',
    interactionHint: '하단 탭(홈 · 검색 · 쇼핑 · MY)을 눌러 화면 전환을 확인해 보세요.',
    supportsViewportSwitch: false,
    uxGuide: {
      whenToUse: [
        '서비스의 최상위 메뉴가 3~5개로 명확히 구분될 때 사용합니다.',
        '사용자가 한 손으로 빠르게 주요 기능(홈, 검색, 쇼핑, 마이페이지)을 오가야 할 때 적합합니다.',
        '각 탭이 독립적인 탐색 스택과 스크롤 위치를 유지해야 하는 앱에 권장합니다.',
      ],
      bestPractices: [
        '탭 개수는 3~5개 이내로 제한하고, 6개 이상이면 드로어나 더보기 탭으로 분리합니다.',
        '아이콘과 2~4자 이내의 짧은 한글 라벨을 함께 배치해 직관성을 높입니다.',
        '활성 탭은 프라이머리 컬러(#3182F6)와 채워진 아이콘으로 명확히 구분합니다.',
        'iOS/Android 하단 제스처 바를 고려해 safe-area-inset-bottom 여백을 확보합니다.',
      ],
      specs: [
        { label: '권장 높이', value: '56px ~ 64px (+ Safe Area)' },
        { label: '탭 개수', value: '최소 3개 / 최대 5개' },
        { label: '최소 터치 영역', value: '48px × 48px' },
      ],
    },
    snippets: {
      reactTailwind: `import { useState } from 'react';
import { Home, Search, ShoppingBag, User } from 'lucide-react';

type TabKey = 'home' | 'search' | 'shop' | 'my';

const TABS: { key: TabKey; label: string; icon: typeof Home }[] = [
  { key: 'home', label: '홈', icon: Home },
  { key: 'search', label: '검색', icon: Search },
  { key: 'shop', label: '쇼핑', icon: ShoppingBag },
  { key: 'my', label: 'MY', icon: User },
];

export function BottomTabBarExample() {
  const [activeTab, setActiveTab] = useState<TabKey>('shop');

  return (
    <div className="relative mx-auto flex h-[600px] w-full max-w-[375px] flex-col overflow-hidden rounded-3xl border border-[#E5E8EB] bg-[#F2F4F6]">
      <header className="bg-white px-5 py-4 border-b border-[#F2F4F6]">
        <h1 className="text-lg font-bold text-[#191F28]">
          {TABS.find((t) => t.key === activeTab)?.label}
        </h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-[#191F28]">
            현재 선택된 탭: {TABS.find((t) => t.key === activeTab)?.label}
          </p>
          <p className="mt-1 text-xs text-[#8B95A1]">
            각 탭은 독립적인 컨텍스트를 유지하며 빠르게 전환됩니다.
          </p>
        </div>
      </main>

      <nav
        aria-label="하단 내비게이션"
        className="grid grid-cols-4 border-t border-[#E5E8EB] bg-white/95 backdrop-blur pb-[env(safe-area-inset-bottom)]"
      >
        {TABS.map(({ key, label, icon: Icon }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              aria-current={isActive ? 'page' : undefined}
              className="flex flex-col items-center justify-center gap-1 py-2.5 transition-colors"
            >
              <Icon
                className={\`h-5 w-5 \${isActive ? 'text-[#3182F6]' : 'text-[#8B95A1]'}\`}
                strokeWidth={isActive ? 2.4 : 1.8}
              />
              <span
                className={\`text-[11px] font-medium \${
                  isActive ? 'text-[#3182F6] font-semibold' : 'text-[#8B95A1]'
                }\`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}`,
      vanillaHtml: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, sans-serif; }
    .phone {
      max-width: 375px; height: 560px; margin: 24px auto;
      display: flex; flex-direction: column;
      background: #F2F4F6; border: 1px solid #E5E8EB; border-radius: 24px; overflow: hidden;
    }
    .header { background: #fff; padding: 16px 20px; font-weight: 700; font-size: 18px; color: #191F28; }
    .content { flex: 1; padding: 16px; }
    .card { background: #fff; border-radius: 16px; padding: 16px; color: #4E5968; font-size: 14px; }
    .tab-bar {
      display: grid; grid-template-columns: repeat(4, 1fr);
      background: #fff; border-top: 1px solid #E5E8EB; padding: 8px 0;
    }
    .tab-btn {
      display: flex; flex-direction: column; align-items: center; gap: 4px;
      background: none; border: none; cursor: pointer; color: #8B95A1; font-size: 11px; padding: 4px 0;
    }
    .tab-btn.active { color: #3182F6; font-weight: 600; }
  </style>
</head>
<body>
  <div class="phone">
    <header class="header" id="header-title">쇼핑</header>
    <main class="content">
      <div class="card" id="tab-content">쇼핑 추천 상품을 확인해 보세요.</div>
    </main>
    <nav class="tab-bar" aria-label="하단 탭바">
      <button class="tab-btn" data-tab="홈"><span>홈</span></button>
      <button class="tab-btn" data-tab="검색"><span>검색</span></button>
      <button class="tab-btn active" data-tab="쇼핑"><span>쇼핑</span></button>
      <button class="tab-btn" data-tab="MY"><span>MY</span></button>
    </nav>
  </div>
  <script>
    const messages = {
      홈: '오늘의 맞춤 피드와 주요 소식입니다.',
      검색: '키워드로 원하는 상품을 빠르게 찾아보세요.',
      쇼핑: '쇼핑 추천 상품을 확인해 보세요.',
      MY: '내 활동 내역과 설정을 관리합니다.'
    };
    document.querySelectorAll('.tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.dataset.tab;
        document.getElementById('header-title').textContent = tab;
        document.getElementById('tab-content').textContent = messages[tab];
      });
    });
  </script>
</body>
</html>`,
    },
  },
  {
    id: 'top-tabs',
    number: '02',
    title: '상단 탭',
    subtitle: 'Top tabs',
    category: '전역 탐색',
    summary: '동일 계층의 콘텐츠 뷰나 피드 필터를 상단 인디케이터로 빠르게 전환하는 패턴입니다.',
    interactionHint: '상단 탭(추천 · 팔로잉 · 저장)을 클릭하고 북마크를 토글해 보세요.',
    supportsViewportSwitch: true,
    uxGuide: {
      whenToUse: [
        '추천 / 팔로잉 / 저장처럼 같은 성격의 데이터를 다른 기준으로 분류해 보여줄 때 사용합니다.',
        '하단 탭바와 함께 조합하여 한 화면 내부의 하위 카테고리를 전환할 때 적합합니다.',
        '좌우 스와이프 제스처와 결합해 자연스러운 탐색 흐름을 만들고 싶을 때 권장합니다.',
      ],
      bestPractices: [
        '하단 인디케이터(2px~3px, #3182F6)가 슬라이드되며 전환되도록 애니메이션을 적용합니다.',
        '탭 항목이 4개를 넘어가면 가로 스크롤이 가능하도록 여유 패딩과 힌트를 제공합니다.',
        '두 줄 텍스트(줄바꿈)는 절대 피하고 한 줄의 명사형 라벨로 구성합니다.',
      ],
      specs: [
        { label: '탭 바 높이', value: '44px ~ 48px' },
        { label: '인디케이터 두께', value: '2px ~ 2.5px (#3182F6)' },
        { label: '고정 탭 최대 수', value: '2~4개 (초과 시 스크롤형)' },
      ],
    },
    snippets: {
      reactTailwind: `import { useState } from 'react';

const TAB_ITEMS = ['추천', '팔로잉', '저장'] as const;
type TopTab = (typeof TAB_ITEMS)[number];

export function TopTabsExample() {
  const [active, setActive] = useState<TopTab>('저장');
  const activeIndex = TAB_ITEMS.indexOf(active);

  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-[#E5E8EB] bg-white">
      <div role="tablist" aria-label="피드 분류" className="relative grid grid-cols-3 border-b border-[#E5E8EB]">
        {TAB_ITEMS.map((tab) => {
          const isSelected = active === tab;
          return (
            <button
              key={tab}
              role="tab"
              type="button"
              aria-selected={isSelected}
              onClick={() => setActive(tab)}
              className={\`py-3.5 text-sm font-semibold transition-colors \${
                isSelected ? 'text-[#191F28]' : 'text-[#8B95A1] hover:text-[#4E5968]'
              }\`}
            >
              {tab}
            </button>
          );
        })}
        <span
          className="absolute bottom-0 h-[2.5px] bg-[#3182F6] transition-transform duration-300 ease-out"
          style={{
            width: \`\${100 / TAB_ITEMS.length}%\`,
            transform: \`translateX(\${activeIndex * 100}%)\`,
          }}
        />
      </div>

      <div role="tabpanel" className="p-5 bg-[#F2F4F6] space-y-3">
        <div className="rounded-2xl bg-white p-4">
          <p className="text-sm font-bold text-[#191F28]">{active} 피드</p>
          <p className="mt-1 text-xs text-[#4E5968]">
            선택한 카테고리에 맞는 콘텐츠 리스트가 표시됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}`,
      vanillaHtml: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    .tabs-wrap { max-width: 420px; margin: 24px auto; border: 1px solid #E5E8EB; border-radius: 16px; overflow: hidden; font-family: sans-serif; }
    .tablist { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); background: #fff; border-bottom: 1px solid #E5E8EB; }
    .tab { padding: 14px 0; border: none; background: none; font-size: 14px; font-weight: 600; color: #8B95A1; cursor: pointer; }
    .tab.active { color: #191F28; }
    .indicator { position: absolute; bottom: 0; left: 0; width: 33.333%; height: 2.5px; background: #3182F6; transition: transform 0.25s ease; }
    .panel { background: #F2F4F6; padding: 16px; font-size: 14px; color: #191F28; }
  </style>
</head>
<body>
  <div class="tabs-wrap">
    <div class="tablist" role="tablist">
      <button class="tab" data-idx="0">추천</button>
      <button class="tab" data-idx="1">팔로잉</button>
      <button class="tab active" data-idx="2">저장</button>
      <div class="indicator" id="indicator" style="transform: translateX(200%)"></div>
    </div>
    <div class="panel" id="panel">저장한 아티클 목록입니다.</div>
  </div>
  <script>
    const contents = ['맞춤 추천 아티클 목록입니다.', '팔로우 중인 작성자의 새 글입니다.', '저장한 아티클 목록입니다.'];
    document.querySelectorAll('.tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        const idx = Number(tab.dataset.idx);
        document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('indicator').style.transform = \`translateX(\${idx * 100}%)\`;
        document.getElementById('panel').textContent = contents[idx];
      });
    });
  </script>
</body>
</html>`,
    },
  },
  {
    id: 'drawer',
    number: '03',
    title: '드로어',
    subtitle: 'Navigation drawer',
    category: '전역 탐색',
    summary: '화면 좌측에서 슬라이드되어 보조 메뉴와 계정 설정을 수용하는 서랍형 내비게이션입니다.',
    interactionHint: '좌측 상단 메뉴(☰) 버튼을 누르거나 배경을 클릭해 드로어를 여닫아 보세요.',
    supportsViewportSwitch: true,
    uxGuide: {
      whenToUse: [
        '하단 탭바에 다 담지 못하는 6개 이상의 메뉴나 보조 설정 화면을 제공할 때 사용합니다.',
        '사용 빈도는 낮지만 언제든 접근 가능해야 하는 메뉴(주문 내역, 고객센터, 설정 등)에 적합합니다.',
        '태블릿/데스크톱의 영구 사이드바를 모바일에서 공간 절약형으로 전환할 때 활용합니다.',
      ],
      bestPractices: [
        '드로어가 열릴 때 어두운 딤(Backdrop, 40~50% 불투명도)을 깔아 배경과 시각적으로 분리합니다.',
        'ESC 키, 배경 클릭, 닫기 버튼을 모두 지원해 사용자가 쉽게 빠져나올 수 있게 합니다.',
        '메뉴를 열지 않으면 존재가 숨겨지므로, 핵심 기능은 하단 탭바나 메인 화면에 두는 것이 좋습니다.',
      ],
      specs: [
        { label: '드로어 너비', value: '260px ~ 300px (최대 80vw)' },
        { label: '배경 딤(Overlay)', value: 'rgba(25, 31, 40, 0.45)' },
        { label: '전환 모션', value: '250ms cubic-bezier(0.22, 1, 0.36, 1)' },
      ],
    },
    snippets: {
      reactTailwind: `import { useState } from 'react';
import { Menu, X, User, Bookmark, Package, Settings } from 'lucide-react';

const MENU_ITEMS = [
  { id: 'profile', label: '내 프로필', icon: User },
  { id: 'saved', label: '저장한 글', icon: Bookmark },
  { id: 'orders', label: '주문 내역', icon: Package },
  { id: 'settings', label: '설정', icon: Settings },
];

export function NavigationDrawerExample() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeId, setActiveId] = useState('saved');

  return (
    <div className="relative mx-auto h-[520px] w-full max-w-[375px] overflow-hidden rounded-3xl border border-[#E5E8EB] bg-[#F2F4F6]">
      <header className="flex items-center gap-3 bg-white px-4 py-3.5 border-b border-[#E5E8EB]">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="메뉴 열기"
          className="rounded-lg p-1.5 text-[#191F28] hover:bg-[#F2F4F6]"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="font-bold text-[#191F28]">
          {MENU_ITEMS.find((m) => m.id === activeId)?.label}
        </span>
      </header>

      <main className="p-5">
        <div className="rounded-2xl bg-white p-4 text-sm text-[#4E5968]">
          선택한 메뉴 화면이 여기에 표시됩니다.
        </div>
      </main>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 z-20 bg-[#191F28]/45 transition-opacity"
        />
      )}

      <aside
        aria-label="사이드 드로어"
        className={\`absolute inset-y-0 left-0 z-30 w-64 bg-white p-5 shadow-xl transition-transform duration-300 \${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }\`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#F2F4F6]">
          <h2 className="text-base font-bold text-[#191F28]">메뉴</h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="메뉴 닫기"
            className="rounded-lg p-1 text-[#8B95A1] hover:bg-[#F2F4F6]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <ul className="mt-4 space-y-1">
          {MENU_ITEMS.map(({ id, label, icon: Icon }) => {
            const isActive = activeId === id;
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveId(id);
                    setIsOpen(false);
                  }}
                  className={\`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors \${
                    isActive
                      ? 'bg-[#E8F3FF] text-[#3182F6] font-semibold'
                      : 'text-[#4E5968] hover:bg-[#F2F4F6]'
                  }\`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}`,
      vanillaHtml: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    .shell { position: relative; max-width: 375px; height: 480px; margin: 24px auto; overflow: hidden; border: 1px solid #E5E8EB; border-radius: 24px; background: #F2F4F6; font-family: sans-serif; }
    .topbar { display: flex; align-items: center; gap: 10px; padding: 14px 16px; background: #fff; border-bottom: 1px solid #E5E8EB; }
    .backdrop { position: absolute; inset: 0; background: rgba(25, 31, 40, 0.45); display: none; z-index: 10; }
    .backdrop.open { display: block; }
    .drawer { position: absolute; top: 0; bottom: 0; left: 0; width: 240px; background: #fff; padding: 20px; z-index: 20; transform: translateX(-100%); transition: transform 0.28s ease; }
    .drawer.open { transform: translateX(0); }
    .nav-item { display: block; width: 100%; text-align: left; padding: 10px 12px; border: none; background: none; border-radius: 10px; font-size: 14px; color: #4E5968; cursor: pointer; margin-top: 4px; }
    .nav-item.active { background: #E8F3FF; color: #3182F6; font-weight: 600; }
  </style>
</head>
<body>
  <div class="shell">
    <header class="topbar">
      <button id="open-btn" style="border:none;background:none;font-size:18px;cursor:pointer;">☰</button>
      <strong id="page-title">저장한 글</strong>
    </header>
    <div style="padding:16px;"><div style="background:#fff;padding:16px;border-radius:16px;">콘텐츠 영역</div></div>
    <div class="backdrop open" id="backdrop"></div>
    <aside class="drawer open" id="drawer">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <strong>메뉴</strong>
        <button id="close-btn" style="border:none;background:none;cursor:pointer;">✕</button>
      </div>
      <button class="nav-item">내 프로필</button>
      <button class="nav-item active">저장한 글</button>
      <button class="nav-item">주문 내역</button>
      <button class="nav-item">설정</button>
    </aside>
  </div>
  <script>
    const drawer = document.getElementById('drawer');
    const backdrop = document.getElementById('backdrop');
    const toggle = (open) => { drawer.classList.toggle('open', open); backdrop.classList.toggle('open', open); };
    document.getElementById('open-btn').onclick = () => toggle(true);
    document.getElementById('close-btn').onclick = () => toggle(false);
    backdrop.onclick = () => toggle(false);
    document.querySelectorAll('.nav-item').forEach((item) => {
      item.onclick = () => {
        document.querySelectorAll('.nav-item').forEach((i) => i.classList.remove('active'));
        item.classList.add('active');
        document.getElementById('page-title').textContent = item.textContent;
        toggle(false);
      };
    });
  </script>
</body>
</html>`,
    },
  },
  {
    id: 'breadcrumb',
    number: '04',
    title: '브레드크럼',
    subtitle: 'Breadcrumb',
    category: '계층 · 경로',
    summary: '사용자의 현재 위치와 상위 카테고리 계층 경로를 한눈에 보여주는 보조 내비게이션입니다.',
    interactionHint: '상단 경로(홈 › 가전 › 무선 이어폰)나 하위 카테고리를 클릭해 계층을 이동해 보세요.',
    supportsViewportSwitch: true,
    uxGuide: {
      whenToUse: [
        '이커머스, 문서 포털, 관리자 대시보드처럼 3단계 이상의 깊은 정보 계층을 가질 때 사용합니다.',
        '검색이나 외부 링크를 통해 상세 페이지로 바로 진입한 사용자에게 상위 맥락을 알려줄 때 효과적입니다.',
        '상위 카테고리로 한 번에 점프해야 하는 웹 환경에 특히 적합합니다.',
      ],
      bestPractices: [
        '마지막 항목(현재 페이지)은 클릭 불가 텍스트로 두거나 굵은 글씨(#191F28)로 구분합니다.',
        '구분자는 화살표(›) 또는 슬래시(/)를 일관되게 사용하며, 스크린 리더를 위해 nav[aria-label="breadcrumb"]를 지정합니다.',
        '모바일처럼 폭이 좁을 때는 중간 경로를 말줄임(...) 처리하거나 가로 스크롤을 허용합니다.',
      ],
      specs: [
        { label: '권장 폰트 크기', value: '12px ~ 13px' },
        { label: '적정 계층 깊이', value: '2단계 ~ 5단계' },
        { label: '구분자 간격', value: '좌우 6px ~ 8px' },
      ],
    },
    snippets: {
      reactTailwind: `import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const PATH_ITEMS = [
  { id: 'home', label: '홈', title: '전체 스토어' },
  { id: 'electronics', label: '가전', title: '디지털 · 가전' },
  { id: 'earbuds', label: '무선 이어폰', title: '무선 이어폰' },
];

export function BreadcrumbExample() {
  const [depth, setDepth] = useState(3);
  const currentTrail = PATH_ITEMS.slice(0, depth);
  const currentPage = currentTrail[currentTrail.length - 1];

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-[#E5E8EB] bg-white p-6">
      <nav aria-label="현재 위치 경로" className="flex items-center gap-1.5 text-xs">
        {currentTrail.map((item, index) => {
          const isLast = index === currentTrail.length - 1;
          return (
            <div key={item.id} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-[#8B95A1]" />}
              {isLast ? (
                <span aria-current="page" className="font-semibold text-[#191F28]">
                  {item.label}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setDepth(index + 1)}
                  className="text-[#8B95A1] hover:text-[#3182F6] hover:underline"
                >
                  {item.label}
                </button>
              )}
            </div>
          );
        })}
      </nav>

      <h1 className="mt-3 text-xl font-bold text-[#191F28]">{currentPage.title}</h1>
      <p className="mt-2 text-sm text-[#4E5968]">
        상위 경로를 클릭하면 해당 카테고리 계층으로 즉시 이동합니다.
      </p>
    </div>
  );
}`,
      vanillaHtml: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    .box { max-width: 480px; margin: 24px auto; padding: 24px; background: #fff; border: 1px solid #E5E8EB; border-radius: 16px; font-family: sans-serif; }
    .breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #8B95A1; list-style: none; padding: 0; margin: 0 0 12px; }
    .breadcrumb a { color: #8B95A1; text-decoration: none; }
    .breadcrumb a:hover { color: #3182F6; text-decoration: underline; }
    .breadcrumb .current { color: #191F28; font-weight: 600; }
  </style>
</head>
<body>
  <div class="box">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li><a href="#home">홈</a></li>
        <li aria-hidden="true">›</li>
        <li><a href="#electronics">가전</a></li>
        <li aria-hidden="true">›</li>
        <li class="current" aria-current="page">무선 이어폰</li>
      </ol>
    </nav>
    <h1 style="font-size:20px;color:#191F28;margin:0;">무선 이어폰</h1>
  </div>
</body>
</html>`,
    },
  },
  {
    id: 'sticky-header',
    number: '05',
    title: '고정 헤더',
    subtitle: 'Sticky header',
    category: '스크롤 · 액션',
    summary: '스크롤 시에도 페이지 제목, 상태 요약, 핵심 액션을 상단에 고정해 맥락을 유지합니다.',
    interactionHint: '장바구니 목록을 아래로 스크롤하고 수량을 조절해 상단 고정 헤더 변화를 확인하세요.',
    supportsViewportSwitch: true,
    uxGuide: {
      whenToUse: [
        '장바구니, 검색 결과, 필터 목록처럼 스크롤 중에도 현재 상태(총 개수·금액)나 검색바를 계속 보여줘야 할 때 사용합니다.',
        '스크롤이 길어져도 뒤로 가기, 장바구니, 완료 등 상단 액션 버튼에 즉시 접근해야 할 때 적합합니다.',
      ],
      bestPractices: [
        '초기 상태에서는 그림자 없이 깔끔하게 두다가, 스크롤이 발생(scrollTop > 4)하면 얇은 보더와 그림자·배경 블러를 적용해 깊이감을 줍니다.',
        '모바일 화면에서 헤더가 너무 높으면(64px 초과) 실제 콘텐츠 가독 영역이 좁아지므로 52~56px로 컴팩트하게 유지합니다.',
        'position: sticky; top: 0 사용 시 부모 요소에 overflow: hidden이 걸리지 않도록 주의합니다.',
      ],
      specs: [
        { label: '고정 헤더 높이', value: '52px ~ 56px' },
        { label: '스크롤 시 배경', value: 'rgba(255, 255, 255, 0.9) + blur(12px)' },
        { label: '하단 구분선', value: '1px solid #E5E8EB' },
      ],
    },
    snippets: {
      reactTailwind: `import { useState } from 'react';

const CART_ITEMS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: \`데일리 필수 아이템 #\${i + 1}\`,
  price: (i + 1) * 4500,
}));

export function StickyHeaderExample() {
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <div
      onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 6)}
      className="mx-auto h-[480px] w-full max-w-[375px] overflow-y-auto rounded-3xl border border-[#E5E8EB] bg-[#F2F4F6]"
    >
      <header
        className={\`sticky top-0 z-10 flex items-center justify-between px-5 py-3.5 transition-all \${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-[#E5E8EB] shadow-sm'
            : 'bg-white border-b border-transparent'
        }\`}
      >
        <div className="flex items-center gap-1.5">
          <h1 className="text-base font-bold text-[#191F28]">장바구니</h1>
          <span className="text-base font-bold text-[#3182F6]">{CART_ITEMS.length}</span>
        </div>
        <button
          type="button"
          className="rounded-lg bg-[#3182F6] px-3 py-1.5 text-xs font-semibold text-white"
        >
          주문하기
        </button>
      </header>

      <ul className="space-y-2.5 p-4">
        {CART_ITEMS.map((item) => (
          <li key={item.id} className="flex items-center justify-between rounded-2xl bg-white p-4">
            <span className="text-sm font-medium text-[#191F28]">{item.name}</span>
            <span className="text-sm font-semibold text-[#4E5968]">
              {item.price.toLocaleString()}원
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
      vanillaHtml: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    .scroll-box { max-width: 375px; height: 460px; margin: 24px auto; overflow-y: auto; border: 1px solid #E5E8EB; border-radius: 24px; background: #F2F4F6; font-family: sans-serif; }
    .sticky-header {
      position: sticky; top: 0; z-index: 10;
      display: flex; justify-content: space-between; align-items: center;
      padding: 14px 20px; background: rgba(255, 255, 255, 0.92); backdrop-filter: blur(8px);
      transition: box-shadow 0.2s, border-color 0.2s; border-bottom: 1px solid transparent;
    }
    .sticky-header.scrolled { border-bottom-color: #E5E8EB; box-shadow: 0 4px 12px rgba(25, 31, 40, 0.06); }
    .list { padding: 12px 16px; display: flex; flex-direction: column; gap: 10px; }
    .item { background: #fff; border-radius: 14px; padding: 16px; font-size: 14px; color: #191F28; }
  </style>
</head>
<body>
  <div class="scroll-box" id="box">
    <header class="sticky-header" id="header">
      <strong style="font-size:16px;">장바구니 <span style="color:#3182F6;">12</span></strong>
      <span style="font-size:12px;color:#8B95A1;">스크롤 테스트</span>
    </header>
    <div class="list">
      <div class="item">상품 1</div><div class="item">상품 2</div><div class="item">상품 3</div>
      <div class="item">상품 4</div><div class="item">상품 5</div><div class="item">상품 6</div>
      <div class="item">상품 7</div><div class="item">상품 8</div><div class="item">상품 9</div>
    </div>
  </div>
  <script>
    const box = document.getElementById('box');
    const header = document.getElementById('header');
    box.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', box.scrollTop > 6);
    });
  </script>
</body>
</html>`,
    },
  },
  {
    id: 'floating-button',
    number: '06',
    title: '플로팅 버튼',
    subtitle: 'Floating action button',
    category: '스크롤 · 액션',
    summary: '화면 내 가장 빈도가 높은 핵심 생성 액션을 우측 하단에 띄워 언제든 실행할 수 있게 합니다.',
    interactionHint: '목록을 스크롤한 뒤 우측 하단 [+ 새 글 쓰기] 버튼을 눌러 실제 글을 작성해 보세요.',
    supportsViewportSwitch: false,
    uxGuide: {
      whenToUse: [
        '게시판의 글쓰기, 메모 작성, 송금하기처럼 화면 전체를 대표하는 단 하나의 핵심 액션(Primary CTA)이 있을 때 사용합니다.',
        '스크롤이 긴 피드에서도 사용자가 즉시 작성·생성 동작으로 진입할 수 있어야 할 때 적합합니다.',
      ],
      bestPractices: [
        '한 화면에 플로팅 버튼은 반드시 1개만 배치해 시선 분산을 막습니다.',
        '아이콘 단독 형태보다 확장형 알약(Extended Pill: `+ 새 글 쓰기`) 형태가 전환율과 명확성 면에서 유리합니다.',
        '하단 마지막 리스트 아이템이 버튼에 가려지지 않도록 목록 하단에 충분한 여백(pb-20 이상)을 줍니다.',
      ],
      specs: [
        { label: '우측/하단 여백', value: 'right: 16px, bottom: 20px' },
        { label: '버튼 높이', value: '48px ~ 52px (Rounded Full)' },
        { label: '그림자(Elevation)', value: '0 6px 18px rgba(49,130,246,0.35)' },
      ],
    },
    snippets: {
      reactTailwind: `import { useState } from 'react';
import { Plus } from 'lucide-react';

export function FloatingButtonExample() {
  const [posts, setPosts] = useState([
    '오늘의 디자인 시스템 회고',
    '모바일 터치 영역 48px 기준 정리',
    '리스트 스크롤 성능 개선 노트',
  ]);

  const handleAddPost = () => {
    setPosts((prev) => [\`새 게시글 #\${prev.length + 1}\`, ...prev]);
  };

  return (
    <div className="relative mx-auto h-[520px] w-full max-w-[375px] overflow-hidden rounded-3xl border border-[#E5E8EB] bg-[#F2F4F6]">
      <div className="h-full overflow-y-auto p-4 pb-24 space-y-2.5">
        {posts.map((post, idx) => (
          <article key={idx} className="rounded-2xl bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-[#191F28]">{post}</h2>
            <p className="mt-1 text-xs text-[#8B95A1]">방금 전 작성됨</p>
          </article>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddPost}
        className="absolute bottom-5 right-4 flex items-center gap-1.5 rounded-full bg-[#3182F6] px-4 py-3 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(49,130,246,0.35)] transition-transform active:scale-95 hover:bg-[#1B64DA]"
      >
        <Plus className="h-4 w-4 stroke-[2.5]" />
        새 글 쓰기
      </button>
    </div>
  );
}`,
      vanillaHtml: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    .canvas { position: relative; max-width: 375px; height: 480px; margin: 24px auto; border: 1px solid #E5E8EB; border-radius: 24px; background: #F2F4F6; overflow: hidden; font-family: sans-serif; }
    .feed { height: 100%; overflow-y: auto; padding: 16px 16px 88px; display: flex; flex-direction: column; gap: 10px; }
    .post { background: #fff; border-radius: 16px; padding: 16px; font-size: 14px; color: #191F28; }
    .fab {
      position: absolute; right: 16px; bottom: 20px;
      display: inline-flex; align-items: center; gap: 6px;
      padding: 13px 18px; border-radius: 9999px; border: none; cursor: pointer;
      background: #3182F6; color: #fff; font-size: 14px; font-weight: 600;
      box-shadow: 0 6px 18px rgba(49, 130, 246, 0.35);
    }
    .fab:active { transform: scale(0.96); }
  </style>
</head>
<body>
  <div class="canvas">
    <div class="feed" id="feed">
      <div class="post">첫 번째 커뮤니티 게시글</div>
      <div class="post">두 번째 커뮤니티 게시글</div>
      <div class="post">세 번째 커뮤니티 게시글</div>
    </div>
    <button class="fab" id="fab">＋ 새 글 쓰기</button>
  </div>
  <script>
    let count = 3;
    document.getElementById('fab').addEventListener('click', () => {
      count += 1;
      const item = document.createElement('div');
      item.className = 'post';
      item.textContent = \`새로 작성한 글 #\${count}\`;
      document.getElementById('feed').prepend(item);
    });
  </script>
</body>
</html>`,
    },
  },
  {
    id: 'pagination',
    number: '07',
    title: '페이지네이션',
    subtitle: 'Pagination',
    category: '목록 탐색',
    summary: '대량의 정형 데이터를 페이지 번호 단위로 나누어 정확한 위치 파악과 복귀를 지원합니다.',
    interactionHint: '하단 페이지 번호(1~5)나 화살표 버튼을 클릭해 목록 전환을 확인해 보세요.',
    supportsViewportSwitch: true,
    uxGuide: {
      whenToUse: [
        '검색 결과, 게시판, 관리자 테이블처럼 사용자가 특정 페이지 번호를 기억하거나 다시 찾아와야 할 때 사용합니다.',
        '전체 데이터 개수를 명확히 가늠하고 푸터(Footer) 영역에 도달할 수 있어야 하는 웹 서비스에 적합합니다.',
      ],
      bestPractices: [
        '현재 페이지 번호는 프라이머리 컬러(#3182F6) 배경의 둥근 사각형/원형으로 강하게 강조합니다.',
        '모바일에서는 한 화면에 5개 이내의 페이지 번호만 노출해 오작동(오터치)을 줄입니다.',
        '첫 페이지/마지막 페이지에서는 이전/다음 버튼을 비활성화(disabled) 처리해 상태를 명확히 알립니다.',
      ],
      specs: [
        { label: '페이지 버튼 크기', value: '32px × 32px ~ 36px × 36px' },
        { label: '동시 노출 페이지 수', value: '모바일 5개 / 데스크톱 7~10개' },
        { label: '페이지당 항목 수', value: '10개 ~ 20개 권장' },
      ],
    },
    snippets: {
      reactTailwind: `import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TOTAL_PAGES = 5;
const ITEMS_PER_PAGE = 4;

export function PaginationExample() {
  const [page, setPage] = useState(4);

  const items = Array.from({ length: ITEMS_PER_PAGE }, (_, idx) => ({
    id: (page - 1) * ITEMS_PER_PAGE + idx + 1,
    title: \`공지 및 업데이트 안내 #\${(page - 1) * ITEMS_PER_PAGE + idx + 1}\`,
  }));

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-[#E5E8EB] bg-white p-5">
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.id} className="rounded-xl bg-[#F2F4F6] px-4 py-3 text-sm font-medium text-[#191F28]">
            {item.title}
          </li>
        ))}
      </ul>

      <nav aria-label="페이지네이션" className="mt-5 flex items-center justify-center gap-1.5">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#4E5968] disabled:opacity-30 hover:bg-[#F2F4F6]"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => setPage(num)}
            aria-current={page === num ? 'page' : undefined}
            className={\`h-8 w-8 rounded-lg text-xs font-semibold transition-colors \${
              page === num
                ? 'bg-[#3182F6] text-white'
                : 'text-[#4E5968] hover:bg-[#F2F4F6]'
            }\`}
          >
            {num}
          </button>
        ))}

        <button
          type="button"
          disabled={page === TOTAL_PAGES}
          onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#4E5968] disabled:opacity-30 hover:bg-[#F2F4F6]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </nav>
    </div>
  );
}`,
      vanillaHtml: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    .wrap { max-width: 400px; margin: 24px auto; padding: 20px; background: #fff; border: 1px solid #E5E8EB; border-radius: 20px; font-family: sans-serif; }
    .list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px; }
    .row { padding: 12px 14px; border-radius: 12px; background: #F2F4F6; font-size: 14px; color: #191F28; }
    .pager { display: flex; justify-content: center; gap: 6px; }
    .page-btn { width: 32px; height: 32px; border: none; border-radius: 8px; background: transparent; color: #4E5968; font-weight: 600; cursor: pointer; }
    .page-btn.active { background: #3182F6; color: #fff; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="list" id="list"></div>
    <nav class="pager" id="pager"></nav>
  </div>
  <script>
    let current = 4;
    function render() {
      const list = document.getElementById('list');
      list.innerHTML = Array.from({ length: 4 }, (_, i) => {
        const num = (current - 1) * 4 + i + 1;
        return \`<div class="row">목록 아이템 #\${num}</div>\`;
      }).join('');
      const pager = document.getElementById('pager');
      pager.innerHTML = [1, 2, 3, 4, 5].map((n) =>
        \`<button class="page-btn \${n === current ? 'active' : ''}" onclick="go(\${n})">\${n}</button>\`
      ).join('');
    }
    window.go = (n) => { current = n; render(); };
    render();
  </script>
</body>
</html>`,
    },
  },
  {
    id: 'infinite-scroll',
    number: '08',
    title: '무한 스크롤',
    subtitle: 'Infinite scroll',
    category: '목록 탐색',
    summary: '스크롤이 하단에 도달하면 다음 콘텐츠를 끊김 없이 이어 붙여 몰입형 탐색 경험을 제공합니다.',
    interactionHint: '목록 맨 아래로 스크롤해 자동 로딩(IntersectionObserver)을 체험해 보세요.',
    supportsViewportSwitch: true,
    uxGuide: {
      whenToUse: [
        '소셜 피드, 숏폼, 상품 추천 탐색처럼 끝없는 발견과 연속 소비가 목표인 화면에 사용합니다.',
        '페이지 전환 클릭 마찰을 없애고 모바일에서 스크롤 흐름을 유지하고 싶을 때 적합합니다.',
      ],
      bestPractices: [
        'scroll 이벤트 리스너 대신 IntersectionObserver를 센티넬(Sentinel) 요소에 연결해 성능을 최적화합니다.',
        '다음 배치를 불러오는 동안 스켈레톤 UI나 인디케이터를 표시해 멈춘 것처럼 보이지 않게 합니다.',
        '무한 스크롤 화면 하단에는 회사 정보 같은 중요한 푸터(Footer)를 두지 않습니다(도달 불가능 문제).',
      ],
      specs: [
        { label: '감지 방식', value: 'IntersectionObserver (rootMargin: 120px)' },
        { label: '배치 크기', value: '1회 10~20개 로딩' },
        { label: '중복 요청 방지', value: 'isLoading 플래그 가드 필수' },
      ],
    },
    snippets: {
      reactTailwind: `import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

export function InfiniteScrollExample() {
  const [items, setItems] = useState(() => Array.from({ length: 10 }, (_, i) => i + 1));
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = sentinelRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && items.length < 40) {
          setIsLoading(true);
          setTimeout(() => {
            setItems((prev) => [
              ...prev,
              ...Array.from({ length: 6 }, (_, i) => prev.length + i + 1),
            ]);
            setIsLoading(false);
          }, 600);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [isLoading, items.length]);

  return (
    <div className="mx-auto h-[460px] w-full max-w-[375px] overflow-y-auto rounded-3xl border border-[#E5E8EB] bg-[#F2F4F6] p-4">
      <div className="space-y-2.5">
        {items.map((id) => (
          <div key={id} className="rounded-2xl bg-white p-4 text-sm font-medium text-[#191F28]">
            피드 카드 #{id}
          </div>
        ))}
      </div>

      <div ref={sentinelRef} className="flex items-center justify-center py-5 text-xs text-[#8B95A1]">
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-[#3182F6]" />
            불러오는 중...
          </span>
        ) : items.length >= 40 ? (
          '모든 항목을 불러왔습니다'
        ) : (
          '아래로 스크롤하면 더 불러옵니다'
        )}
      </div>
    </div>
  );
}`,
      vanillaHtml: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    .feed { max-width: 375px; height: 440px; margin: 24px auto; overflow-y: auto; padding: 16px; background: #F2F4F6; border: 1px solid #E5E8EB; border-radius: 24px; font-family: sans-serif; }
    .card { background: #fff; border-radius: 14px; padding: 14px 16px; margin-bottom: 10px; font-size: 14px; color: #191F28; }
    .sentinel { text-align: center; padding: 16px; font-size: 12px; color: #8B95A1; }
  </style>
</head>
<body>
  <div class="feed" id="feed">
    <div id="items"></div>
    <div class="sentinel" id="sentinel">불러오는 중...</div>
  </div>
  <script>
    let count = 0;
    const itemsEl = document.getElementById('items');
    function appendBatch(n = 8) {
      for (let i = 0; i < n; i++) {
        count++;
        const div = document.createElement('div');
        div.className = 'card';
        div.textContent = \`피드 아이템 #\${count}\`;
        itemsEl.appendChild(div);
      }
    }
    appendBatch(10);
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && count < 40) {
        setTimeout(() => appendBatch(6), 450);
      } else if (count >= 40) {
        document.getElementById('sentinel').textContent = '모든 항목을 확인했습니다.';
      }
    }, { root: document.getElementById('feed'), threshold: 0.1 });
    observer.observe(document.getElementById('sentinel'));
  </script>
</body>
</html>`,
    },
  },
  {
    id: 'back-navigation',
    number: '09',
    title: '뒤로 가기',
    subtitle: 'Back navigation',
    category: '계층 · 경로',
    summary: '이전 화면이 아래 레이어에 쌓여 있다가 복귀하는 스택 기반 화면 전환 패턴입니다.',
    interactionHint: '주문 항목을 눌러 상세 화면으로 들어간 뒤, 상단 뒤로가기 버튼이나 화면 왼쪽 끝 스와이프를 해보세요.',
    supportsViewportSwitch: false,
    uxGuide: {
      whenToUse: [
        '주문 내역 → 주문 상세 → 배송 추적처럼 선형적인 뎁스(Depth) 이동이 일어날 때 사용합니다.',
        '사용자가 현재 화면이 어디서 왔는지 공간적으로 인지하게 하고 싶을 때 적합합니다.',
      ],
      bestPractices: [
        '이전 화면이 살짝 밀려나며 겹쳐지는 스택 애니메이션(translateX)으로 깊이감을 표현합니다.',
        '상단 좌측의 `<` 뒤로 가기 버튼과 더불어 모바일 엣지 스와이프(왼쪽에서 오른쪽 드래그) 제스처를 지원하면 조작감이 뛰어납니다.',
        '뒤로 가기 시 이전 화면의 스크롤 위치를 복원해야 사용자가 맥락을 잃지 않습니다.',
      ],
      specs: [
        { label: '스택 전환 시간', value: '280ms ~ 320ms' },
        { label: '스와이프 임계치', value: '너비의 30% 이상 드래그 시 복귀' },
        { label: '뒤로가기 버튼 영역', value: '최소 44px × 44px' },
      ],
    },
    snippets: {
      reactTailwind: `import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function BackNavigationExample() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>('주문 상세 #2026-01');

  return (
    <div className="relative mx-auto h-[500px] w-full max-w-[375px] overflow-hidden rounded-3xl border border-[#E5E8EB] bg-white">
      {/* Base Stack Screen */}
      <div
        className={\`absolute inset-0 bg-[#F2F4F6] p-4 transition-transform duration-300 \${
          selectedOrder ? '-translate-x-12 brightness-95' : 'translate-x-0'
        }\`}
      >
        <h1 className="mb-3 px-1 text-lg font-bold text-[#191F28]">주문 내역</h1>
        <div className="space-y-2.5">
          {['주문 상세 #2026-01', '주문 상세 #2026-02'].map((order) => (
            <button
              key={order}
              type="button"
              onClick={() => setSelectedOrder(order)}
              className="flex w-full items-center justify-between rounded-2xl bg-white p-4 text-left text-sm font-medium text-[#191F28]"
            >
              <span>{order}</span>
              <ChevronRight className="h-4 w-4 text-[#8B95A1]" />
            </button>
          ))}
        </div>
      </div>

      {/* Pushed Detail Screen */}
      <div
        className={\`absolute inset-0 bg-white shadow-[-12px_0_28px_rgba(25,31,40,0.12)] transition-transform duration-300 \${
          selectedOrder ? 'translate-x-0' : 'translate-x-full'
        }\`}
      >
        <header className="flex items-center gap-1 border-b border-[#E5E8EB] px-3 py-3">
          <button
            type="button"
            onClick={() => setSelectedOrder(null)}
            className="flex items-center gap-0.5 rounded-lg px-1.5 py-1 text-sm font-medium text-[#3182F6] hover:bg-[#E8F3FF]"
          >
            <ChevronLeft className="h-5 w-5" />
            주문 내역
          </button>
        </header>
        <div className="p-5">
          <h2 className="text-lg font-bold text-[#191F28]">{selectedOrder}</h2>
          <p className="mt-2 text-sm text-[#4E5968]">
            이전 화면이 아래 레이어에 유지된 상태로 부드럽게 되돌아갑니다.
          </p>
        </div>
      </div>
    </div>
  );
}`,
      vanillaHtml: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    .stack { position: relative; max-width: 375px; height: 460px; margin: 24px auto; overflow: hidden; border: 1px solid #E5E8EB; border-radius: 24px; font-family: sans-serif; }
    .screen { position: absolute; inset: 0; transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1); padding: 20px; }
    .base { background: #F2F4F6; }
    .base.pushed { transform: translateX(-24%); filter: brightness(0.95); }
    .detail { background: #fff; box-shadow: -10px 0 24px rgba(0,0,0,0.1); transform: translateX(100%); }
    .detail.open { transform: translateX(0); }
    .btn { width: 100%; text-align: left; padding: 14px; border: none; border-radius: 14px; background: #fff; margin-top: 10px; cursor: pointer; font-weight: 600; }
  </style>
</head>
<body>
  <div class="stack">
    <div class="screen base pushed" id="base">
      <h2 style="font-size:18px;margin:0 0 12px;">주문 내역</h2>
      <button class="btn" onclick="openDetail('무선 이어폰 Pro')">무선 이어폰 Pro ›</button>
      <button class="btn" onclick="openDetail('스마트 워치 SE')">스마트 워치 SE ›</button>
    </div>
    <div class="screen detail open" id="detail">
      <button onclick="goBack()" style="border:none;background:none;color:#3182F6;font-size:14px;font-weight:600;cursor:pointer;">‹ 주문 내역</button>
      <h3 id="detail-title" style="margin-top:18px;">무선 이어폰 Pro</h3>
      <p style="color:#4E5968;font-size:14px;margin-top:8px;">배송 완료 · 어제 도착</p>
    </div>
  </div>
  <script>
    function openDetail(name) {
      document.getElementById('detail-title').textContent = name;
      document.getElementById('base').classList.add('pushed');
      document.getElementById('detail').classList.add('open');
    }
    function goBack() {
      document.getElementById('base').classList.remove('pushed');
      document.getElementById('detail').classList.remove('open');
    }
  </script>
</body>
</html>`,
    },
  },
];
