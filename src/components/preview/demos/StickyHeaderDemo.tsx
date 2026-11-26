import { useState } from 'react';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

const INITIAL_CART: CartItem[] = [
  { id: 1, name: '유기농 그릭 요거트 450g', price: 6900, qty: 1 },
  { id: 2, name: '콜드브루 디카페인 원액', price: 11500, qty: 1 },
  { id: 3, name: '저당 통밀 베이글 4입', price: 5800, qty: 1 },
  { id: 4, name: '아보카도 오일 스프레이', price: 14900, qty: 1 },
  { id: 5, name: '무항생제 유정란 15구', price: 7400, qty: 1 },
  { id: 6, name: '제주 감귤 주스 1L', price: 4800, qty: 1 },
  { id: 7, name: '스파클링 탄산수 레몬 20입', price: 12900, qty: 1 },
  { id: 8, name: '프리미엄 3겹 키친타월', price: 8900, qty: 1 },
  { id: 9, name: '구운 아몬드 하루견과', price: 15900, qty: 1 },
  { id: 10, name: '수비드 닭가슴살 오리지널', price: 3200, qty: 1 },
  { id: 11, name: '트러플 감자칩 120g', price: 4200, qty: 1 },
  { id: 12, name: '올리브 바질 페스토', price: 9600, qty: 1 },
];

export function StickyHeaderDemo() {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART);
  const [isScrolled, setIsScrolled] = useState(false);

  const totalCount = items.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  const updateQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item,
      ),
    );
  };

  return (
    <div
      onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 8)}
      className="custom-scrollbar h-full overflow-y-auto bg-[#F2F4F6]"
    >
      {/* Sticky Header */}
      <header
        className={`sticky top-0 z-10 flex items-center justify-between px-5 py-3.5 transition-all duration-200 ${
          isScrolled
            ? 'border-b border-[#E5E8EB] bg-white/90 backdrop-blur-md shadow-[0_4px_16px_rgba(25,31,40,0.06)]'
            : 'border-b border-[#F2F4F6] bg-white'
        }`}
      >
        <div className="flex items-center gap-2">
          <h3 className="text-[17px] font-extrabold text-[#191F28]">
            장바구니 <span className="text-[#3182F6]">{totalCount}</span>
          </h3>
        </div>
        <div className="text-right">
          <span className="block text-[10px] text-[#8B95A1]">예상 결제금액</span>
          <span className="text-xs font-bold text-[#191F28]">
            {totalPrice.toLocaleString()}원
          </span>
        </div>
      </header>

      {/* Scrollable Items */}
      <div className="space-y-2.5 p-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-2 rounded-2xl bg-white p-3.5 shadow-[0_1px_4px_rgba(25,31,40,0.03)]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#3182F6]">
                <ShoppingCart className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-[#191F28]">{item.name}</p>
                <p className="mt-0.5 text-[11px] font-bold text-[#4E5968]">
                  {item.price.toLocaleString()}원
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1.5 rounded-xl bg-[#F2F4F6] px-1.5 py-1">
              <button
                type="button"
                onClick={() => updateQty(item.id, -1)}
                aria-label="수량 감소"
                className="flex h-5 w-5 items-center justify-center rounded-md bg-white text-[#4E5968] hover:text-[#191F28]"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-4 text-center text-xs font-bold text-[#191F28]">{item.qty}</span>
              <button
                type="button"
                onClick={() => updateQty(item.id, 1)}
                aria-label="수량 증가"
                className="flex h-5 w-5 items-center justify-center rounded-md bg-white text-[#4E5968] hover:text-[#191F28]"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
