import { useState } from 'react';
import { ChevronLeft, ChevronRight, Package, Truck } from 'lucide-react';

interface OrderRecord {
  id: string;
  title: string;
  status: string;
  price: string;
  date: string;
}

const ORDERS: OrderRecord[] = [
  { id: 'ORD-01', title: '노이즈 캔슬링 무선 이어폰', status: '배송 완료', price: '189,000원', date: '11.24 도착' },
  { id: 'ORD-02', title: '알루미늄 노트북 스탠드', status: '배송 중', price: '34,900원', date: '오늘 도착 예정' },
  { id: 'ORD-03', title: 'GaN 65W 초고속 충전기', status: '결제 완료', price: '42,000원', date: '내일 출발 예정' },
];

export function BackNavigationDemo() {
  const [depth, setDepth] = useState<0 | 1 | 2>(1);
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord>(ORDERS[0]);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (depth === 0) return;
    setDragStartX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX === null) return;
    const diff = e.clientX - dragStartX;
    if (diff > 0) {
      setDragOffset(Math.min(diff, 180));
    }
  };

  const handlePointerUp = () => {
    if (dragStartX === null) return;
    if (dragOffset > 75 && depth > 0) {
      setDepth((d) => (d > 0 ? ((d - 1) as 0 | 1 | 2) : 0));
    }
    setDragStartX(null);
    setDragOffset(0);
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative h-full w-full overflow-hidden bg-[#E5E8EB] select-none"
    >
      {/* Depth 0: MY 홈 */}
      <div
        className={`absolute inset-0 bg-[#F2F4F6] p-4 transition-transform duration-300 ${
          depth >= 1 ? '-translate-x-10 brightness-95' : 'translate-x-0'
        }`}
      >
        <h3 className="px-1 text-lg font-extrabold text-[#191F28]">마이페이지</h3>
        <div className="mt-3 space-y-2.5">
          <button
            type="button"
            onClick={() => setDepth(1)}
            className="flex w-full items-center justify-between rounded-2xl bg-white p-4 text-left shadow-sm hover:bg-[#F9FAFB]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#3182F6]">
                <Package className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#191F28]">주문 내역</p>
                <p className="text-[11px] text-[#8B95A1]">진행 중인 주문 {ORDERS.length}건</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-[#8B95A1]" />
          </button>
        </div>
      </div>

      {/* Depth 1: 주문 내역 */}
      <div
        style={{
          transform:
            depth === 1
              ? `translateX(${dragOffset}px)`
              : depth > 1
                ? 'translateX(-36px)'
                : 'translateX(100%)',
        }}
        className={`absolute inset-0 bg-white shadow-[-10px_0_24px_rgba(25,31,40,0.12)] transition-transform ${
          dragStartX ? 'duration-0' : 'duration-300 ease-out'
        }`}
      >
        <header className="flex items-center justify-between border-b border-[#F2F4F6] px-3 py-3">
          <button
            type="button"
            onClick={() => setDepth(0)}
            className="flex items-center gap-0.5 rounded-lg px-1.5 py-1 text-xs font-semibold text-[#3182F6] hover:bg-[#E8F3FF]"
          >
            <ChevronLeft className="h-4 w-4" />
            마이페이지
          </button>
          <span className="text-[11px] text-[#8B95A1]">우측으로 드래그해 뒤로</span>
        </header>

        <div className="p-4">
          <h3 className="text-lg font-extrabold text-[#191F28]">주문 내역</h3>
          <div className="mt-3 space-y-2.5">
            {ORDERS.map((order) => (
              <button
                key={order.id}
                type="button"
                onClick={() => {
                  setSelectedOrder(order);
                  setDepth(2);
                }}
                className="flex w-full items-center justify-between rounded-2xl bg-[#F2F4F6] p-3.5 text-left transition-colors hover:bg-[#E8F3FF]/70"
              >
                <div className="flex items-center gap-3">
                  <span className="h-8 w-8 rounded-xl bg-[#BDDAFF]" />
                  <div>
                    <p className="text-xs font-bold text-[#191F28]">{order.title}</p>
                    <p className="mt-0.5 text-[11px] text-[#4E5968]">
                      {order.status} · {order.price}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#8B95A1]" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Depth 2: 주문 상세 */}
      <div
        style={{
          transform: depth === 2 ? `translateX(${dragOffset}px)` : 'translateX(100%)',
        }}
        className={`absolute inset-0 bg-white shadow-[-10px_0_24px_rgba(25,31,40,0.14)] transition-transform ${
          dragStartX ? 'duration-0' : 'duration-300 ease-out'
        }`}
      >
        <header className="flex items-center justify-between border-b border-[#F2F4F6] px-3 py-3">
          <button
            type="button"
            onClick={() => setDepth(1)}
            className="flex items-center gap-0.5 rounded-lg px-1.5 py-1 text-xs font-semibold text-[#3182F6] hover:bg-[#E8F3FF]"
          >
            <ChevronLeft className="h-4 w-4" />
            주문 내역
          </button>
          <span className="text-[11px] font-semibold text-[#8B95A1]">{selectedOrder.id}</span>
        </header>

        <div className="p-5 space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F3FF] px-3 py-1 text-xs font-bold text-[#3182F6]">
            <Truck className="h-3.5 w-3.5" />
            {selectedOrder.status}
          </div>
          <div>
            <h4 className="text-base font-extrabold text-[#191F28]">{selectedOrder.title}</h4>
            <p className="mt-1 text-sm font-bold text-[#3182F6]">{selectedOrder.price}</p>
            <p className="mt-1 text-xs text-[#8B95A1]">{selectedOrder.date}</p>
          </div>

          <div className="rounded-2xl bg-[#F2F4F6] p-4 text-xs text-[#4E5968] leading-relaxed">
            상단 <strong className="text-[#191F28]">&lsaquo; 주문 내역</strong> 버튼을 누르거나 화면을
            오른쪽으로 드래그하면 이전 스택으로 자연스럽게 복귀합니다.
          </div>
        </div>
      </div>
    </div>
  );
}
