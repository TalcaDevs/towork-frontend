import UbicationIcon from "../assets/icons/UbicationIcon";
import Paragraph from "./ui/Paragraph";
import PhoneIcon from "../assets/icons/PhoneIcon";
import Studenticon from "../assets/icons/StudentIcon";

const ProfileIconText: React.FC<{ label: string; text: string }> = ({
  label,
  text,
}) => {
  const renderIcon = () => {
    if (label === "Ubicación") {
      return <UbicationIcon />;
    } else if (label === "Teléfono") {
      return <PhoneIcon />;
    } else if (label === "Rol") {
      return <Studenticon />;
    }
    return null;
  };

  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
        {renderIcon()}
      </div>
      <div>
        <Paragraph size="sm" color="muted">
          {label}
        </Paragraph>
        <Paragraph size="base" color="default" weight="medium">
          {text}
        </Paragraph>
      </div>
    </div>
  );
};
export default ProfileIconText;
