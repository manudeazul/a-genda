"use client";

import { useEffect, useState } from "react";
import { SplashScreen } from "@/components/onboarding/splash-screen";
import { ProductTour } from "@/components/onboarding/product-tour";

const STORAGE_KEY = "a-genda:onboarded";

export function OnboardingController() {
  const [stage, setStage] = useState<"idle" | "splash" | "tour" | "done">("idle");

  useEffect(() => {
    try {
      const seen = window.localStorage.getItem(STORAGE_KEY);
      setStage(seen ? "done" : "splash");
    } catch {
      setStage("done");
    }
  }, []);

  function finishTour() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // localStorage indisponível — segue sem persistir.
    }
    setStage("done");
  }

  if (stage === "splash") return <SplashScreen onDone={() => setStage("tour")} />;
  if (stage === "tour") return <ProductTour onDone={finishTour} />;
  return null;
}
