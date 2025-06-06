import React from "react";
import { ExtendedCardProps } from "../interfaces/cards.interface";
import ClockIcon from "../assets/icons/ClockIcon";
import Tag from "./Tag";
import LikesIcon from "../assets/icons/LikesIcon";

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
  const placeholderImageUrl = "https://placehold.co/600x400/e2e8f0/1e293b?text=ToWork";

  return (
    <div
      className={`bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md ${className}`}
    >
      {/* Imagen */}
      {imageUrl && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={imageUrl !== "#" ? imageUrl : placeholderImageUrl}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Contenido */}
      <div className="p-5">
        {/* Título */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h3>
        
        {/* Descripción */}
        {description && (
          <p className="mt-2 text-gray-600 text-sm md:text-base line-clamp-3 mb-3">
            {description}
          </p>
        )}
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <Tag 
              key={`${id}-tag-${index}`} 
              label={tag} 
            />
          ))}
        </div>
        
        {/* Footer con metadata */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-gray-500 text-sm">
          {/* Tiempo */}
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4 text-gray-400" />
            <span>
              {hoursAgo} {hoursAgo === 1 ? "hora" : "horas"}
            </span>
          </div>
          
          {/* Autor y Likes */}
          <div className="flex items-center gap-4">
            {author && (
              <div className="text-gray-600 font-medium">
                <span className="hidden sm:inline">Por </span>{author}
              </div>
            )}
            
            {likes !== undefined && (
              <div className="flex items-center gap-1 hover:scale-105 transition-transform cursor-pointer">
                <span>{likes}</span>
                <LikesIcon />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;