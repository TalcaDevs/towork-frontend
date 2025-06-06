import React, { ReactNode } from "react";

const Space8 = ({ children }: Space8Props) => {
  return <div className="space-y-8">{children}</div>;
};

export default Space8;

interface Space8Props {
  children: ReactNode;
}
