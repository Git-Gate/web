import {useEffect, useRef} from "react";

export default function usePrevious(value: any): any {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
