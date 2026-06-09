import { ServiceDetail } from "@/components/ServiceDetail";

export const metadata = {
  title: "Procurement Services",
  description: "Procurement services for electromechanical components, passives, semiconductors, oscillators, filters, RF, power, and optoelectronics."
};

export default function ProcurementPage() {
  return <ServiceDetail slug="procurement" />;
}
