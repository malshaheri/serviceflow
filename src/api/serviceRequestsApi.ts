import {
  serviceRequests as initialServiceRequests,
  type ServiceRequest,
} from "../data/serviceRequests";

const STORAGE_KEY = "serviceflow-service-requests";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function readServiceRequests(): ServiceRequest[] {
  const savedRequests = localStorage.getItem(STORAGE_KEY);

  if (savedRequests) {
    try {
      const parsedRequests = JSON.parse(savedRequests);

      if (Array.isArray(parsedRequests)) {
        return parsedRequests as ServiceRequest[];
      }
    } catch {
      // Fall back to initial mock data
    }
  }

  return initialServiceRequests;
}

export async function getServiceRequests(): Promise<ServiceRequest[]> {
  await delay(600);

  return readServiceRequests();
}

export async function createServiceRequest(
  request: ServiceRequest,
): Promise<ServiceRequest> {
  await delay(400);

  const currentRequests = readServiceRequests();
  const updatedRequests = [request, ...currentRequests];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRequests));

  return request;
}
