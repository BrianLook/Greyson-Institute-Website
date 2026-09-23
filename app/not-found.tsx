import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section
      className="page-hero"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "820px",
          textAlign: "center",
          display: "grid",
          justifyItems: "center",
          minWidth: 0,
        }}
      >
        <Image
          src="/brand/greyson-icon-color.png"
          alt=""
          aria-hidden="true"
          width={82}
          height={82}
          sizes="82px"
          style={{
            width: "82px",
            height: "auto",
            display: "block",
            marginBottom: "26px",
          }}
        />

        <p className="eyebrow">PAGE NOT FOUND · 404</p>

        <h1
          style={{
            maxWidth: "760px",
            marginBottom: "24px",
            overflowWrap: "anywhere",
          }}
        >
          Looks like this path doesn’t lead where you expected.
        </h1>

        <p
          className="page-lead"
          style={{
            maxWidth: "620px",
            margin: "0 auto",
          }}
        >
          The page you’re looking for may have moved, changed, or may no longer
          be available. We can help you get back on the right path.
        </p>

        <div
          className="button-row"
          style={{
            justifyContent: "center",
            marginTop: "38px",
          }}
        >
          <Link className="button" href="/">
            Return Home
          </Link>

          <Link
            href="/courses"
            style={{
              minHeight: "48px",
              padding: "0 20px",
              border: "1px solid #111717",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            Explore Courses
          </Link>
        </div>
      </div>
    </section>
  );
}
