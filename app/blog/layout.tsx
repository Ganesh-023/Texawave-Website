import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Insights & Blog",
  description:
    "Read the Texawave engineering blog for technical insights, hardware design guides, embedded systems deep-dives, and custom software development trends."
};

export default function BlogLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
