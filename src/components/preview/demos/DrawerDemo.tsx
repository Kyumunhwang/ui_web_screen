import { useEffect, useState } from 'react';
import { Bookmark, ChevronRight, Menu, Package, Settings, User, X } from 'lucide-react';

type DrawerMenuId = 'profile' | 'saved' | 'orders' | 'settings';

const DRAWER_MENUS: {
  id: DrawerMenuId;
  label: string;
  desc: string;
  icon: typeof User;
}[] = [
  { id: 'profile', label: '내 프로필', desc: '계정 정보 및 인증 관리', icon: User },
  { id: 'saved', label: '저장한 글', desc: '북마크한 14개의 아티클', icon: Bookmark },
  { id: 'orders', label: '주문 내역', desc: '최근 배송 및 결제 기록', icon: Package },
  { id: 'settings', label: '설정', desc: '알림, 보안 및 화면 테마', icon: Settings },
];

export function DrawerDemo() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeMenuId, setActiveMenuId] = useState<DrawerMenuId>('saved');

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const activeMenu = DRAWER_MENUS.find((m) => m.id === activeMenuId)!;

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#F2F4F6]">
      {/* App Top Bar */}
      <header className="flex items-center justify-between bg-white px-4 py-3.5 border-b border-[#E5E8EB]">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="메뉴 열기"
            className="rounded-xl p-1.5 text-[#191F28] transition-colors hover:bg-[#F2F4F6]"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h3 className="text-[16px] font-bold text-[#191F28]">{activeMenu.label}</h3>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-lg bg-[#E8F3FF] px-2.5 py-1 text-xs font-semibold text-[#3182F6]"
        >
          메뉴 열기
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <span className="inline-block rounded-md bg-[#E8F3FF] px-2 py-0.5 text-[11px] font-bold text-[#3182F6]">
            선택된 화면
          </span>
          <h4 className="mt-2 text-base font-bold text-[#191F28]">{activeMenu.label}</h4>
          <p className="mt-1 text-xs text-[#4E5968]">{activeMenu.desc}</p>
        </div>

        <div className="rounded-2xl bg-white p-4 space-y-2.5">
          {[1, 2, 3].map((row) => (
            <div
              key={row}
              className="flex items-center justify-between rounded-xl bg-[#F9FAFB] px-3.5 py-3"
            >
              <div className="flex items-center gap-2.5">
                <span className="h-3.5 w-3.5 rounded bg-[#BDDAFF]" />
                <span className="text-xs font-medium text-[#191F28]">
                  {activeMenu.label} 항목 #{row}
                </span>
              </div>
              <ChevronRight className="h-4 w-4 text-[#8B95A1]" />
            </div>
          ))}
        </div>
      </div>

      {/* Backdrop Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`absolute inset-0 z-20 bg-[#191F28]/45 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Slide-in Drawer */}
      <aside
        aria-label="내비게이션 드로어"
        className={`absolute inset-y-0 left-0 z-30 flex w-[236px] flex-col bg-white p-5 shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#F2F4F6] pb-3.5">
          <h4 className="text-base font-extrabold text-[#191F28]">메뉴</h4>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="메뉴 닫기"
            className="rounded-lg p-1 text-[#8B95A1] hover:bg-[#F2F4F6] hover:text-[#191F28]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="mt-3 flex-1 space-y-1">
          {DRAWER_MENUS.map(({ id, label, icon: Icon }) => {
            const isSelected = activeMenuId === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setActiveMenuId(id);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13.5px] transition-colors ${
                  isSelected
                    ? 'bg-[#E8F3FF] font-bold text-[#3182F6]'
                    : 'font-medium text-[#4E5968] hover:bg-[#F2F4F6] hover:text-[#191F28]'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </button>
            );
          })}
        </nav>

        <div className="rounded-xl bg-[#F2F4F6] p-3 text-[11px] text-[#4E5968]">
          배경 어두운 영역을 클릭하면 드로어가 닫힙니다.
        </div>
      </aside>
    </div>
  );
}
