import React, { useMemo, useState } from 'react';
import { toolsList } from '@data/tools';

type Tool = { src: string; alt: string };

const ToolIcon = React.memo(function ToolIcon({ src, alt }: Tool) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      role="listitem"
      tabIndex={0}
      aria-label={alt}
      className="flex-shrink-0 w-16 h-16 bg-card border border-border rounded-xl flex items-center justify-center p-3 group hover:border-primary hover:shadow-lg hover:scale-110 transition-all duration-300"
    >
      {!errored ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
          onError={() => setErrored(true)}
        />
      ) : (
        <span className="text-xs font-medium text-muted-foreground text-center px-2">{alt}</span>
      )}
    </div>
  );
});

export default function ToolsCarousel() {
  const [paused, setPaused] = useState(false);

  const rows: Tool[][] = useMemo((): Tool[][] => {
    const mid: number = Math.ceil(toolsList.length / 2);
    const first: Tool[] = [...toolsList.slice(0, mid), ...toolsList.slice(0, mid)];
    const second: Tool[] = [...toolsList.slice(mid), ...toolsList.slice(mid)];
    return [first, second];
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-6">
      {rows.map((rowTools: Tool[], idx: number) => (
        <div key={idx} className="relative overflow-hidden w-full" role="list">
          <div className="edge-fade-left" aria-hidden="true"></div>
          <div className="edge-fade-right" aria-hidden="true"></div>

          <div
            className="flex gap-6 w-max marquee"
            style={{ animationPlayState: paused ? 'paused' : 'running' }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            {rowTools.map((tool, i) => (
              <ToolIcon key={`${tool.src}-${i}`} src={tool.src} alt={tool.alt} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
