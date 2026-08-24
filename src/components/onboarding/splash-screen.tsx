"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

export function SplashScreen({ onDone }: { onDone: () => void }) {
  const { theme } = useTheme();
  const wordmarkSrc = theme === "dark" ? "/brand/wordmark-light.svg" : "/brand/wordmark-dark.svg";

  const [markIn, setMarkIn] = useState(false);
  const [wordmarkIn, setWordmarkIn] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setMarkIn(true), 50);
    const t2 = setTimeout(() => setWordmarkIn(true), 500);
    const t3 = setTimeout(() => setLeaving(true), 1700);
    const t4 = setTimeout(onDone, 2150);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onDone]);

  return (
    <div
      role="presentation"
      onClick={onDone}
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 motion-reduce:transition-none",
        leaving ? "opacity-0" : "opacity-100",
      )}
    >
      <div className="flex items-center gap-3">
        <Image
          src="/brand/mark.svg"
          alt=""
          width={48}
          height={58}
          priority
          className={cn(
            "h-11 w-auto transition-all duration-500 ease-out motion-reduce:transition-none sm:h-14",
            markIn ? "scale-100 opacity-100" : "scale-90 opacity-0",
          )}
        />
        <Image
          src={wordmarkSrc}
          alt="a-genda"
          width={224}
          height={70}
          priority
          className={cn(
            "h-8 w-auto transition-all duration-500 ease-out motion-reduce:transition-none sm:h-10",
            wordmarkIn ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0",
          )}
        />
      </div>
    </div>
  );
}
