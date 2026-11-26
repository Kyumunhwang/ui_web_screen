import { useState } from 'react';
import {
  Bell,
  ChevronRight,
  Heart,
  Home,
  Search,
  ShoppingBag,
  Sparkles,
  User,
} from 'lucide-react';

type TabKey = 'home' | 'search' | 'shop' | 'my';

const TABS: { key: TabKey; label: string; icon: typeof Home }[] = [
  { key: 'home', label: '홈', icon: Home },
  { key: 'search', label: '검색', icon: Search },
  { key: 'shop', label: '쇼핑', icon: ShoppingBag },
  { key: 'my', label: 'MY', icon: User },
];

const SHOP_PRODUCTS = [
  { id: 1, name: '노이즈 캔슬링 무선 이어폰', price: '189,000원', tag: '오늘출발' },
  { id: 2, name: '미니멀 알루미늄 노트북 거치대', price: '34,900원', tag: '인기' },
  { id: 3, name: '초고속 GaN 65W 멀티 충전기', price: '42,000원', tag: '특가' },
  { id: 4, name: '무선 저소음 텐키리스 키보드', price: '79,000원', tag: '무료배송' },
];

export function TabBarDemo() {
  const [activeTab, setActiveTab] = useState<TabKey>('shop');
  const [likedIds, setLikedIds] = useState<number[]>([1]);
  const [keyword, setKeyword] = useState('');
  const [pushEnabled, setPushEnabled] = useState(true);

  const toggleLike = (id: number) => {
    setLikedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const filteredProducts = SHOP_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(keyword.trim().toLowerCase()),
  );

  return (
    <div className="flex h-full flex-col bg-[#F2F4F6]">
      {/* Header */}
      <header className="flex items-center justify-between bg-white px-5 py-3.5 border-b border-[#F2F4F6]">
        <h3 className="text-[17px] font-bold text-[#191F28]">
          {TABS.find((t) => t.key === activeTab)?.label}
        </h3>
        <button
          type="button"
          onClick={() => setActiveTab('my')}
          className="relative rounded-full p-1.5 text-[#4E5968] hover:bg-[#F2F4F6]"
          aria-label="알림"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#3182F6]" />
        </button>
      </header>

      {/* Main Content */}
      <div className="custom-scrollbar flex-1 overflow-y-auto p-4">
        {activeTab === 'home' && (
          <div className="space-y-3">
            <div className="rounded-2xl bg-[#3182F6] p-4 text-white">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-white/80">
                <Sparkles className="h-3.5 w-3.5" />
                오늘의 요약
              </div>
              <p className="mt-1.5 text-base font-bold">찜한 상품이 {likedIds.length}개 있어요</p>
              <button
                type="button"
                onClick={() => setActiveTab('shop')}
                className="mt-3 inline-flex items-center gap-1 rounded-xl bg-white/15 px-3 py-1.5 text-xs font-semibold hover:bg-white/25"
              >
                쇼핑 탭으로 이동 <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <p className="text-sm font-bold text-[#191F28]">최근 본 추천</p>
              <p className="mt-1 text-xs text-[#8B95A1]">
                하단 탭을 눌러도 각 화면의 입력 상태와 스크롤 맥락이 유지됩니다.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <div className="space-y-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B95A1]" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="찾고 싶은 상품을 입력해 보세요"
                className="w-full rounded-2xl bg-white py-2.5 pl-10 pr-4 text-xs text-[#191F28] placeholder:text-[#8B95A1] focus:outline-none focus:ring-2 focus:ring-[#3182F6]"
              />
            </div>
            <div className="space-y-2">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl bg-white px-4 py-3"
                >
                  <div>
                    <p className="text-xs font-semibold text-[#191F28]">{item.name}</p>
                    <p className="mt-0.5 text-[11px] text-[#3182F6] font-bold">{item.price}</p>
                  </div>
                  <span className="rounded-md bg-[#F2F4F6] px-2 py-0.5 text-[10px] font-medium text-[#4E5968]">
                    {item.tag}
                  </span>
                </div>
              ))}
              {filteredProducts.length === 0 && (
                <div className="rounded-2xl bg-white p-6 text-center text-xs text-[#8B95A1]">
                  검색 결과가 없습니다.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'shop' && (
          <div className="space-y-2.5">
            {SHOP_PRODUCTS.map((product) => {
              const isLiked = likedIds.includes(product.id);
              return (
                <div
                  key={product.id}
                  className="flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-[0_1px_4px_rgba(25,31,40,0.03)]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#3182F6]">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="rounded bg-[#F2F4F6] px-1.5 py-0.5 text-[10px] font-semibold text-[#4E5968]">
                        {product.tag}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-[13px] font-semibold text-[#191F28]">
                      {product.name}
                    </p>
                    <p className="text-xs font-bold text-[#3182F6]">{product.price}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleLike(product.id)}
                    aria-label="좋아요"
                    className="rounded-full p-2 text-[#8B95A1] transition-colors hover:bg-[#F2F4F6]"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        isLiked ? 'fill-[#F04452] text-[#F04452]' : 'text-[#8B95A1]'
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'my' && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-2xl bg-white p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8F3FF] text-[#3182F6] font-bold">
                김
              </div>
              <div>
                <p className="text-sm font-bold text-[#191F28]">김토스 님</p>
                <p className="text-xs text-[#8B95A1]">좋아요한 상품 {likedIds.length}개</p>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-white p-4">
              <div>
                <p className="text-xs font-semibold text-[#191F28]">혜택 알림 받기</p>
                <p className="text-[11px] text-[#8B95A1]">특가 및 배송 소식을 알려드려요</p>
              </div>
              <button
                type="button"
                onClick={() => setPushEnabled((v) => !v)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  pushEnabled ? 'bg-[#3182F6]' : 'bg-[#D1D6DB]'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    pushEnabled ? 'left-[22px]' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Tab Bar */}
      <nav
        aria-label="데모 하단 탭바"
        className="grid grid-cols-4 border-t border-[#E5E8EB] bg-white px-1 py-1.5"
      >
        {TABS.map(({ key, label, icon: Icon }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className="relative flex flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 transition-colors hover:bg-[#F2F4F6]/60"
            >
              <Icon
                className={`h-[18px] w-[18px] transition-colors ${
                  isActive ? 'text-[#3182F6]' : 'text-[#8B95A1]'
                }`}
                strokeWidth={isActive ? 2.4 : 1.8}
              />
              <span
                className={`text-[10.5px] transition-colors ${
                  isActive ? 'font-bold text-[#3182F6]' : 'font-medium text-[#8B95A1]'
                }`}
              >
                {label}
              </span>
              {key === 'shop' && likedIds.length > 0 && (
                <span className="absolute right-4 top-1 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-[#3182F6] px-1 text-[9px] font-bold text-white">
                  {likedIds.length}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
