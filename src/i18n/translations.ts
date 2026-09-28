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
    schedule: {
      title: "Schedule",
      description: "View and manage scheduled service appointments.",
      previousDay: "Previous day",
      today: "Today",
      nextDay: "Next day",
      appointments: "Appointments",
      technician: "Technician",
      notAssigned: "Not assigned",
      noAppointments: "No appointments scheduled for this day.",
      statuses: {
        new: "New",
        scheduled: "Scheduled",
        inProgress: "In Progress",
        completed: "Completed",
      },
    },

    team: {
      title: "Team",
      description: "Manage your service team and current workload.",
      members: "Team Members",
      openRequests: "Open Requests",
      contact: "Contact",
      status: "Status",
      statuses: {
        available: "Available",
        busy: "Busy",
        off: "Off Duty",
      },
      addMember: "+ Add team member",
      editMember: "Edit",
      removeMember: "Remove",

      newMemberModal: {
        title: "Add Team Member",
        description: "Add a new technician to your service team.",
        name: "Name",
        namePlaceholder: "Full name",
        roleEnglish: "Role (English)",
        roleEnglishPlaceholder: "e.g. Heating Technician",
        roleGerman: "Role (German)",
        roleGermanPlaceholder: "z. B. Heizungstechniker",
        email: "Email",
        emailPlaceholder: "name@serviceflow.de",
        phone: "Phone",
        phonePlaceholder: "+49 621 555 0000",
        status: "Status",
        statusOptions: {
          available: "Available",
          busy: "Busy",
          off: "Off Duty",
        },
        create: "Add team member",
        close: "Close",
        editTitle: "Edit Team Member",
        editDescription: "Update the team member's information.",
        saveChanges: "Save changes",
      },
      removeConfirmation: {
        title: "Remove team member?",
        message:
          "Are you sure you want to remove this team member? Existing service requests will not be deleted.",
        cancel: "Cancel",
        confirm: "Remove",
      },
    },

    settings: {
      title: "Settings",
      description:
        "Manage your company information and application preferences.",

      company: {
        title: "Company Information",
        description: "Update the business details used across ServiceFlow.",
        companyName: "Company name",
        email: "Email",
        phone: "Phone",
        address: "Address",
      },

      preferences: {
        title: "Preferences",
        description: "Configure your default application preferences.",
        defaultLanguage: "Default language",
        german: "German",
        english: "English",
      },

      business: {
        title: "Business Settings",
        description: "Configure your standard business hours.",
        openingTime: "Opening time",
        closingTime: "Closing time",
      },

      save: "Save settings",
      saved: "Settings saved successfully.",

      validation: {
        companyNameRequired: "Company name is required.",
        invalidEmail: "Please enter a valid email address.",
        closingTimeAfterOpening: "Closing time must be after opening time.",
        checkSettings: "Please check your settings.",
      },
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

    schedule: {
      title: "Terminplan",
      description: "Zeigen und verwalten Sie geplante Servicetermine.",
      previousDay: "Vorheriger Tag",
      today: "Heute",
      nextDay: "Nächster Tag",
      appointments: "Termine",
      technician: "Techniker",
      notAssigned: "Nicht zugewiesen",
      noAppointments: "Für diesen Tag sind keine Termine geplant.",
      statuses: {
        new: "Neu",
        scheduled: "Geplant",
        inProgress: "In Bearbeitung",
        completed: "Abgeschlossen",
      },
    },

    team: {
      title: "Team",
      description: "Verwalten Sie Ihr Serviceteam und die aktuelle Auslastung.",
      members: "Teammitglieder",
      openRequests: "Offene Aufträge",
      contact: "Kontakt",
      status: "Status",
      statuses: {
        available: "Verfügbar",
        busy: "Beschäftigt",
        off: "Nicht im Dienst",
      },
      addMember: "+ Teammitglied hinzufügen",
      editMember: "Bearbeiten",
      removeMember: "Entfernen",

      newMemberModal: {
        title: "Teammitglied hinzufügen",
        description:
          "Fügen Sie einen neuen Techniker zu Ihrem Serviceteam hinzu.",
        name: "Name",
        namePlaceholder: "Vollständiger Name",
        roleEnglish: "Position (Englisch)",
        roleEnglishPlaceholder: "z. B. Heating Technician",
        roleGerman: "Position (Deutsch)",
        roleGermanPlaceholder: "z. B. Heizungstechniker",
        email: "E-Mail",
        emailPlaceholder: "name@serviceflow.de",
        phone: "Telefon",
        phonePlaceholder: "+49 621 555 0000",
        status: "Status",
        statusOptions: {
          available: "Verfügbar",
          busy: "Beschäftigt",
          off: "Nicht im Dienst",
        },
        create: "Teammitglied hinzufügen",
        close: "Schließen",
        editTitle: "Teammitglied bearbeiten",
        editDescription:
          "Aktualisieren Sie die Informationen des Teammitglieds.",
        saveChanges: "Änderungen speichern",
      },
      removeConfirmation: {
        title: "Teammitglied entfernen?",
        message:
          "Möchten Sie dieses Teammitglied wirklich entfernen? Bestehende Serviceaufträge werden nicht gelöscht.",
        cancel: "Abbrechen",
        confirm: "Entfernen",
      },
    },

    settings: {
      title: "Einstellungen",
      description:
        "Verwalten Sie Ihre Unternehmensdaten und Anwendungseinstellungen.",

      company: {
        title: "Unternehmensinformationen",
        description:
          "Aktualisieren Sie die in ServiceFlow verwendeten Unternehmensdaten.",
        companyName: "Unternehmensname",
        email: "E-Mail",
        phone: "Telefon",
        address: "Adresse",
      },

      preferences: {
        title: "Einstellungen",
        description:
          "Konfigurieren Sie Ihre standardmäßigen Anwendungseinstellungen.",
        defaultLanguage: "Standardsprache",
        german: "Deutsch",
        english: "Englisch",
      },

      business: {
        title: "Geschäftseinstellungen",
        description: "Konfigurieren Sie Ihre regulären Geschäftszeiten.",
        openingTime: "Öffnungszeit",
        closingTime: "Schließzeit",
      },

      save: "Einstellungen speichern",
      saved: "Einstellungen wurden erfolgreich gespeichert.",

      validation: {
        companyNameRequired: "Der Unternehmensname ist erforderlich.",
        invalidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
        closingTimeAfterOpening:
          "Die Schließzeit muss nach der Öffnungszeit liegen.",
        checkSettings: "Bitte überprüfen Sie Ihre Einstellungen.",
      },
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
