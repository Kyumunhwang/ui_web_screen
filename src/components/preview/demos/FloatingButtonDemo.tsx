import { useState } from 'react';
import { MessageSquare, Plus, Send, X } from 'lucide-react';

interface NotePost {
  id: number;
  title: string;
  time: string;
}

const INITIAL_POSTS: NotePost[] = [
  { id: 1, title: '프로덕트 디자인 주간 회고 공유합니다', time: '10분 전' },
  { id: 2, title: '모바일 입력폼 오류 메시지 개선 사례', time: '1시간 전' },
  { id: 3, title: '스크롤 시 플로팅 버튼 노출 기준 정리', time: '3시간 전' },
  { id: 4, title: '신규 온보딩 플로우 A/B 테스트 결과', time: '어제' },
  { id: 5, title: '아이콘 컬러 대비 가이드라인 업데이트', time: '2일 전' },
  { id: 6, title: '컴포넌트 네이밍 컨벤션 초안', time: '3일 전' },
];

export function FloatingButtonDemo() {
  const [posts, setPosts] = useState<NotePost[]>(INITIAL_POSTS);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [draftTitle, setDraftTitle] = useState('');

  const handlePublish = () => {
    const trimmed = draftTitle.trim();
    if (!trimmed) return;
    setPosts((prev) => [{ id: Date.now(), title: trimmed, time: '방금 전' }, ...prev]);
    setDraftTitle('');
    setIsComposerOpen(false);
  };

  return (
    <div className="relative flex h-full flex-col bg-[#F2F4F6]">
      {/* Header */}
      <header className="bg-white px-5 py-3.5 border-b border-[#E5E8EB]">
        <h3 className="text-[16px] font-bold text-[#191F28]">팀 피드 ({posts.length})</h3>
      </header>

      {/* Scrollable Feed */}
      <div className="custom-scrollbar flex-1 overflow-y-auto p-4 pb-24 space-y-2.5">
        {posts.map((post) => (
          <article
            key={post.id}
            className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-[0_1px_4px_rgba(25,31,40,0.03)]"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#3182F6]">
              <MessageSquare className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-[13px] font-bold leading-snug text-[#191F28]">{post.title}</h4>
              <p className="mt-1 text-[11px] text-[#8B95A1]">{post.time}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setIsComposerOpen(true)}
        className="absolute bottom-5 right-4 z-10 flex items-center gap-1.5 rounded-full bg-[#3182F6] px-4 py-3 text-[13px] font-bold text-white shadow-fab transition-all hover:bg-[#1B64DA] active:scale-95"
      >
        <Plus className="h-4 w-4 stroke-[2.5]" />
        새 글 쓰기
      </button>

      {/* Bottom Sheet Composer */}
      {isComposerOpen && (
        <div className="absolute inset-0 z-20 flex flex-col justify-end bg-[#191F28]/45">
          <div className="rounded-t-3xl bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3">
              <h4 className="text-sm font-bold text-[#191F28]">새 글 작성</h4>
              <button
                type="button"
                onClick={() => setIsComposerOpen(false)}
                className="rounded-lg p-1 text-[#8B95A1] hover:bg-[#F2F4F6]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <input
              type="text"
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handlePublish();
              }}
              placeholder="공유할 내용을 간단히 적어주세요"
              autoFocus
              className="w-full rounded-xl border border-[#E5E8EB] bg-[#F9FAFB] px-3.5 py-2.5 text-xs text-[#191F28] placeholder:text-[#8B95A1] focus:border-[#3182F6] focus:bg-white focus:outline-none"
            />
            <button
              type="button"
              onClick={handlePublish}
              disabled={!draftTitle.trim()}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#3182F6] py-2.5 text-xs font-bold text-white disabled:opacity-40 hover:bg-[#1B64DA]"
            >
              <Send className="h-3.5 w-3.5" />
              등록하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
