import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Texawave’s commitment to technical excellence. We build cross-functional technology solutions across IoT, cloud infrastructure, and product design."
};

export default function AboutLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
