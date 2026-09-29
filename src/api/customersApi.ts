import {
  customers as initialCustomers,
  type Customer,
} from "../data/customers";

const STORAGE_KEY = "serviceflow-customers";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function readCustomers(): Customer[] {
  const savedCustomers = localStorage.getItem(STORAGE_KEY);

  if (savedCustomers) {
    try {
      const parsedCustomers = JSON.parse(savedCustomers);

      if (Array.isArray(parsedCustomers)) {
        return parsedCustomers as Customer[];
      }
    } catch {
      // Fall back to initial mock data
    }
  }

  return initialCustomers;
}

export async function getCustomers(): Promise<Customer[]> {
  await delay(600);

  return readCustomers();
}

export async function createCustomer(
  customer: Customer,
): Promise<Customer> {
  await delay(400);

  const currentCustomers = readCustomers();
  const updatedCustomers = [customer, ...currentCustomers];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCustomers));

  return customer;
}
