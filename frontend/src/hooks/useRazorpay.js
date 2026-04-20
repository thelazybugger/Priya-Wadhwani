import { useCallback } from "react";

const SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

export default function useRazorpay() {
  const load = useCallback(
    () =>
      new Promise((resolve) => {
        if (typeof window === "undefined") return resolve(false);
        if (window.Razorpay) return resolve(true);
        const script = document.createElement("script");
        script.src = SCRIPT_SRC;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      }),
    []
  );
  return load;
}
