import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { translations, type Locale } from "../i18n/translations";
import type { TeamMember } from "../data/teamMembers";

const createTeamMemberSchema = (locale: Locale) =>
  z.object({
    name: z
      .string()
      .min(2, locale === "de" ? "Name ist erforderlich" : "Name is required"),

    roleEn: z
      .string()
      .min(
        2,
        locale === "de"
          ? "Englische Position ist erforderlich"
          : "English role is required",
      ),

    roleDe: z
      .string()
      .min(
        2,
        locale === "de"
          ? "Deutsche Position ist erforderlich"
          : "German role is required",
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

    status: z.enum(["available", "busy", "off"]),
  });

export type TeamMemberFormData = z.infer<
  ReturnType<typeof createTeamMemberSchema>
>;

type NewTeamMemberModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: TeamMemberFormData) => void;
  locale: Locale;
  editingMember?: TeamMember | null;
};

export function NewTeamMemberModal({
  isOpen,
  onClose,
  onCreate,
  locale,
  editingMember = null,
}: NewTeamMemberModalProps) {
  const t = translations[locale].team.newMemberModal;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeamMemberFormData>({
    resolver: zodResolver(createTeamMemberSchema(locale)),
    defaultValues: {
      name: "",
      roleEn: "",
      roleDe: "",
      email: "",
      phone: "",
      status: "available",
    },
  });

  useEffect(() => {
    if (!isOpen) return;

    if (editingMember) {
      reset({
        name: editingMember.name,
        roleEn: editingMember.role.en,
        roleDe: editingMember.role.de,
        email: editingMember.email,
        phone: editingMember.phone,
        status: editingMember.status,
      });
    } else {
      reset({
        name: "",
        roleEn: "",
        roleDe: "",
        email: "",
        phone: "",
        status: "available",
      });
    }
  }, [editingMember, isOpen, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: TeamMemberFormData) => {
    onCreate(data);
    reset();
  };

  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modal">
        <div className="modalHeader">
          <div>
            <h2>{editingMember ? t.editTitle : t.title}</h2>
            <p>{editingMember ? t.editDescription : t.description}</p>
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
            <label htmlFor="teamMemberName">{t.name}</label>
            <input
              id="teamMemberName"
              type="text"
              placeholder={t.namePlaceholder}
              {...register("name")}
            />
            {errors.name && (
              <span className="formError">{errors.name.message}</span>
            )}
          </div>

          <div className="formField">
            <label htmlFor="teamMemberRoleEn">{t.roleEnglish}</label>
            <input
              id="teamMemberRoleEn"
              type="text"
              placeholder={t.roleEnglishPlaceholder}
              {...register("roleEn")}
            />
            {errors.roleEn && (
              <span className="formError">{errors.roleEn.message}</span>
            )}
          </div>

          <div className="formField">
            <label htmlFor="teamMemberRoleDe">{t.roleGerman}</label>
            <input
              id="teamMemberRoleDe"
              type="text"
              placeholder={t.roleGermanPlaceholder}
              {...register("roleDe")}
            />
            {errors.roleDe && (
              <span className="formError">{errors.roleDe.message}</span>
            )}
          </div>

          <div className="formField">
            <label htmlFor="teamMemberEmail">{t.email}</label>
            <input
              id="teamMemberEmail"
              type="email"
              placeholder={t.emailPlaceholder}
              {...register("email")}
            />
            {errors.email && (
              <span className="formError">{errors.email.message}</span>
            )}
          </div>

          <div className="formField">
            <label htmlFor="teamMemberPhone">{t.phone}</label>
            <input
              id="teamMemberPhone"
              type="tel"
              placeholder={t.phonePlaceholder}
              {...register("phone")}
            />
            {errors.phone && (
              <span className="formError">{errors.phone.message}</span>
            )}
          </div>

          <div className="formField">
            <label htmlFor="teamMemberStatus">{t.status}</label>
            <select id="teamMemberStatus" {...register("status")}>
              <option value="available">{t.statusOptions.available}</option>
              <option value="busy">{t.statusOptions.busy}</option>
              <option value="off">{t.statusOptions.off}</option>
            </select>
          </div>

          <button type="submit" className="submitRequestButton">
            {editingMember ? t.saveChanges : t.create}
          </button>
        </form>
      </div>
    </div>
  );
}
