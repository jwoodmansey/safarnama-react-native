import { useEffect, useRef } from "react";

const useRenderCount = (name: string) => {
  const renderCount = useRef(0);
  useEffect(() => {
    console.log(`[Render count] - ${name}`, renderCount.current);
    renderCount.current = renderCount.current + 1;
  });
};

export default useRenderCount;
