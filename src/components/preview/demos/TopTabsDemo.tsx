import { useState } from 'react';
import { Bookmark, Clock, Sparkles } from 'lucide-react';

const TAB_KEYS = ['추천', '팔로잉', '저장'] as const;
type TopTabKey = (typeof TAB_KEYS)[number];

interface FeedPost {
  id: number;
  tab: TopTabKey;
  title: string;
  author: string;
  readTime: string;
}

const POSTS: FeedPost[] = [
  {
    id: 1,
    tab: '추천',
    title: '모바일 내비게이션을 3초 만에 이해시키는 법',
    author: '프로덕트 디자인팀',
    readTime: '4분',
  },
  {
    id: 2,
    tab: '추천',
    title: 'Toss 스타일 마이크로 카피 작성 원칙 7가지',
    author: 'UX 라이터 이서연',
    readTime: '5분',
  },
  {
    id: 3,
    tab: '팔로잉',
    title: 'React 18 트랜지션으로 부드러운 탭 전환 구현하기',
    author: '프론트엔드 박준형',
    readTime: '6분',
  },
  {
    id: 4,
    tab: '팔로잉',
    title: '디자인 토큰 자동화 파이프라인 구축기',
    author: '디자인 시스템 랩',
    readTime: '7분',
  },
  {
    id: 5,
    tab: '저장',
    title: '사용자의 손가락 동선을 고려한 하단 탭 설계 가이드',
    author: '모바일 UX 연구소',
    readTime: '3분',
  },
  {
    id: 6,
    tab: '저장',
    title: '접근성을 해치지 않는 컬러 대비(#3182F6) 검증',
    author: 'A11y 워킹그룹',
    readTime: '4분',
  },
  {
    id: 7,
    tab: '저장',
    title: '스크롤 피로도를 줄이는 리스트 카드 밀도 기준',
    author: '프로덕트 디자인팀',
    readTime: '5분',
  },
];

export function TopTabsDemo() {
  const [activeTab, setActiveTab] = useState<TopTabKey>('저장');
  const [savedIds, setSavedIds] = useState<number[]>([5, 6, 7]);

  const activeIndex = TAB_KEYS.indexOf(activeTab);

  const visiblePosts =
    activeTab === '저장'
      ? POSTS.filter((p) => savedIds.includes(p.id))
      : POSTS.filter((p) => p.tab === activeTab);

  const toggleSave = (id: number) => {
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <div className="flex h-full flex-col bg-[#F2F4F6]">
      {/* Top Tabs Bar */}
      <div className="bg-white">
        <div role="tablist" aria-label="아티클 분류" className="relative grid grid-cols-3 border-b border-[#E5E8EB]">
          {TAB_KEYS.map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => setActiveTab(tab)}
                className={`py-3.5 text-sm transition-colors ${
                  isSelected
                    ? 'font-bold text-[#191F28]'
                    : 'font-medium text-[#8B95A1] hover:text-[#4E5968]'
                }`}
              >
                {tab}
                {tab === '저장' && (
                  <span className="ml-1 text-xs font-bold text-[#3182F6]">{savedIds.length}</span>
                )}
              </button>
            );
          })}
          <span
            className="absolute bottom-0 left-0 h-[2.5px] bg-[#3182F6] transition-transform duration-300 ease-out"
            style={{
              width: `${100 / TAB_KEYS.length}%`,
              transform: `translateX(${activeIndex * 100}%)`,
            }}
          />
        </div>
      </div>

      {/* Feed Content */}
      <div className="custom-scrollbar flex-1 overflow-y-auto p-4 space-y-2.5">
        <div className="flex items-center justify-between px-1 pb-1">
          <span className="flex items-center gap-1 text-xs font-semibold text-[#4E5968]">
            <Sparkles className="h-3.5 w-3.5 text-[#3182F6]" />
            {activeTab} 아티클 {visiblePosts.length}건
          </span>
          <span className="text-[11px] text-[#8B95A1]">북마크 아이콘 클릭 가능</span>
        </div>

        {visiblePosts.map((post) => {
          const isSaved = savedIds.includes(post.id);
          return (
            <article
              key={post.id}
              className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-[0_1px_4px_rgba(25,31,40,0.03)]"
            >
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E8F3FF] text-xs font-bold text-[#3182F6]">
                UX
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-[13px] font-bold leading-snug text-[#191F28]">{post.title}</h4>
                <div className="mt-1.5 flex items-center gap-2 text-[11px] text-[#8B95A1]">
                  <span>{post.author}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-0.5">
                    <Clock className="h-3 w-3" /> {post.readTime}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggleSave(post.id)}
                aria-label="저장 토글"
                className="rounded-lg p-1.5 text-[#8B95A1] transition-colors hover:bg-[#F2F4F6]"
              >
                <Bookmark
                  className={`h-4 w-4 ${
                    isSaved ? 'fill-[#3182F6] text-[#3182F6]' : 'text-[#8B95A1]'
                  }`}
                />
              </button>
            </article>
          );
        })}

        {visiblePosts.length === 0 && (
          <div className="rounded-2xl bg-white p-8 text-center">
            <p className="text-sm font-semibold text-[#4E5968]">저장한 글이 아직 없어요</p>
            <p className="mt-1 text-xs text-[#8B95A1]">
              추천 또는 팔로잉 탭에서 북마크를 눌러 추가해 보세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
