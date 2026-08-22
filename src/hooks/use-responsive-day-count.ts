import { useEffect, useState } from "react";

const BREAKPOINTS: [minWidth: number, count: number][] = [
  [1280, 7],
  [1024, 5],
  [0, 3],
];

function computeDayCount(width: number): number {
  for (const [minWidth, count] of BREAKPOINTS) {
    if (width >= minWidth) return count;
  }
  return 3;
}

export function useResponsiveDayCount(): number {
  const [count, setCount] = useState(7);

  useEffect(() => {
    function update() {
      setCount(computeDayCount(window.innerWidth));
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}
