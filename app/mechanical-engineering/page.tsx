import { ServiceDetail } from "@/components/ServiceDetail";

export const metadata = {
  title: "Mechanical Engineering Services",
  description: "Mechanical design services for new product development, CAD, sheet metal, plastics, SPM design, prototyping, and production support."
};

export default function MechanicalEngineeringPage() {
  return <ServiceDetail slug="mechanical-engineering" />;
}
