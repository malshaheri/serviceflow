import { useEffect, useState } from "react";
import { translations, type Locale } from "./i18n/translations";
import "./App.css";
import {
  serviceRequests as initialServiceRequests,
  type ServiceRequest,
} from "./data/serviceRequests";
import { NewRequestModal } from "./components/NewRequestModal";
import { services } from "./data/services";
import { DashboardPage } from "./pages/DashboardPage";
import { CustomersPage } from "./pages/CustomersPage";
import { ServiceRequestsPage } from "./pages/ServiceRequestsPage";
import { SchedulePage } from "./pages/SchedulePage";
import { TeamPage } from "./pages/TeamPage";
import { SettingsPage } from "./pages/SettingsPage";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
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
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(
    () => {
      const savedRequests = localStorage.getItem(
        "serviceflow-service-requests",
      );

      if (savedRequests) {
        try {
          return JSON.parse(savedRequests);
        } catch {
          // Use initial service requests below
        }
      }

      return initialServiceRequests;
    },
  );
  useEffect(() => {
    localStorage.setItem(
      "serviceflow-service-requests",
      JSON.stringify(serviceRequests),
    );
  }, [serviceRequests]);
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

    setServiceRequests((currentRequests) => [newRequest, ...currentRequests]);

    setIsNewRequestOpen(false);
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
            element={<CustomersPage locale={locale} />}
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
              <SchedulePage locale={locale} serviceRequests={serviceRequests} />
            }
          />
          <Route
            path="/team"
            element={
              <TeamPage locale={locale} serviceRequests={serviceRequests} />
            }
          />
          <Route
            path="/settings"
            element={<SettingsPage locale={locale} />}
          />{" "}
        </Routes>
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
