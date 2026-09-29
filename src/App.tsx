import { useState } from "react";
import { translations, type Locale } from "./i18n/translations";
import "./App.css";
import { NewRequestModal } from "./components/NewRequestModal";
import type { TeamMemberFormData } from "./components/NewTeamMemberModal";
import type { TeamMember } from "./data/teamMembers";
import { services } from "./data/services";
import { DashboardPage } from "./pages/DashboardPage";
import { CustomersPage } from "./pages/CustomersPage";
import { ServiceRequestsPage } from "./pages/ServiceRequestsPage";
import { SchedulePage } from "./pages/SchedulePage";
import { TeamPage } from "./pages/TeamPage";
import { SettingsPage } from "./pages/SettingsPage";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createServiceRequest,
  getServiceRequests,
} from "./api/serviceRequestsApi";
import { createCustomer, getCustomers } from "./api/customersApi";
import {
  createTeamMember,
  deleteTeamMember,
  getTeamMembers,
  updateTeamMember,
} from "./api/teamMembersApi";
import {
  getSettings,
  updateSettings,
  type Settings,
} from "./api/settingsApi";

function App() {
  const [locale, setLocale] = useState<Locale>(() => {
    const savedSettings = localStorage.getItem("serviceflow-settings");

    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);

        if (
          parsedSettings.defaultLanguage === "en" ||
          parsedSettings.defaultLanguage === "de"
        ) {
          return parsedSettings.defaultLanguage;
        }
      } catch {
        // Use English as fallback
      }
    }

    return "en";
  });
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: serviceRequests = [],
    isLoading: isServiceRequestsLoading,
    isError: isServiceRequestsError,
  } = useQuery({
    queryKey: ["serviceRequests"],
    queryFn: getServiceRequests,
  });

  const createCustomerMutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
  });

  const createTeamMemberMutation = useMutation({
    mutationFn: createTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teamMembers"],
      });
    },
  });

  const updateTeamMemberMutation = useMutation({
    mutationFn: updateTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teamMembers"],
      });
    },
  });

  const deleteTeamMemberMutation = useMutation({
    mutationFn: deleteTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teamMembers"],
      });
    },
  });

  const updateSettingsMutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
  });

  const createRequestMutation = useMutation({
    mutationFn: createServiceRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["serviceRequests"],
      });
    },
  });

  const handleCreateRequest = (data: {
    customer: string;
    service: string;
    technician?: string;
    scheduledFor?: string;
    status: "new" | "scheduled" | "in-progress" | "completed";
  }) => {
    const nextId =
      Math.max(...serviceRequests.map((request) => request.id)) + 1;
    const selectedService = services.find(
      (service) => service.id === data.service,
    );

    if (!selectedService) {
      return;
    }

    const newRequest = {
      id: nextId,
      customer: data.customer,
      service: selectedService.name,
      technician: data.technician || null,
      status: data.status,
      scheduledFor: data.scheduledFor || null,
    };

    createRequestMutation.mutate(newRequest, {
      onSuccess: () => {
        setIsNewRequestOpen(false);
      },
    });
  };

  const { data: customers = [] } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  const { data: teamMembers = [] } = useQuery({
    queryKey: ["teamMembers"],
    queryFn: getTeamMembers,
  });

  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  const handleCreateCustomer = (data: {
    name: string;
    email: string;
    phone: string;
    city: string;
    status: "active" | "inactive";
  }) => {
    const nextId = Math.max(...customers.map((customer) => customer.id)) + 1;

    const newCustomer = {
      id: nextId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      city: data.city,
      status: data.status,
      openRequests: 0,
    };

    createCustomerMutation.mutate(newCustomer);
  };

  const handleCreateTeamMember = (data: TeamMemberFormData) => {
    const nextId =
      Math.max(...teamMembers.map((member) => member.id), 200) + 1;

    const newMember: TeamMember = {
      id: nextId,
      name: data.name,
      role: {
        en: data.roleEn,
        de: data.roleDe,
      },
      email: data.email,
      phone: data.phone,
      status: data.status,
    };

    createTeamMemberMutation.mutate(newMember);
  };

  const handleUpdateTeamMember = (member: TeamMember) => {
    updateTeamMemberMutation.mutate(member);
  };

  const handleDeleteTeamMember = (memberId: number) => {
    deleteTeamMemberMutation.mutate(memberId);
  };

  const handleUpdateSettings = (updatedSettings: Settings) => {
    updateSettingsMutation.mutate(updatedSettings);
  };

  const t = translations[locale];
  const location = useLocation();

  const pageTitle =
    location.pathname === "/customers"
      ? t.navigation.customers
      : location.pathname === "/requests"
        ? t.navigation.requests
        : location.pathname === "/schedule"
          ? t.navigation.schedule
          : location.pathname === "/team"
            ? t.navigation.team
            : location.pathname === "/settings"
              ? t.navigation.settings
              : t.dashboard.title;
  const formattedDate = new Intl.DateTimeFormat(
    locale === "de" ? "de-DE" : "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
    },
  ).format(new Date());

  return (
    <div className="appShell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandMark">SF</div>

          <div>
            <strong>ServiceFlow</strong>
            <span>{t.brand.subtitle}</span>
          </div>
        </div>

        <nav className="navigation">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {t.navigation.dashboard}
          </NavLink>
          <NavLink
            to="/customers"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {t.navigation.customers}
          </NavLink>

          <NavLink
            to="/requests"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {t.navigation.requests}
          </NavLink>

          <NavLink
            to="/schedule"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {t.navigation.schedule}
          </NavLink>

          <NavLink
            to="/team"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {t.navigation.team}
          </NavLink>
        </nav>

        <div className="sidebarFooter">
          <NavLink
            to="/settings"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {t.navigation.settings}
          </NavLink>
        </div>
      </aside>

      <main className="mainContent">
        <header className="topbar">
          <div>
            <p>{formattedDate}</p>
            <h1>{pageTitle}</h1>{" "}
          </div>

          <div className="topbarActions">
            <div className="languageSwitcher">
              <button
                type="button"
                className={locale === "en" ? "active" : ""}
                onClick={() => setLocale("en")}
              >
                EN
              </button>

              <button
                type="button"
                className={locale === "de" ? "active" : ""}
                onClick={() => setLocale("de")}
              >
                DE
              </button>
            </div>

            <button
              type="button"
              className="newRequestButton"
              onClick={() => setIsNewRequestOpen(true)}
            >
              {t.dashboard.newRequest}
            </button>
          </div>
        </header>

        {isServiceRequestsLoading && (
          <div className="queryState">
            <div className="querySpinner" />
            <p>
              {locale === "de"
                ? "Serviceanfragen werden geladen..."
                : "Loading service requests..."}
            </p>
          </div>
        )}

        {isServiceRequestsError && (
          <div className="queryState queryStateError">
            <strong>
              {locale === "de"
                ? "Serviceanfragen konnten nicht geladen werden."
                : "Service requests could not be loaded."}
            </strong>

            <p>
              {locale === "de"
                ? "Bitte versuchen Sie es erneut."
                : "Please try again."}
            </p>
          </div>
        )}

        {!isServiceRequestsLoading && !isServiceRequestsError && (
          <Routes>
            <Route
              path="/"
              element={
                <DashboardPage
                  locale={locale}
                  serviceRequests={serviceRequests}
                />
              }
            />
            <Route
              path="/customers"
              element={
                <CustomersPage
                  locale={locale}
                  customers={customers}
                  onCreateCustomer={handleCreateCustomer}
                />
              }
            />
            <Route
              path="/requests"
              element={
                <ServiceRequestsPage
                  locale={locale}
                  serviceRequests={serviceRequests}
                />
              }
            />
            <Route
              path="/schedule"
              element={
                <SchedulePage
                  locale={locale}
                  serviceRequests={serviceRequests}
                />
              }
            />
            <Route
              path="/team"
              element={
                <TeamPage
                  locale={locale}
                  serviceRequests={serviceRequests}
                  teamMembers={teamMembers}
                  onCreateTeamMember={handleCreateTeamMember}
                  onUpdateTeamMember={handleUpdateTeamMember}
                  onDeleteTeamMember={handleDeleteTeamMember}
                />
              }
            />
            <Route
              path="/settings"
              element={
                settings ? (
                  <SettingsPage
                    locale={locale}
                    settings={settings}
                    onUpdateSettings={handleUpdateSettings}
                  />
                ) : null
              }
            />{" "}
          </Routes>
        )}
      </main>
      <NewRequestModal
        isOpen={isNewRequestOpen}
        onClose={() => setIsNewRequestOpen(false)}
        onCreate={handleCreateRequest}
        locale={locale}
      />
    </div>
  );
}

export default App;











