import { useEffect, useRef } from "react";

function useFocusOnMount<Element extends HTMLElement>() {

    const ref = useRef<Element>(null);

    useEffect(() => {
      if (ref.current) {
        ref.current.focus();
      }
    }, [ref]);

    return ref;

}

export default useFocusOnMount;