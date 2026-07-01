import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Need technical support or have a new project? Contact Texawave today to speak with our engineering team about custom hardware, software, and AI solutions."
};

export default function ContactLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
