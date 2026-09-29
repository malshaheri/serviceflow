export type Settings = {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  defaultLanguage: "en" | "de";
  openingTime: string;
  closingTime: string;
};

const STORAGE_KEY = "serviceflow-settings";

const defaultSettings: Settings = {
  companyName: "ServiceFlow GmbH",
  email: "info@serviceflow.de",
  phone: "+49 621 555 0100",
  address: "Mannheim, Germany",
  defaultLanguage: "en",
  openingTime: "08:00",
  closingTime: "18:00",
};

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

function readSettings(): Settings {
  const savedSettings = localStorage.getItem(STORAGE_KEY);

  if (savedSettings) {
    try {
      const parsedSettings = JSON.parse(savedSettings);

      return {
        ...defaultSettings,
        ...parsedSettings,
      };
    } catch {
      // Fall back to default settings
    }
  }

  return defaultSettings;
}

export async function getSettings(): Promise<Settings> {
  await delay(400);

  return readSettings();
}

export async function updateSettings(
  settings: Settings,
): Promise<Settings> {
  await delay(400);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));

  return settings;
}
