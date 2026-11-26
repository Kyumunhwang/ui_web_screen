import { ReactNode, useState } from 'react';
import { Monitor, RotateCcw, Smartphone, Sparkles, Wifi, Battery } from 'lucide-react';
import { ScreenPattern } from '../../data/screenPatterns';

interface DeviceFrameProps {
  pattern: ScreenPattern;
  children: (resetKey: number) => ReactNode;
}

export function DeviceFrame({ pattern, children }: DeviceFrameProps) {
  const [viewport, setViewport] = useState<'mobile' | 'desktop'>('mobile');
  const [resetKey, setResetKey] = useState(0);

  const effectiveViewport = pattern.supportsViewportSwitch ? viewport : 'mobile';

  return (
    <div className="flex flex-col items-center">
      {/* Toolbar */}
      <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-2 rounded-2xl bg-white px-4 py-2.5 shadow-card">
        <div className="flex items-center gap-2 text-xs font-medium text-[#4E5968]">
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#3182F6]" />
          <span>{pattern.interactionHint}</span>
        </div>

        <div className="flex items-center gap-1.5">
          {pattern.supportsViewportSwitch && (
            <div className="flex items-center rounded-xl bg-[#F2F4F6] p-0.5">
              <button
                type="button"
                onClick={() => setViewport('mobile')}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                  effectiveViewport === 'mobile'
                    ? 'bg-white text-[#191F28] shadow-sm'
                    : 'text-[#8B95A1] hover:text-[#4E5968]'
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" />
                모바일
              </button>
              <button
                type="button"
                onClick={() => setViewport('desktop')}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                  effectiveViewport === 'desktop'
                    ? 'bg-white text-[#191F28] shadow-sm'
                    : 'text-[#8B95A1] hover:text-[#4E5968]'
                }`}
              >
                <Monitor className="h-3.5 w-3.5" />
                웹
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setResetKey((k) => k + 1)}
            title="데모 상태 초기화"
            className="flex items-center gap-1 rounded-xl bg-[#F2F4F6] px-2.5 py-1.5 text-xs font-semibold text-[#4E5968] transition-colors hover:bg-[#E5E8EB] hover:text-[#191F28]"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            초기화
          </button>
        </div>
      </div>

      {/* Interactive Device Container */}
      <div
        className={`relative w-full overflow-hidden bg-white transition-all duration-300 ${
          effectiveViewport === 'mobile'
            ? 'max-w-[360px] rounded-[36px] border-[6px] border-[#191F28] shadow-device'
            : 'max-w-[540px] rounded-2xl border border-[#E5E8EB] shadow-cardHover'
        }`}
      >
        {/* Status Bar / Window Chrome */}
        {effectiveViewport === 'mobile' ? (
          <div className="flex items-center justify-between bg-white px-6 pt-2.5 pb-1.5 text-[11px] font-bold text-[#191F28] select-none">
            <span>9:41</span>
            <div className="h-3.5 w-16 rounded-full bg-[#191F28]" />
            <div className="flex items-center gap-1.5 text-[#191F28]">
              <Wifi className="h-3 w-3" />
              <Battery className="h-3.5 w-3.5" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 border-b border-[#E5E8EB] bg-[#F9FAFB] px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
            </div>
            <div className="ml-2 flex-1 rounded-md bg-white px-3 py-1 text-[11px] text-[#8B95A1] border border-[#E5E8EB]">
              demo.toss-patterns.kr/{pattern.id}
            </div>
          </div>
        )}

        {/* Demo Viewport */}
        <div className="relative h-[510px] w-full overflow-hidden bg-[#F2F4F6]">
          {children(resetKey)}
        </div>

        {/* Mobile Home Indicator */}
        {effectiveViewport === 'mobile' && (
          <div className="flex justify-center bg-white py-2">
            <div className="h-1 w-28 rounded-full bg-[#191F28]/20" />
          </div>
        )}
      </div>
    </div>
  );
}
