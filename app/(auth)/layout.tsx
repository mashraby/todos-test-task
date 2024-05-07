import { Children } from "@/types";
import React from "react";

const AuthLayout = ({ children }: Children) => {
  return (
    <>
      <section className="flex items-center justify-center h-[80vh]">
        {children}
      </section>
    </>
  );
};

export default AuthLayout;
