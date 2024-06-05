import { HoverEffect } from "../components/ui/card-hover-effect";

export default function Dashboard() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Wallets",
    description:
      "DESCRIPTION",
    link: "/wallets",
  },
  {
    title: "Cards",
    description:
      "DESCRIPTION",
    link: "/cards",
  },
  {
    title: "Transactions",
    description:
      "DESCRIPTION",
    link: "/transactions",
  },
  {
    title: "Categories",
    description:
      "DESCRIPTION",
    link: "/categories",
  },
];