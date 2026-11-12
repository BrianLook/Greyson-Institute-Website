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
          <p className="eyebrow">OFFERS FROM OUR EDUCATION PARTNER</p>
          <h2>Explore current course promotions.</h2>
          <p>
            Find online real estate education offers through our partner,
            The CE Shop.
          </p>
          <p className="ce-shop-automated-promo__disclosure">
            Education provided by The CE Shop. Offers and eligibility are
            subject to The CE Shop&apos;s terms.
          </p>
        </div>

        <div className="ce-shop-automated-promo__media">
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
