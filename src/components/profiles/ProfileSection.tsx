import React from "react";
import BentoWhiteBox from "../ui/BentoWhiteBox";
import Title from "../ui/Title";

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ title, children }) => (
  <BentoWhiteBox>
    <Title
      size="xs"
      weight="semibold"
      color="primary"
      margin="sm"
      textAlign="left"
    >
      {title}
    </Title>
    {children}
  </BentoWhiteBox>
);

export default ProfileSection;
