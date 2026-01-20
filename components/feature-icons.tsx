import type React from "react";
import HubIconSVG from "@/components/svgs/hub-icon";
import EventsIconSVG from "@/components/svgs/events-icon";
import CommunityIconSVG from "@/components/svgs/community-icon";
import HackerspaceIconSVG from "@/components/svgs/hackerspace-icon";
import EducationIconSVG from "@/components/svgs/education-icon";
import ArtIconSVG from "@/components/svgs/art-icon";
import CoworkIconSVG from "@/components/svgs/cowork-icon";
import AfterOfficeIconSVG from "@/components/svgs/after-office-icon";
import ExternalLinkIconSVG from "@/components/svgs/external-link-icon";

// Icon component props
interface IconProps {
  className?: string;
}

const iconBaseClasses = "w-8 h-8";

// Feature Icons - Re-exported from svgs folder
export const HubIcon = ({ className = iconBaseClasses }: IconProps) => (
  <HubIconSVG className={className} />
);

export const EventsIcon = ({ className = iconBaseClasses }: IconProps) => (
  <EventsIconSVG className={className} />
);

export const CommunityIcon = ({ className = iconBaseClasses }: IconProps) => (
  <CommunityIconSVG className={className} />
);

export const HackerspaceIcon = ({
  className = iconBaseClasses,
}: IconProps) => (
  <HackerspaceIconSVG className={className} />
);

export const EducationIcon = ({ className = iconBaseClasses }: IconProps) => (
  <EducationIconSVG className={className} />
);

export const ArtIcon = ({ className = iconBaseClasses }: IconProps) => (
  <ArtIconSVG className={className} />
);

export const CoworkIcon = ({ className = iconBaseClasses }: IconProps) => (
  <CoworkIconSVG className={className} />
);

export const AfterOfficeIcon = ({
  className = iconBaseClasses,
}: IconProps) => (
  <AfterOfficeIconSVG className={className} />
);

// External link icon
export const ExternalLinkIcon = ({
  className = "w-4 h-4",
}: IconProps) => (
  <ExternalLinkIconSVG className={className} />
);
