import Image from "next/image";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={compact ? "brand-mark brand-mark--compact" : "brand-mark"}
    >
      <Image
        src="/brand/greyson-icon-color.png"
        alt="Greyson Institute GI monogram"
        width={413}
        height={379}
        sizes={compact ? "66px" : "190px"}
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
      <Image
        src={
          inverse
            ? "/brand/greyson-horizontal-light.png"
            : "/brand/greyson-horizontal-dark.png"
        }
        alt="Greyson Institute — Real Estate Education"
        width={1680}
        height={358}
        sizes="(max-width: 640px) 210px, (max-width: 980px) 285px, 390px"
        className="brand-lockup__image"
      />
    </span>
  );
}
