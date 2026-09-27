import { translations, type Locale } from "../i18n/translations";
import type { ServiceRequest } from "../data/serviceRequests";
import { Link } from "react-router-dom";

type DashboardPageProps = {
  locale: Locale;
  serviceRequests: ServiceRequest[];
};

export function DashboardPage({ locale, serviceRequests }: DashboardPageProps) {
  const t = translations[locale];

  const openRequests = serviceRequests.filter(
    (request) => request.status !== "completed",
  ).length;

  const today = new Date().toLocaleDateString("en-CA");

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

          <Link to="/requests" className="viewAllButton">
            {t.dashboard.recentRequests.viewAll}
          </Link>
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
                    <td className={!request.technician ? "noTechnician" : ""}>
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
  );
}
