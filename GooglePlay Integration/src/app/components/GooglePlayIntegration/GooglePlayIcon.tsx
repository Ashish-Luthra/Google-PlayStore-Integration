import svgPaths from '@/imports/svg-b11ecc1lfz';

export function GooglePlayIcon() {
  return (
    <div className="relative shrink-0 size-9" aria-hidden="true">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 36 36"
        role="img"
        aria-label="Google Play"
      >
        <g clipPath="url(#clip0_google_play)">
          <path d={svgPaths.pdc0c300} fill="#2196F3" />
          <path d={svgPaths.p2afaea80} fill="#FFC107" />
          <path d={svgPaths.p3b6b9c10} fill="#4CAF50" />
          <path d={svgPaths.p2c94b180} fill="#F44336" />
        </g>
        <defs>
          <clipPath id="clip0_google_play">
            <rect fill="white" height="36" width="36" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
