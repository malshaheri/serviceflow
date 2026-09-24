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
