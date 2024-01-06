import { useEffect, useState } from "react";

export const useOrigin = () => {
  const [isMounted, setIsmounted] = useState<boolean>(false);

  useEffect(() => {
    setIsmounted(true);
  }, []);

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  if (!isMounted) {
    return null;
  }

  return origin;
};
