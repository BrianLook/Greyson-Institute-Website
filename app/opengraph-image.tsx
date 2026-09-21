import { ImageResponse } from "next/og";

export const alt =
  "Greyson Institute — Real Estate Education";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f5f0e7",
          padding: "54px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#fbf8f2",
            border: "2px solid #9b7a52",
            padding: "66px 72px",
          }}
        >
          <div
            style={{
              width: "68%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <img
              src="https://greysoninstitute.com/brand/greyson-horizontal-dark.png"
              alt=""
              width="480"
              height="125"
              style={{
                objectFit: "contain",
                objectPosition: "left center",
              }}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "58px",
                  lineHeight: 1.05,
                  letterSpacing: "-1.5px",
                  color: "#111717",
                  maxWidth: "700px",
                }}
              >
                A clearer path through real estate education.
              </div>

              <div
                style={{
                  marginTop: "34px",
                  width: "86px",
                  height: "4px",
                  background: "#9b7a52",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                fontFamily: "Arial, sans-serif",
                fontSize: "18px",
                letterSpacing: "3px",
                color: "#1f2d30",
                textTransform: "uppercase",
              }}
            >
              Licensing · Post-License · Continuing Education · Broker
            </div>
          </div>

          <div
            style={{
              width: "1px",
              height: "72%",
              background: "#d8c9b5",
            }}
          />

          <div
            style={{
              width: "24%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="https://greysoninstitute.com/brand/greyson-icon-color.png"
              alt=""
              width="190"
              height="190"
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
