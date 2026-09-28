import { useMemo, useState } from "react";
import { translations, type Locale } from "../i18n/translations";
import type {
  ServiceRequest,
  ServiceRequestStatus,
} from "../data/serviceRequests";

type SchedulePageProps = {
  locale: Locale;
  serviceRequests: ServiceRequest[];
};

export function SchedulePage({ locale, serviceRequests }: SchedulePageProps) {
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const t = translations[locale].schedule;

  const localeCode = locale === "de" ? "de-DE" : "en-US";

  const isSameDay = (firstDate: Date, secondDate: Date) =>
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate();

  const appointments = useMemo(() => {
    return serviceRequests
      .filter((request) => {
        if (!request.scheduledFor) {
          return false;
        }

        return isSameDay(new Date(request.scheduledFor), selectedDate);
      })
      .sort((firstRequest, secondRequest) => {
        if (!firstRequest.scheduledFor || !secondRequest.scheduledFor) {
          return 0;
        }

        return (
          new Date(firstRequest.scheduledFor).getTime() -
          new Date(secondRequest.scheduledFor).getTime()
        );
      });
  }, [serviceRequests, selectedDate]);

  const changeDay = (days: number) => {
    setSelectedDate((currentDate) => {
      const nextDate = new Date(currentDate);
      nextDate.setDate(nextDate.getDate() + days);
      return nextDate;
    });
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const formatSelectedDate = () =>
    new Intl.DateTimeFormat(localeCode, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(selectedDate);

  const formatTime = (date: string) =>
    new Intl.DateTimeFormat(localeCode, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));

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
    <section className="schedulePage">
      <div className="pageSectionHeader">
        <div>
          <h2>{t.title}</h2>
          <p>{t.description}</p>
        </div>
      </div>

      <div className="scheduleNavigation">
        <button
          type="button"
          onClick={() => changeDay(-1)}
          className="scheduleNavButton"
        >
          ← {t.previousDay}
        </button>

        <div className="scheduleDate">
          <strong>{formatSelectedDate()}</strong>
          <span>
            {appointments.length} {t.appointments}
          </span>
        </div>

        <div className="scheduleNavigationActions">
          <button
            type="button"
            onClick={goToToday}
            className="scheduleTodayButton"
          >
            {t.today}
          </button>

          <button
            type="button"
            onClick={() => changeDay(1)}
            className="scheduleNavButton"
          >
            {t.nextDay} →
          </button>
        </div>
      </div>

      <div className="scheduleList">
        {appointments.map((request) => (
          <article key={request.id} className="scheduleAppointment">
            <div className="appointmentTime">
              {request.scheduledFor && formatTime(request.scheduledFor)}
            </div>

            <div className="appointmentContent">
              <div className="appointmentMain">
                <span className="appointmentRequestId">#{request.id}</span>

                <h3>{request.customer}</h3>

                <p>
                  {locale === "de" ? request.service.de : request.service.en}
                </p>
              </div>

              <div className="appointmentMeta">
                <div>
                  <span>{t.technician}</span>
                  <strong>{request.technician ?? t.notAssigned}</strong>
                </div>

                <span className={`status ${request.status}`}>
                  {getStatusLabel(request.status)}
                </span>
              </div>
            </div>
          </article>
        ))}

        {appointments.length === 0 && (
          <div className="scheduleEmptyState">
            <strong>{formatSelectedDate()}</strong>
            <p>{t.noAppointments}</p>
          </div>
        )}
      </div>
    </section>
  );
}
