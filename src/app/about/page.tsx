"use client";
import React from "react";
import { AnimatedTooltip } from "../components/ui/animated-tooltip";
const people = [
  {
    id: 1,
    name: "Alexander Videnov",
    designation: "github.com/AlexVidenov1",
    image:
      "https://avatars.githubusercontent.com/u/156410476?v=4",
  },
  {
    id: 2,
    name: "Konstantin Ivanov",
    designation: "github.com/dnrubinart",
    image:
      "https://avatars.githubusercontent.com/u/149817407?v=4",
  },
  {
    id: 3,
    name: "Radostin Mihaylov",
    designation: "github.com/radoooo11",
    image:
      "https://avatars.githubusercontent.com/u/95418840?v=4",
  },
];

export default function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center h-screen">
      <AnimatedTooltip items={people} />
    </div>
  );
}