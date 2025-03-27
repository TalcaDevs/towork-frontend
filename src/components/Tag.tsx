import React from "react";
import { TagProps } from "../interfaces/tag.interface";

const Tag: React.FC<TagProps> = ({ label }) => {
  return (
    <span className="inline-block bg-blue-300 rounded-full px-3 py-1 text-sm font-semibold text-black">
      #{label}
    </span>
  );
};

export default Tag;
