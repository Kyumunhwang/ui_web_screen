import { useMemo, useState } from 'react';
import { Check, Code2, Copy, FileCode2 } from 'lucide-react';
import { ScreenPattern } from '../../data/screenPatterns';

interface CodeViewerProps {
  pattern: ScreenPattern;
}

type CodeTab = 'react' | 'vanilla';

const TOKEN_REGEX =
  /(\/\/.*$|\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->)|('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`)|\b(import|from|export|default|function|const|let|var|return|if|else|type|interface|typeof|new|true|false|null|undefined|async|await)\b|(<\/?[A-Za-z][A-Za-z0-9.-]*)/gm;

function highlightLine(line: string): JSX.Element[] {
  const parts: JSX.Element[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const regex = new RegExp(TOKEN_REGEX.source, 'g');

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <span key={`plain-${lastIndex}`} className="text-[#E5E8EB]">
          {line.slice(lastIndex, match.index)}
        </span>,
      );
    }

    const [full, comment, str, keyword, tag] = match;
    let colorClass = 'text-[#E5E8EB]';
    if (comment) colorClass = 'text-[#6B7684] italic';
    else if (str) colorClass = 'text-[#7EE787]';
    else if (keyword) colorClass = 'text-[#79C0FF] font-medium';
    else if (tag) colorClass = 'text-[#FFA657]';

    parts.push(
      <span key={`tok-${match.index}`} className={colorClass}>
        {full}
      </span>,
    );
    lastIndex = match.index + full.length;
  }

  if (lastIndex < line.length) {
    parts.push(
      <span key={`tail-${lastIndex}`} className="text-[#E5E8EB]">
        {line.slice(lastIndex)}
      </span>,
    );
  }

  if (parts.length === 0) {
    parts.push(<span key="empty">&nbsp;</span>);
  }

  return parts;
}

export function CodeViewer({ pattern }: CodeViewerProps) {
  const [activeTab, setActiveTab] = useState<CodeTab>('react');
  const [copied, setCopied] = useState(false);

  const code =
    activeTab === 'react' ? pattern.snippets.reactTailwind : pattern.snippets.vanillaHtml;

  const lines = useMemo(() => code.split('\n'), [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section
      aria-label="코드 스니펫 뷰어"
      className="flex h-full flex-col bg-[#191F28] text-white border-l border-[#2B3340]"
    >
      {/* Header & Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-1 rounded-xl bg-white/5 p-1">
          <button
            type="button"
            onClick={() => setActiveTab('react')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === 'react'
                ? 'bg-[#3182F6] text-white shadow-sm'
                : 'text-[#8B95A1] hover:text-white'
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            React + Tailwind
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('vanilla')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === 'vanilla'
                ? 'bg-[#3182F6] text-white shadow-sm'
                : 'text-[#8B95A1] hover:text-white'
            }`}
          >
            <FileCode2 className="h-3.5 w-3.5" />
            순수 HTML + CSS + JS
          </button>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
            copied
              ? 'bg-[#10B981] text-white'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              복사 완료!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              코드 복사
            </>
          )}
        </button>
      </div>

      {/* File Meta Bar */}
      <div className="flex items-center justify-between border-b border-white/5 bg-[#141922] px-4 py-2 text-[11px] text-[#8B95A1]">
        <span className="font-mono">
          {activeTab === 'react' ? `${pattern.id}.tsx` : `${pattern.id}.html`}
        </span>
        <span>{lines.length} lines</span>
      </div>

      {/* Code Content */}
      <div className="code-scrollbar flex-1 overflow-auto bg-[#141922] p-4 font-mono text-[12.5px] leading-[1.65]">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-white/[0.03]">
                <td className="w-9 select-none pr-4 text-right text-[11px] text-[#4E5968] align-top">
                  {idx + 1}
                </td>
                <td className="whitespace-pre text-[#E5E8EB]">{highlightLine(line)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
