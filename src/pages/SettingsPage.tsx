import { useState } from "react";
import { translations, type Locale } from "../i18n/translations";
import { z } from "zod";

type SettingsPageProps = {
  locale: Locale;
};

type SettingsValidation = {
  companyNameRequired: string;
  invalidEmail: string;
  closingTimeAfterOpening: string;
  checkSettings: string;
};

const createSettingsSchema = (validation: SettingsValidation) =>
  z
    .object({
      companyName: z.string().trim().min(1, validation.companyNameRequired),

      email: z.string().trim().email(validation.invalidEmail),

      phone: z.string(),
      address: z.string(),

      defaultLanguage: z.enum(["en", "de"]),

      openingTime: z.string(),
      closingTime: z.string(),
    })
    .refine((data) => data.openingTime < data.closingTime, {
      message: validation.closingTimeAfterOpening,
      path: ["closingTime"],
    });

export function SettingsPage({ locale }: SettingsPageProps) {
  const t = translations[locale].settings;

  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem("serviceflow-settings");

    if (savedSettings) {
      try {
        return JSON.parse(savedSettings);
      } catch {
        // Use default settings below
      }
    }

    return {
      companyName: "ServiceFlow GmbH",
      email: "info@serviceflow.de",
      phone: "+49 621 555 0100",
      address: "Mannheim, Germany",
      defaultLanguage: locale,
      openingTime: "08:00",
      closingTime: "18:00",
    };
  });
  const [isSaved, setIsSaved] = useState(false);
  const [settingsError, setSettingsError] = useState("");

  const handleSaveSettings = () => {
    const settingsSchema = createSettingsSchema(
      translations[locale].settings.validation,
    );
    const result = settingsSchema.safeParse(settings);
    if (!result.success) {
      setIsSaved(false);

      setSettingsError(
        result.error.issues[0]?.message || t.validation.checkSettings,
      );

      window.setTimeout(() => {
        setSettingsError("");
      }, 3000);

      return;
    }

    localStorage.setItem("serviceflow-settings", JSON.stringify(result.data));

    setSettings(result.data);
    setSettingsError("");
    setIsSaved(true);

    window.setTimeout(() => {
      setIsSaved(false);
    }, 2500);
  };

  return (
    <section className="settingsPage">
      <div className="pageSectionHeader">
        <div>
          <h2>{t.title}</h2>
          <p>{t.description}</p>
        </div>
      </div>

      <div className="settingsGrid">
        <section className="settingsCard">
          <div className="settingsCardHeader">
            <h3>{t.company.title}</h3>
            <p>{t.company.description}</p>
          </div>

          <div className="settingsFormGrid">
            <div className="formField">
              <label htmlFor="companyName">{t.company.companyName}</label>
              <input
                id="companyName"
                type="text"
                value={settings.companyName}
                onChange={(event) =>
                  setSettings({
                    ...settings,
                    companyName: event.target.value,
                  })
                }
              />
            </div>

            <div className="formField">
              <label htmlFor="companyEmail">{t.company.email}</label>
              <input
                id="companyEmail"
                type="email"
                value={settings.email}
                onChange={(event) =>
                  setSettings({
                    ...settings,
                    email: event.target.value,
                  })
                }
              />
            </div>

            <div className="formField">
              <label htmlFor="companyPhone">{t.company.phone}</label>
              <input
                id="companyPhone"
                type="tel"
                value={settings.phone}
                onChange={(event) =>
                  setSettings({
                    ...settings,
                    phone: event.target.value,
                  })
                }
              />
            </div>

            <div className="formField">
              <label htmlFor="companyAddress">{t.company.address}</label>
              <input
                id="companyAddress"
                type="text"
                value={settings.address}
                onChange={(event) =>
                  setSettings({
                    ...settings,
                    address: event.target.value,
                  })
                }
              />
            </div>
          </div>
        </section>

        <section className="settingsCard">
          <div className="settingsCardHeader">
            <h3>{t.preferences.title}</h3>
            <p>{t.preferences.description}</p>
          </div>

          <div className="formField">
            <label htmlFor="defaultLanguage">
              {t.preferences.defaultLanguage}
            </label>

            <select
              id="defaultLanguage"
              value={settings.defaultLanguage}
              onChange={(event) =>
                setSettings({
                  ...settings,
                  defaultLanguage: event.target.value,
                })
              }
            >
              {" "}
              <option value="de">{t.preferences.german}</option>
              <option value="en">{t.preferences.english}</option>
            </select>
          </div>
        </section>

        <section className="settingsCard">
          <div className="settingsCardHeader">
            <h3>{t.business.title}</h3>
            <p>{t.business.description}</p>
          </div>

          <div className="settingsFormGrid">
            <div className="formField">
              <label htmlFor="openingTime">{t.business.openingTime}</label>
              <input
                id="openingTime"
                type="time"
                value={settings.openingTime}
                onChange={(event) =>
                  setSettings({
                    ...settings,
                    openingTime: event.target.value,
                  })
                }
              />{" "}
            </div>

            <div className="formField">
              <label htmlFor="closingTime">{t.business.closingTime}</label>
              <input
                id="closingTime"
                type="time"
                value={settings.closingTime}
                onChange={(event) =>
                  setSettings({
                    ...settings,
                    closingTime: event.target.value,
                  })
                }
              />{" "}
            </div>
          </div>
        </section>

        <div className="settingsActions">
          {isSaved && (
            <span className="settingsSavedMessage">
              <span className="settingsSavedIcon">✓</span>
              {t.saved}
            </span>
          )}
          {settingsError && (
            <span className="settingsErrorMessage">
              <span className="settingsErrorIcon">!</span>
              {settingsError}
            </span>
          )}
          <button
            type="button"
            className="submitRequestButton"
            onClick={handleSaveSettings}
          >
            {t.save}
          </button>
        </div>
      </div>
    </section>
  );
}
