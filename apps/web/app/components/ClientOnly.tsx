"use client";
import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const ClientOnly: React.FC<Props> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

export default ClientOnly;

// The ClientOnly component in a Next.js app serves a specific purpose:
// it ensures that its children components are only rendered on the client side
// (in the browser) and not during server-side rendering (SSR). This is particularly
// useful in situations where a component relies on browser-specific features that are
// not available or do not make sense on the server, such as accessing the window or
// document objects, or when dealing with user interactions that can only happen in the browser.