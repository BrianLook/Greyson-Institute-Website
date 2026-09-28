import type { Metadata } from "next";
import { FindMyPath } from "@/components/FindMyPath";

export const metadata: Metadata = {
  title: "Find My Exact Florida Real Estate Education Path",
  description:
    "Use your Florida DBPR license record and a few simple answers to find the real estate education requirement that most likely applies next.",
};

type FindMyPathPageProps = {
  searchParams: Promise<{
    intent?: string;
  }>;
};

export default async function FindMyPathPage({
  searchParams,
}: FindMyPathPageProps) {
  const params = await searchParams;

  const intent =
    params.intent === "14-hour-ce"
      ? "14-hour-ce"
      : undefined;

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
        <FindMyPath intent={intent} />
      </div>
    </section>
  );
}
