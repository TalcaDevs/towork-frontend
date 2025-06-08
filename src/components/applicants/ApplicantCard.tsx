import React from 'react';
import { Link } from 'react-router-dom';
import Tag from '../Tag';
import { PublicProfileInfo } from '../../services/interface/profile.interface';

interface ApplicantCardProps {
  profile: PublicProfileInfo;
}

const ApplicantCard: React.FC<ApplicantCardProps> = ({ profile }) => {
  const skills = Array.isArray(profile.skills)
    ? profile.skills
        .map((s: any) =>
          typeof s === 'string' ? s : s.skill?.name || s.name
        )
        .filter(Boolean)
    : [];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col">
      <div className="flex items-center gap-4">
        {profile.profile_photo && (
          <img
            src={profile.profile_photo}
            alt={`${profile.first_name} ${profile.last_name}`}
            className="w-16 h-16 rounded-full object-cover"
          />
        )}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {profile.first_name} {profile.last_name}
          </h3>
          {profile.role && (
            <p className="text-sm text-gray-500">{profile.role}</p>
          )}
          {profile.location && (
            <p className="text-sm text-gray-500">{profile.location}</p>
          )}
        </div>
      </div>
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {skills.slice(0, 3).map((skill, index) => (
            <Tag key={index} label={skill} />
          ))}
          {skills.length > 3 && (
            <span className="text-xs text-gray-500">
              +{skills.length - 3} más
            </span>
          )}
        </div>
      )}
      <Link
        to={`/profile/${profile.id}`}
        className="mt-4 text-sm text-blue-600 hover:underline font-medium"
      >
        Ver perfil
      </Link>
    </div>
  );
};

export default ApplicantCard;
