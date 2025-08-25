import React, { useState } from 'react';

type TIcon = { src: string; alt: string };

const Icon = React.memo(function Icon({ src, alt }: TIcon) {
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

interface Props {
  readonly icons: TIcon[];
}

export default function Carousel({ icons }: Props) {
  const [paused, setPaused] = useState(false);

  return (
    <div className="relative overflow-hidden w-full" role="list">
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
        {icons.map((tool, i) => (
          <Icon key={`${tool.src}-${i}`} src={tool.src} alt={tool.alt} />
        ))}
      </div>
    </div>
  );
}
