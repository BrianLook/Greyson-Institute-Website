export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={compact ? "brand-mark brand-mark--compact" : "brand-mark"}
    >
      <img
        src="/brand/greyson-icon-color.png"
        alt="Greyson Institute GI monogram"
        className="brand-mark__image"
      />
    </span>
  );
}

export function BrandLockup({ inverse = false }: { inverse?: boolean }) {
  return (
    <span
      className={
        inverse
          ? "brand-lockup brand-lockup--inverse"
          : "brand-lockup"
      }
    >
      <img
        src={
          inverse
            ? "/brand/greyson-horizontal-light.png"
            : "/brand/greyson-horizontal-dark.png"
        }
        alt="Greyson Institute — Real Estate Education"
        className="brand-lockup__image"
      />
    </span>
  );
}
