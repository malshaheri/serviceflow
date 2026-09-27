export type Locale = "en" | "de";

export const translations = {
  en: {
    brand: {
      subtitle: "Service Management",
    },

    navigation: {
      dashboard: "Dashboard",
      customers: "Customers",
      requests: "Service Requests",
      schedule: "Schedule",
      team: "Team",
      settings: "Settings",
    },

    customers: {
      title: "Customers",
      description: "Manage your customers and their service activity.",
      addCustomer: "+ Add customer",
      searchPlaceholder: "Search customers...",
      filters: {
        all: "All customers",
        active: "Active",
        inactive: "Inactive",
      },
      columns: {
        customer: "Customer",
        contact: "Contact",
        city: "City",
        openRequests: "Open Requests",
        status: "Status",
      },
      statuses: {
        active: "Active",
        inactive: "Inactive",
      },
      newCustomerModal: {
        title: "New Customer",
        description: "Add a new customer to your service management.",
        name: "Name",
        namePlaceholder: "Customer name",
        email: "Email",
        emailPlaceholder: "customer@example.de",
        phone: "Phone",
        phonePlaceholder: "+49 621 555 0000",
        city: "City",
        cityPlaceholder: "City",
        status: "Status",
        statusOptions: {
          active: "Active",
          inactive: "Inactive",
        },
        create: "Add customer",
        close: "Close",
      },
    },

    serviceRequests: {
      title: "Service Requests",
      description: "Manage and track all customer service requests.",
      searchPlaceholder: "Search requests...",
      filters: {
        all: "All statuses",
        new: "New",
        scheduled: "Scheduled",
        inProgress: "In Progress",
        completed: "Completed",
      },
      columns: {
        request: "Request",
        customer: "Customer",
        service: "Service",
        technician: "Technician",
        scheduledFor: "Scheduled For",
        status: "Status",
      },
      statuses: {
        new: "New",
        scheduled: "Scheduled",
        inProgress: "In Progress",
        completed: "Completed",
      },
      notAssigned: "Not assigned",
      notScheduled: "Not scheduled",
      noResults: "No service requests found.",
    },

    dashboard: {
      title: "Dashboard",
      newRequest: "+ New request",

      newRequestModal: {
        title: "New Service Request",
        description: "Create a new service request for a customer.",
        customer: "Customer",
        customerPlaceholder: "Customer name",
        service: "Service",
        selectService: "Select a service",
        technician: "Technician",
        technicianPlaceholder: "Technician name",
        scheduledFor: "Scheduled for",
        status: "Status",
        statusOptions: {
          new: "New",
          scheduled: "Scheduled",
          inProgress: "In Progress",
          completed: "Completed",
        },
        create: "Create request",
      },

      stats: {
        openRequests: "Open Requests",
        openRequestsDetail: "Awaiting action",

        scheduledToday: "Scheduled Today",
        scheduledTodayDetail: "Appointments today",

        inProgress: "In Progress",
        inProgressDetail: "Currently being handled",

        completed: "Completed",
        completedDetail: "Total completed jobs",
      },

      recentRequests: {
        title: "Recent Service Requests",
        description: "Latest customer requests and their current status.",
        viewAll: "View all",

        columns: {
          request: "Request",
          customer: "Customer",
          service: "Service",
          technician: "Technician",
          status: "Status",
        },

        statuses: {
          new: "New",
          scheduled: "Scheduled",
          inProgress: "In Progress",
          completed: "Completed",
        },
      },
    },
  },

  de: {
    brand: {
      subtitle: "Serviceverwaltung",
    },

    navigation: {
      dashboard: "Übersicht",
      customers: "Kunden",
      requests: "Serviceaufträge",
      schedule: "Terminplan",
      team: "Team",
      settings: "Einstellungen",
    },

    customers: {
      title: "Kunden",
      description: "Verwalten Sie Ihre Kunden und deren Serviceaktivitäten.",
      addCustomer: "+ Neuer Kunde",
      searchPlaceholder: "Kunden suchen...",
      filters: {
        all: "Alle Kunden",
        active: "Aktiv",
        inactive: "Inaktiv",
      },
      columns: {
        customer: "Kunde",
        contact: "Kontakt",
        city: "Stadt",
        openRequests: "Offene Aufträge",
        status: "Status",
      },
      statuses: {
        active: "Aktiv",
        inactive: "Inaktiv",
      },
      newCustomerModal: {
        title: "Neuer Kunde",
        description:
          "Fügen Sie einen neuen Kunden zur Serviceverwaltung hinzu.",
        name: "Name",
        namePlaceholder: "Kundenname",
        email: "E-Mail",
        emailPlaceholder: "kunde@example.de",
        phone: "Telefon",
        phonePlaceholder: "+49 621 555 0000",
        city: "Stadt",
        cityPlaceholder: "Stadt",
        status: "Status",
        statusOptions: {
          active: "Aktiv",
          inactive: "Inaktiv",
        },
        create: "Kunde hinzufügen",
        close: "Schließen",
      },
    },

    serviceRequests: {
      title: "Serviceaufträge",
      description:
        "Verwalten und verfolgen Sie alle Serviceaufträge Ihrer Kunden.",
      searchPlaceholder: "Serviceaufträge suchen...",
      filters: {
        all: "Alle Status",
        new: "Neu",
        scheduled: "Geplant",
        inProgress: "In Bearbeitung",
        completed: "Abgeschlossen",
      },
      columns: {
        request: "Auftrag",
        customer: "Kunde",
        service: "Service",
        technician: "Techniker",
        scheduledFor: "Geplant für",
        status: "Status",
      },
      statuses: {
        new: "Neu",
        scheduled: "Geplant",
        inProgress: "In Bearbeitung",
        completed: "Abgeschlossen",
      },
      notAssigned: "Nicht zugewiesen",
      notScheduled: "Nicht geplant",
      noResults: "Keine Serviceaufträge gefunden.",
    },

    dashboard: {
      title: "Übersicht",
      newRequest: "+ Neuer Auftrag",

      newRequestModal: {
        title: "Neuer Serviceauftrag",
        description:
          "Erstellen Sie einen neuen Serviceauftrag für einen Kunden.",
        customer: "Kunde",
        customerPlaceholder: "Kundenname",
        service: "Service",
        selectService: "Service auswählen",
        technician: "Techniker",
        technicianPlaceholder: "Name des Technikers",
        scheduledFor: "Geplant für",
        status: "Status",
        statusOptions: {
          new: "Neu",
          scheduled: "Geplant",
          inProgress: "In Bearbeitung",
          completed: "Abgeschlossen",
        },
        create: "Auftrag erstellen",
      },

      stats: {
        openRequests: "Offene Aufträge",
        openRequestsDetail: "Warten auf Bearbeitung",

        scheduledToday: "Heute geplant",
        scheduledTodayDetail: "Heutige Termine",

        inProgress: "In Bearbeitung",
        inProgressDetail: "Werden aktuell bearbeitet",

        completed: "Abgeschlossen",
        completedDetail: "Abgeschlossene Aufträge gesamt",
      },

      recentRequests: {
        title: "Aktuelle Serviceaufträge",
        description: "Die neuesten Kundenaufträge und ihr aktueller Status.",
        viewAll: "Alle anzeigen",

        columns: {
          request: "Auftrag",
          customer: "Kunde",
          service: "Service",
          technician: "Techniker",
          status: "Status",
        },

        statuses: {
          new: "Neu",
          scheduled: "Geplant",
          inProgress: "In Bearbeitung",
          completed: "Abgeschlossen",
        },
      },
    },
  },
} as const;
