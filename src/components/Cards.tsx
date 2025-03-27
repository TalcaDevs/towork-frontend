import React from "react";
import { CardProps } from "../interfaces/cards.interface";
import ClockIcon from "../assets/icons/ClockIcon";
import Tag from "./Tag";
import LikesIcon from "../assets/icons/LikesIcon";

interface ExtendedCardProps extends CardProps {
  className?: string;
}

const Cards: React.FC<ExtendedCardProps> = ({
  id,
  title,
  tags,
  hoursAgo,
  description,
  imageUrl,
  author,
  likes,
  className = "",
}) => {
  return (
    <div
      className={`bg-[#f6f7f9] rounded-lg shadow-md overflow-hidden ${className}`}
    >
      {imageUrl && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {description && <p className="mt-2 text-black">{description}</p>}
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Tag key={`${id}-tag-${index}`} label={tag} />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-black text-sm">
          <div className="flex items-center">
            <ClockIcon className="w-5 h-5 mr-1 text-gray-400" />
            <span>
              {hoursAgo} {hoursAgo === 1 ? "hora" : "horas"}{" "}
            </span>
          </div>
          {author && <div>By {author}</div>}
          {likes !== undefined && (
            <div className="flex items-center">
              <span className="mr-1">{likes}</span>
              <LikesIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cards;
