import { useState } from "react";
import { translations, type Locale } from "./i18n/translations";
import "./App.css";
import { serviceRequests as initialServiceRequests } from "./data/serviceRequests";
import { NewRequestModal } from "./components/NewRequestModal";
import { services } from "./data/services";

function App() {
  const [locale, setLocale] = useState<Locale>("en");
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  const [serviceRequests, setServiceRequests] = useState(
    initialServiceRequests,
  );
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
  const openRequests = serviceRequests.filter(
    (request) => request.status !== "completed",
  ).length;

  const today = new Date().toLocaleDateString("en-CA");
  const formattedDate = new Intl.DateTimeFormat(
    locale === "de" ? "de-DE" : "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
    },
  ).format(new Date());
  const scheduledToday = serviceRequests.filter(
    (request) =>
      request.status === "scheduled" && request.scheduledFor?.startsWith(today),
  ).length;

  const inProgress = serviceRequests.filter(
    (request) => request.status === "in-progress",
  ).length;

  const completed = serviceRequests.filter(
    (request) => request.status === "completed",
  ).length;

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
          <a className="active" href="#">
            {t.navigation.dashboard}
          </a>
          <a href="#">{t.navigation.customers}</a>
          <a href="#">{t.navigation.requests}</a>
          <a href="#">{t.navigation.schedule}</a>
          <a href="#">{t.navigation.team}</a>
        </nav>

        <div className="sidebarFooter">
          <a href="#">{t.navigation.settings}</a>
        </div>
      </aside>

      <main className="mainContent">
        <header className="topbar">
          <div>
            <p>{formattedDate}</p>
            <h1>{t.dashboard.title}</h1>{" "}
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

        <section className="dashboard">
          <div className="statsGrid">
            <article className="statCard">
              <span>{t.dashboard.stats.openRequests}</span>
              <strong>{openRequests}</strong>
              <small>{t.dashboard.stats.openRequestsDetail}</small>
            </article>

            <article className="statCard">
              <span>{t.dashboard.stats.scheduledToday}</span>
              <strong>{scheduledToday}</strong>
              <small>{t.dashboard.stats.scheduledTodayDetail}</small>
            </article>

            <article className="statCard">
              <span>{t.dashboard.stats.inProgress}</span>
              <strong>{inProgress}</strong>
              <small>{t.dashboard.stats.inProgressDetail}</small>
            </article>

            <article className="statCard">
              <span>{t.dashboard.stats.completed}</span>
              <strong>{completed}</strong>
              <small>{t.dashboard.stats.completedDetail}</small>
            </article>
          </div>
          <div className="requestsPanel">
            <div className="panelHeader">
              <div>
                <h2>{t.dashboard.recentRequests.title}</h2>
                <p>{t.dashboard.recentRequests.description}</p>
              </div>

              <button type="button" className="viewAllButton">
                {t.dashboard.recentRequests.viewAll}
              </button>
            </div>

            <div className="tableWrapper">
              <table className="requestsTable">
                <thead>
                  <tr>
                    <th>{t.dashboard.recentRequests.columns.request}</th>
                    <th>{t.dashboard.recentRequests.columns.customer}</th>
                    <th>{t.dashboard.recentRequests.columns.service}</th>
                    <th>{t.dashboard.recentRequests.columns.technician}</th>
                    <th>{t.dashboard.recentRequests.columns.status}</th>
                  </tr>
                </thead>

                <tbody>
                  {serviceRequests.slice(0, 4).map((request) => {
                    const statusLabel =
                      request.status === "scheduled"
                        ? t.dashboard.recentRequests.statuses.scheduled
                        : request.status === "in-progress"
                          ? t.dashboard.recentRequests.statuses.inProgress
                          : request.status === "completed"
                            ? t.dashboard.recentRequests.statuses.completed
                            : t.dashboard.recentRequests.statuses.new;

                    const statusClass =
                      request.status === "in-progress"
                        ? "progress"
                        : request.status;

                    return (
                      <tr key={request.id}>
                        <td>#{request.id}</td>
                        <td>{request.customer}</td>
                        <td>{request.service[locale]}</td>
                        <td
                          className={!request.technician ? "noTechnician" : ""}
                        >
                          {request.technician ?? "—"}
                        </td>
                        <td>
                          <span className={`status ${statusClass}`}>
                            {statusLabel}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
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
