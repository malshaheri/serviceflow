import { useState } from "react";
import {
  NewTeamMemberModal,
  type TeamMemberFormData,
} from "../components/NewTeamMemberModal";
import type {
  TeamMember,
  TeamMemberStatus,
} from "../data/teamMembers";
import type { ServiceRequest } from "../data/serviceRequests";
import { translations, type Locale } from "../i18n/translations";

type TeamPageProps = {
  locale: Locale;
  serviceRequests: ServiceRequest[];
  teamMembers: TeamMember[];
  onCreateTeamMember: (data: TeamMemberFormData) => void;
  onUpdateTeamMember: (member: TeamMember) => void;
  onDeleteTeamMember: (memberId: number) => void;
};

export function TeamPage({
  locale,
  serviceRequests,
  teamMembers,
  onCreateTeamMember,
  onUpdateTeamMember,
  onDeleteTeamMember,
}: TeamPageProps) {
  const [isNewMemberOpen, setIsNewMemberOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [memberToRemove, setMemberToRemove] = useState<TeamMember | null>(null);

  const handleSaveTeamMember = (data: TeamMemberFormData) => {
    if (editingMember) {
      const updatedMember: TeamMember = {
        ...editingMember,
        name: data.name,
        role: {
          en: data.roleEn,
          de: data.roleDe,
        },
        email: data.email,
        phone: data.phone,
        status: data.status,
      };

      onUpdateTeamMember(updatedMember);
    } else {
      onCreateTeamMember(data);
    }

    setEditingMember(null);
    setIsNewMemberOpen(false);
  };

  const t = translations[locale].team;

  const getStatusLabel = (status: TeamMemberStatus) => {
    switch (status) {
      case "available":
        return t.statuses.available;
      case "busy":
        return t.statuses.busy;
      case "off":
        return t.statuses.off;
    }
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <section className="teamPage">
      <div className="pageSectionHeader">
        <div>
          <h2>{t.title}</h2>
          <p>{t.description}</p>
        </div>

        <button
          type="button"
          className="addCustomerButton"
          onClick={() => {
            setEditingMember(null);
            setIsNewMemberOpen(true);
          }}
        >
          {t.addMember}
        </button>
      </div>

      <div className="teamSummary">
        <div>
          <strong>{teamMembers.length}</strong>
          <span>{t.members}</span>
        </div>

        <div>
          <strong>
            {
              teamMembers.filter((member) => member.status === "available")
                .length
            }
          </strong>
          <span>{t.statuses.available}</span>
        </div>

        <div>
          <strong>
            {teamMembers.filter((member) => member.status === "busy").length}
          </strong>
          <span>{t.statuses.busy}</span>
        </div>
      </div>

      <div className="teamGrid">
        {teamMembers.map((member) => {
          const openRequests = serviceRequests.filter(
            (request) =>
              request.technician === member.name &&
              request.status !== "completed",
          ).length;

          return (
            <article className="teamCard" key={member.id}>
              <div className="teamCardHeader">
                <div className="teamHeaderTop">
                  <div className="teamAvatar">{getInitials(member.name)}</div>

                  <div className="teamMenuWrapper">
                    <button
                      type="button"
                      className="teamMenuButton"
                      onClick={() =>
                        setOpenMenuId((currentId) =>
                          currentId === member.id ? null : member.id,
                        )
                      }
                      aria-label="Team member actions"
                    >
                      ⋯
                    </button>

                    {openMenuId === member.id && (
                      <div className="teamMenu">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingMember(member);
                            setIsNewMemberOpen(true);
                            setOpenMenuId(null);
                          }}
                        >
                          {t.editMember}
                        </button>

                        <button
                          type="button"
                          className="teamMenuRemove"
                          onClick={() => {
                            setMemberToRemove(member);
                            setOpenMenuId(null);
                          }}
                        >
                          {t.removeMember}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="teamStatusRow">
                  <span className={`teamStatus ${member.status}`}>
                    <span className="teamStatusDot" />
                    {getStatusLabel(member.status)}
                  </span>
                </div>
              </div>

              <div className="teamMemberInfo">
                <h3>{member.name}</h3>
                <p>{locale === "de" ? member.role.de : member.role.en}</p>
              </div>

              <div className="teamWorkload">
                <span>{t.openRequests}</span>
                <strong>{openRequests}</strong>
              </div>

              <div className="teamContact">
                <span>{t.contact}</span>

                <a href={`mailto:${member.email}`}>{member.email}</a>

                <a href={`tel:${member.phone.replace(/\s/g, "")}`}>
                  {member.phone}
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {memberToRemove && (
        <div className="modalOverlay">
          <div className="modal">
            <div className="modalHeader">
              <div>
                <h2>{t.removeConfirmation.title}</h2>
                <p>{t.removeConfirmation.message}</p>
              </div>

              <button
                type="button"
                className="modalCloseButton"
                onClick={() => setMemberToRemove(null)}
                aria-label={t.removeConfirmation.cancel}
              >
                ×
              </button>
            </div>

            <div className="modalActions">
              <button
                type="button"
                className="secondaryButton"
                onClick={() => setMemberToRemove(null)}
              >
                {t.removeConfirmation.cancel}
              </button>

              <button
                type="button"
                className="dangerButton"
                onClick={() => {
                  onDeleteTeamMember(memberToRemove.id);
                  setMemberToRemove(null);
                }}
              >
                {t.removeConfirmation.confirm}
              </button>
            </div>
          </div>
        </div>
      )}

      <NewTeamMemberModal
        isOpen={isNewMemberOpen}
        onClose={() => setIsNewMemberOpen(false)}
        onCreate={handleSaveTeamMember}
        locale={locale}
        editingMember={editingMember}
      />
    </section>
  );
}
