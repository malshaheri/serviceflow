export type ServiceRequestStatus =
  | "new"
  | "scheduled"
  | "in-progress"
  | "completed";

export type ServiceRequest = {
  id: number;
  customer: string;
  service: {
    en: string;
    de: string;
  };
  technician: string | null;
  status: ServiceRequestStatus;
  scheduledFor: string | null;
};

export const serviceRequests: ServiceRequest[] = [
  {
    id: 1048,
    customer: "Anna Becker",
    service: {
      en: "Heating repair",
      de: "Heizungsreparatur",
    },
    technician: "Daniel Weber",
    status: "scheduled",
    scheduledFor: "2026-09-24T10:00:00",
  },
  {
    id: 1047,
    customer: "Michael Braun",
    service: {
      en: "Electrical service",
      de: "Elektroservice",
    },
    technician: "Leon Fischer",
    status: "in-progress",
    scheduledFor: "2026-09-24T09:00:00",
  },
  {
    id: 1046,
    customer: "Sofia Wagner",
    service: {
      en: "Appliance repair",
      de: "Gerätereparatur",
    },
    technician: "Daniel Weber",
    status: "completed",
    scheduledFor: "2026-09-23T14:30:00",
  },
  {
    id: 1045,
    customer: "Thomas Keller",
    service: {
      en: "Plumbing service",
      de: "Sanitärservice",
    },
    technician: null,
    status: "new",
    scheduledFor: null,
  },
  {
    id: 1044,
    customer: "Laura Hoffmann",
    service: {
      en: "Heating maintenance",
      de: "Heizungswartung",
    },
    technician: "Leon Fischer",
    status: "scheduled",
    scheduledFor: "2026-09-24T13:30:00",
  },
];
