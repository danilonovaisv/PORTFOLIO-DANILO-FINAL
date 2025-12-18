import { useReducedMotion } from "framer-motion";

const usePrefersReducedMotion = () => {
  const shouldReduceMotion = useReducedMotion();
  return shouldReduceMotion;
};

export default usePrefersReducedMotion;
