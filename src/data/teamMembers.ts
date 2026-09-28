export type TeamMemberStatus = "available" | "busy" | "off";

export type TeamMember = {
  id: number;
  name: string;
  role: {
    en: string;
    de: string;
  };
  email: string;
  phone: string;
  status: TeamMemberStatus;
};

export const teamMembers: TeamMember[] = [
  {
    id: 201,
    name: "Daniel Weber",
    role: {
      en: "Heating & Appliance Technician",
      de: "Heizungs- & Gerätetechniker",
    },
    email: "daniel.weber@serviceflow.de",
    phone: "+49 621 555 0201",
    status: "busy",
  },
  {
    id: 202,
    name: "Leon Fischer",
    role: {
      en: "Electrical & Maintenance Technician",
      de: "Elektro- & Wartungstechniker",
    },
    email: "leon.fischer@serviceflow.de",
    phone: "+49 621 555 0202",
    status: "available",
  },
  {
    id: 203,
    name: "Julia Schneider",
    role: {
      en: "Plumbing Technician",
      de: "Sanitärtechnikerin",
    },
    email: "julia.schneider@serviceflow.de",
    phone: "+49 621 555 0203",
    status: "off",
  },
];
