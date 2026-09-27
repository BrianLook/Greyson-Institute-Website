import type { Metadata } from "next";
import { FindMyPath } from "@/components/FindMyPath";

export const metadata: Metadata = {
  title: "Find My Exact Florida Real Estate Education Path",
  description:
    "Use your Florida DBPR license record and a few simple answers to find the real estate education requirement that most likely applies next.",
};

export default function FindMyPathPage() {
  return (
    <section
      className="page-hero"
      style={{
        paddingTop:
          "clamp(56px, 9vw, 110px)",
        paddingBottom:
          "clamp(80px, 12vw, 140px)",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "880px",
          minWidth: 0,
        }}
      >
        <FindMyPath />
      </div>
    </section>
  );
}
