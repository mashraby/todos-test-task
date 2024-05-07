import { Children } from "@/types";
import React from "react";

const Container = ({ children }: Children) => {
  return <div className="container mx-auto px-4">{children}</div>;
};

export default Container;
