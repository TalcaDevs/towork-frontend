import React from "react";
import LinkedInIcon from "../../assets/icons/LinkedInIcon";
import ArrowRightIcon from "../../assets/icons/ArrowRightIcon";
import GitHubIcon from "../../assets/icons/GitHubIcon";

interface SocialLinksProps {
  linkedin?: string;
  portfolio?: string;
  github?: string;
  website?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  linkedin,
  portfolio,
  github,
  website,
}) => {
  return (
    <div className="space-y-2">
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <LinkedInIcon />
          LinkedIn
        </a>
      )}

      {portfolio && (
        <a
          href={portfolio}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
        >
          <ArrowRightIcon />
          Portfolio
        </a>
      )}

      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-700 transition-colors"
        >
          <GitHubIcon />
          GitHub
        </a>
      )}

      {website && (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          Website
        </a>
      )}
    </div>
  );
};

export default SocialLinks;
