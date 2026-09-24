import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { services } from "../data/services";
import { translations, type Locale } from "../i18n/translations";

const createRequestSchema = (locale: Locale) =>
  z.object({
    customer: z
      .string()
      .min(
        2,
        locale === "de"
          ? "Kundenname ist erforderlich"
          : "Customer name is required",
      ),
    service: z
      .string()
      .min(
        2,
        locale === "de" ? "Service ist erforderlich" : "Service is required",
      ),
    technician: z.string().optional(),
    scheduledFor: z.string().optional(),
    status: z.enum(["new", "scheduled", "in-progress", "completed"]),
  });

type RequestFormData = z.infer<ReturnType<typeof createRequestSchema>>;

type NewRequestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: RequestFormData) => void;
  locale: Locale;
};

export function NewRequestModal({
  isOpen,
  onClose,
  onCreate,
  locale,
}: NewRequestModalProps) {
  const t = translations[locale].dashboard.newRequestModal;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RequestFormData>({
    resolver: zodResolver(createRequestSchema(locale)),
    defaultValues: {
      customer: "",
      service: "",
      technician: "",
      scheduledFor: "",
      status: "new",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: RequestFormData) => {
    onCreate(data);
    reset();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modalOverlay">
      <div className="modal">
        <div className="modalHeader">
          <div>
            <h2>{t.title}</h2>
            <p>{t.description}</p>
          </div>

          <button
            type="button"
            className="modalCloseButton"
            onClick={handleClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form className="requestForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="formField">
            <label htmlFor="customer">{t.customer}</label>
            <input
              id="customer"
              type="text"
              placeholder={t.customerPlaceholder}
              {...register("customer")}
            />

            {errors.customer && (
              <span className="formError">{errors.customer.message}</span>
            )}
          </div>

          <div className="formField">
            <label htmlFor="service">{t.service}</label>
            <select id="service" {...register("service")}>
              <option value="">{t.selectService}</option>

              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name[locale]}
                </option>
              ))}
            </select>

            {errors.service && (
              <span className="formError">{errors.service.message}</span>
            )}
          </div>
          <div className="formField">
            <label htmlFor="technician">{t.technician}</label>
            <input
              id="technician"
              type="text"
              placeholder={t.technicianPlaceholder}
              {...register("technician")}
            />
          </div>
          <div className="formField">
            <label htmlFor="scheduledFor">{t.scheduledFor}</label>
            <input
              id="scheduledFor"
              type="datetime-local"
              {...register("scheduledFor")}
            />
          </div>
          <div className="formField">
            <label htmlFor="status">{t.status}</label>

            <select id="status" {...register("status")}>
              <option value="new">{t.statusOptions.new}</option>
              <option value="scheduled">{t.statusOptions.scheduled}</option>
              <option value="in-progress">{t.statusOptions.inProgress}</option>
              <option value="completed">{t.statusOptions.completed}</option>
            </select>
          </div>
          <button type="submit" className="submitRequestButton">
            {t.create}
          </button>
        </form>
      </div>
    </div>
  );
}
