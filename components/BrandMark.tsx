export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "brand-mark brand-mark--compact" : "brand-mark"} aria-label="Greyson Institute GI monogram">
      <span className="brand-mark__g">G</span>
      <span className="brand-mark__column" aria-hidden="true">
        <i className="column-cap-top" />
        <i className="column-cap" />
        <i className="column-shaft"><b/><b/><b/></i>
        <i className="column-base" />
        <i className="column-base-bottom" />
      </span>
    </div>
  );
}

export function BrandLockup({ inverse = false }: { inverse?: boolean }) {
  return (
    <div className={inverse ? "brand-lockup brand-lockup--inverse" : "brand-lockup"}>
      <BrandMark compact />
      <span className="brand-divider" aria-hidden="true" />
      <span className="brand-type">
        <strong>GREYSON INSTITUTE</strong>
        <small>REAL ESTATE EDUCATION</small>
      </span>
    </div>
  );
}
