import type React from "react";
import {
  HubIcon,
  EventsIcon,
  CommunityIcon,
  HackerspaceIcon,
  EducationIcon,
  ArtIcon,
  CoworkIcon,
  AfterOfficeIcon,
} from "@/components/feature-icons";

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const features: Feature[] = [
  {
    title: "Hub",
    description:
      "Un espacio físico para compartir y crear el nuevo mundo digital abierto.",
    icon: <HubIcon />,
  },
  {
    title: "Eventos",
    description:
      "Escuelas, Universidades e instituciones privadas serán parte de nuestros encuentros.",
    icon: <EventsIcon />,
  },
  {
    title: "Comunidad",
    description:
      "Juntos podemos hacer más. Queremos conectar la comunidad local con el mundo.",
    icon: <CommunityIcon />,
  },
  {
    title: "Hackerspace",
    description:
      "Un espacio equipado con recursos de hardware, herramientas de hacking y tecnología para explorar la seguridad informática.",
    icon: <HackerspaceIcon />,
  },
  {
    title: "Educación",
    description:
      "Desde talleres prácticos de Ethereum y seguridad operacional hasta charlas espontáneas con expertos locales e internacionales que nos visitan.",
    icon: <EducationIcon />,
  },
  {
    title: "Arte",
    description:
      "Un espacio creativo transversal donde la tecnología y el arte convergen. Ven a experimentar, jugar y expresarte.",
    icon: <ArtIcon />,
  },
  {
    title: "Cowork",
    description:
      "Vení a trabajar al nodo, sea por el día o por unos meses, y disfrutá del acceso a todo lo que ofrece desde adentro.",
    icon: <CoworkIcon />,
  },
  {
    title: "After Office",
    description:
      "Sumate a relajar después del trabajo, con música, comida y mucho networking en un ambiente distendido.",
    icon: <AfterOfficeIcon />,
  },
];
