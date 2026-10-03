import { useMemo, useState } from "react";
import { translations, type Locale } from "../i18n/translations";
import type {
  ServiceRequest,
  ServiceRequestStatus,
} from "../data/serviceRequests";

type ServiceRequestsPageProps = {
  locale: Locale;
  serviceRequests: ServiceRequest[];
};

type StatusFilter = "all" | ServiceRequestStatus;

export function ServiceRequestsPage({
  locale,
  serviceRequests,
}: ServiceRequestsPageProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const t = translations[locale].serviceRequests;

  const filteredRequests = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return serviceRequests.filter((request) => {
      const searchableValues = [
        `#${request.id}`,
        request.customer,
        request.service.en,
        request.service.de,
        request.technician ?? "",
      ];

      const matchesSearch = searchableValues.some((value) =>
        value.toLowerCase().includes(normalizedSearch),
      );

      const matchesStatus =
        statusFilter === "all" || request.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [serviceRequests, search, statusFilter]);

  const formatScheduledDate = (date: string | null) => {
    if (!date) {
      return t.notScheduled;
    }

    return new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  };

  const getStatusLabel = (status: ServiceRequestStatus) => {
    switch (status) {
      case "new":
        return t.statuses.new;
      case "scheduled":
        return t.statuses.scheduled;
      case "in-progress":
        return t.statuses.inProgress;
      case "completed":
        return t.statuses.completed;
    }
  };

  return (
    <section className="serviceRequestsPage">
      <div className="pageSectionHeader">
        <div>
          <h2>{t.title}</h2>
          <p>{t.description}</p>
        </div>
      </div>

      <div className="requestToolbar">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={t.searchPlaceholder}
          className="requestSearch"
        />

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value as StatusFilter)
          }
          className="requestFilter"
        >
          <option value="all">{t.filters.all}</option>
          <option value="new">{t.filters.new}</option>
          <option value="scheduled">{t.filters.scheduled}</option>
          <option value="in-progress">{t.filters.inProgress}</option>
          <option value="completed">{t.filters.completed}</option>
        </select>
      </div>

      <div className="requestsPanel serviceRequestsPanel">
        <div className="tableWrapper">
          <table className="requestsTable serviceRequestsTable">
            <thead>
              <tr>
                <th>{t.columns.request}</th>
                <th>{t.columns.customer}</th>
                <th>{t.columns.service}</th>
                <th>{t.columns.technician}</th>
                <th>{t.columns.scheduledFor}</th>
                <th>{t.columns.status}</th>
              </tr>
            </thead>

            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td>
                    <strong>#{request.id}</strong>
                  </td>

                  <td>{request.customer}</td>

                  <td>
                    {locale === "de" ? request.service.de : request.service.en}
                  </td>

                  <td>{request.technician ?? t.notAssigned}</td>

                  <td>{formatScheduledDate(request.scheduledFor)}</td>

                  <td>
                    <span className={`status ${request.status}`}>
                      {getStatusLabel(request.status)}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan={6} className="requestsEmptyState">
                    {t.noResults}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="serviceRequestsMobileList">
          {filteredRequests.map((request) => (
            <article className="serviceRequestMobileCard" key={request.id}>
              <div className="serviceRequestMobileTop">
                <strong>#{request.id}</strong>

                <span className={`status ${request.status}`}>
                  {getStatusLabel(request.status)}
                </span>
              </div>

              <strong className="serviceRequestMobileCustomer">
                {request.customer}
              </strong>

              <span className="serviceRequestMobileService">
                {locale === "de" ? request.service.de : request.service.en}
              </span>

              <div className="serviceRequestMobileDetails">
                <span>
                  <strong>{t.columns.technician}:</strong>{" "}
                  {request.technician ?? t.notAssigned}
                </span>

                <span>
                  <strong>{t.columns.scheduledFor}:</strong>{" "}
                  {formatScheduledDate(request.scheduledFor)}
                </span>
              </div>
            </article>
          ))}

          {filteredRequests.length === 0 && (
            <div className="serviceRequestMobileEmpty">{t.noResults}</div>
          )}
        </div>
      </div>
    </section>
  );
}
