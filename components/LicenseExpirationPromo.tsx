import Link from "next/link";

type LicenseExpirationPromoProps = {
  eyebrow?: string;
  title?: string;
  text?: string;
};

export function LicenseExpirationPromo({
  eyebrow = "CHECK YOUR LICENSE",
  title = "Not sure when your Florida real estate license expires?",
  text = "Check your official license record before choosing your renewal education. Your expiration date, license type, status, and renewal history can all affect which requirement applies.",
}: LicenseExpirationPromoProps) {
  return (
    <div className="license-expiration-promo">
      <style>
        {`
          .license-expiration-promo {
            background: #1f2d30;
            color: #f5f0e7;
            padding: clamp(30px, 5vw, 46px);
            display: grid;
            grid-template-columns:
              minmax(0, 1fr) minmax(190px, auto);
            gap: 34px;
            align-items: center;
          }

          .license-expiration-promo__content {
            min-width: 0;
          }

          .license-expiration-promo__title {
            color: #f5f0e7;
            font-size: clamp(1.9rem, 4vw, 2.8rem);
            max-width: 720px;
            margin-bottom: 14px;
            overflow-wrap: anywhere;
          }

          .license-expiration-promo__text {
            color: rgba(245, 240, 231, 0.8);
            max-width: 760px;
            margin: 0;
            line-height: 1.7;
          }

          .license-expiration-promo__button {
            min-height: 52px;
            padding: 0 22px;
            border: 1px solid rgba(245, 240, 231, 0.7);
            color: #f5f0e7;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: 14px;
            font-weight: 650;
            letter-spacing: 0.035em;
            text-decoration: none;
            white-space: normal;
            transition:
              transform 0.2s ease,
              background-color 0.2s ease,
              color 0.2s ease,
              border-color 0.2s ease,
              box-shadow 0.2s ease;
          }

          @media (hover: hover) and (pointer: fine) {
            .license-expiration-promo__button:hover {
              background: #f5f0e7;
              border-color: #f5f0e7;
              color: #111717;
              transform: translateY(-3px);
              box-shadow: 0 14px 30px rgba(0, 0, 0, 0.18);
            }
          }

          @media (max-width: 700px) {
            .license-expiration-promo {
              grid-template-columns: 1fr;
              gap: 24px;
            }

            .license-expiration-promo__button {
              width: 100%;
            }
          }
        `}
      </style>

      <div className="license-expiration-promo__content">
        <p className="eyebrow eyebrow--light">{eyebrow}</p>

        <h2 className="license-expiration-promo__title">{title}</h2>

        <p className="license-expiration-promo__text">{text}</p>
      </div>

      <div>
        <Link
          className="license-expiration-promo__button"
          href="/check-florida-real-estate-license-expiration"
        >
          Check My License Expiration →
        </Link>
      </div>
    </div>
  );
}
