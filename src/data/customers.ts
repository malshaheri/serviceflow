export type CustomerStatus = "active" | "inactive";

export type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  status: CustomerStatus;
  openRequests: number;
};

export const customers: Customer[] = [
  {
    id: 1001,
    name: "Anna Becker",
    email: "anna.becker@example.de",
    phone: "+49 621 555 0142",
    city: "Mannheim",
    status: "active",
    openRequests: 1,
  },
  {
    id: 1002,
    name: "Michael Braun",
    email: "michael.braun@example.de",
    phone: "+49 621 555 0187",
    city: "Ludwigshafen",
    status: "active",
    openRequests: 1,
  },
  {
    id: 1003,
    name: "Sofia Wagner",
    email: "sofia.wagner@example.de",
    phone: "+49 6221 555 0109",
    city: "Heidelberg",
    status: "active",
    openRequests: 0,
  },
  {
    id: 1004,
    name: "Thomas Keller",
    email: "thomas.keller@example.de",
    phone: "+49 621 555 0164",
    city: "Mannheim",
    status: "active",
    openRequests: 1,
  },
  {
    id: 1005,
    name: "Laura Hoffmann",
    email: "laura.hoffmann@example.de",
    phone: "+49 6232 555 0135",
    city: "Speyer",
    status: "inactive",
    openRequests: 0,
  },
];
