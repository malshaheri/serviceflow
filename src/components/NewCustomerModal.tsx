import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { translations, type Locale } from "../i18n/translations";

const createCustomerSchema = (locale: Locale) =>
  z.object({
    name: z
      .string()
      .min(
        2,
        locale === "de"
          ? "Kundenname ist erforderlich"
          : "Customer name is required",
      ),
    email: z
      .string()
      .email(
        locale === "de"
          ? "Bitte geben Sie eine gültige E-Mail-Adresse ein"
          : "Please enter a valid email address",
      ),
    phone: z
      .string()
      .min(
        5,
        locale === "de"
          ? "Telefonnummer ist erforderlich"
          : "Phone number is required",
      ),
    city: z
      .string()
      .min(2, locale === "de" ? "Stadt ist erforderlich" : "City is required"),
    status: z.enum(["active", "inactive"]),
  });

export type CustomerFormData = z.infer<ReturnType<typeof createCustomerSchema>>;

type NewCustomerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: CustomerFormData) => void;
  locale: Locale;
};

export function NewCustomerModal({
  isOpen,
  onClose,
  onCreate,
  locale,
}: NewCustomerModalProps) {
  const t = translations[locale].customers.newCustomerModal;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(createCustomerSchema(locale)),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      status: "active",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: CustomerFormData) => {
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
            aria-label={t.close}
          >
            ×
          </button>
        </div>

        <form className="requestForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="formField">
            <label htmlFor="customerName">{t.name}</label>
            <input
              id="customerName"
              type="text"
              placeholder={t.namePlaceholder}
              {...register("name")}
            />
            {errors.name && (
              <span className="formError">{errors.name.message}</span>
            )}
          </div>

          <div className="formField">
            <label htmlFor="customerEmail">{t.email}</label>
            <input
              id="customerEmail"
              type="email"
              placeholder={t.emailPlaceholder}
              {...register("email")}
            />
            {errors.email && (
              <span className="formError">{errors.email.message}</span>
            )}
          </div>

          <div className="formField">
            <label htmlFor="customerPhone">{t.phone}</label>
            <input
              id="customerPhone"
              type="tel"
              placeholder={t.phonePlaceholder}
              {...register("phone")}
            />
            {errors.phone && (
              <span className="formError">{errors.phone.message}</span>
            )}
          </div>

          <div className="formField">
            <label htmlFor="customerCity">{t.city}</label>
            <input
              id="customerCity"
              type="text"
              placeholder={t.cityPlaceholder}
              {...register("city")}
            />
            {errors.city && (
              <span className="formError">{errors.city.message}</span>
            )}
          </div>

          <div className="formField">
            <label htmlFor="customerStatus">{t.status}</label>
            <select id="customerStatus" {...register("status")}>
              <option value="active">{t.statusOptions.active}</option>
              <option value="inactive">{t.statusOptions.inactive}</option>
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
