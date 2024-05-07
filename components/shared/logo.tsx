import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="text-2xl font-bold font-mono">
      Todos<span className="text-red-500">Logo</span>
    </Link>
  );
};

export default Logo;
