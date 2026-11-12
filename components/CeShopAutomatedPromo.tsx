"use client";

import { trackCeShopClick } from "@/lib/affiliate-analytics";

/**
 * The CE Shop's official auto-updating promotion images.
 * The partner asset instructions require keeping the original image URLs and
 * replacing only YOUR-URL with Greyson Institute's co-branded URL.
 */
export function CeShopAutomatedPromo() {
  return (
    <section
      className="ce-shop-automated-promo"
      aria-label="Current course promotions from The CE Shop"
    >
      <div className="container ce-shop-automated-promo__inner">
        <div className="ce-shop-automated-promo__copy">
          <p className="eyebrow">CURRENT PARTNER OFFERS</p>
          <h2>Explore current course offers.</h2>
          <p className="ce-shop-automated-promo__description">
            See the latest savings on online real estate education through
            The CE Shop.
          </p>
          <p className="ce-shop-automated-promo__disclosure">
            Education provided by The CE Shop. Offers and eligibility
            are subject to provider terms.
          </p>
        </div>

        <div
          className="ce-shop-automated-promo__media"
          onClickCapture={() => trackCeShopClick("general_catalog", "automated_banner")}
        >
          <div className="ce-shop-automated-promo__wide">
            <a href="https://greyson.theceshop.com/" target="_blank">
              <img
                alt="Online Continuing Education"
                src="https://image.theceshop.com/image/promo-association-home-wide.gif"
              />
            </a>
          </div>

          <div className="ce-shop-automated-promo__compact">
            <a href="https://greyson.theceshop.com/" target="_blank">
              <img
                alt="Online Continuing Education"
                src="https://image.theceshop.com/image/promo-association-home.gif"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
