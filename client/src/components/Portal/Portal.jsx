import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children, id }) => {
  const portalElement = useRef(null);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const elementId =
        id ?? `portal_${Math.random().toString(36).substr(2, 11)}`;
      portalElement.current = document.createElement("div");
      portalElement.current.id = elementId;
      document.body.appendChild(portalElement.current);
      setMount(true);
    }

    return () => {
      portalElement.current.parentElement.removeChild(portalElement.current);
      setMount(false);
    };
  }, [id]);

  return mount ? createPortal(children, portalElement.current) : null;
};

export default Portal;
