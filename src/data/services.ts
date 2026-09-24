export type ServiceOption = {
  id: string;
  name: {
    en: string;
    de: string;
  };
};

export const services: ServiceOption[] = [
  {
    id: "heating-repair",
    name: {
      en: "Heating repair",
      de: "Heizungsreparatur",
    },
  },
  {
    id: "heating-maintenance",
    name: {
      en: "Heating maintenance",
      de: "Heizungswartung",
    },
  },
  {
    id: "electrical-service",
    name: {
      en: "Electrical service",
      de: "Elektroservice",
    },
  },
  {
    id: "plumbing-service",
    name: {
      en: "Plumbing service",
      de: "Sanitärservice",
    },
  },
  {
    id: "appliance-repair",
    name: {
      en: "Appliance repair",
      de: "Gerätereparatur",
    },
  },
  {
    id: "door-window-repair",
    name: {
      en: "Door & window repair",
      de: "Tür- & Fensterreparatur",
    },
  },
];
