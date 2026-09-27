import { useMemo, useState } from "react";
import {
  customers as initialCustomers,
  type Customer,
} from "../data/customers";
import {
  NewCustomerModal,
  type CustomerFormData,
} from "../components/NewCustomerModal";
import { translations, type Locale } from "../i18n/translations";

type CustomersPageProps = {
  locale: Locale;
};

type StatusFilter = "all" | "active" | "inactive";

export function CustomersPage({ locale }: CustomersPageProps) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);

  const [isNewCustomerOpen, setIsNewCustomerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const t = translations[locale].customers;
  const handleCreateCustomer = (data: CustomerFormData) => {
    const nextId = Math.max(...customers.map((customer) => customer.id)) + 1;

    const newCustomer: Customer = {
      id: nextId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      city: data.city,
      status: data.status,
      openRequests: 0,
    };

    setCustomers((currentCustomers) => [newCustomer, ...currentCustomers]);

    setIsNewCustomerOpen(false);
  };

  const filteredCustomers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(normalizedSearch) ||
        customer.email.toLowerCase().includes(normalizedSearch) ||
        customer.phone.toLowerCase().includes(normalizedSearch) ||
        customer.city.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" || customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [customers, search, statusFilter]);

  return (
    <section className="customersPage">
      <div className="pageSectionHeader">
        <div>
          <h2>{t.title}</h2>
          <p>{t.description}</p>
        </div>

        <button
          type="button"
          className="addCustomerButton"
          onClick={() => setIsNewCustomerOpen(true)}
        >
          {t.addCustomer}
        </button>
      </div>

      <div className="customerToolbar">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={t.searchPlaceholder}
          className="customerSearch"
        />

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value as StatusFilter)
          }
          className="customerFilter"
        >
          <option value="all">{t.filters.all}</option>
          <option value="active">{t.filters.active}</option>
          <option value="inactive">{t.filters.inactive}</option>
        </select>
      </div>

      <div className="requestsPanel customersPanel">
        <div className="tableWrapper">
          <table className="requestsTable customersTable">
            <thead>
              <tr>
                <th>{t.columns.customer}</th>
                <th>{t.columns.contact}</th>
                <th>{t.columns.city}</th>
                <th>{t.columns.openRequests}</th>
                <th>{t.columns.status}</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="customerName">
                      <strong>{customer.name}</strong>
                      <span>#{customer.id}</span>
                    </div>
                  </td>

                  <td>
                    <div className="customerContact">
                      <span>{customer.email}</span>
                      <small>{customer.phone}</small>
                    </div>
                  </td>

                  <td>{customer.city}</td>

                  <td>{customer.openRequests}</td>

                  <td>
                    <span className={`status ${customer.status}`}>
                      {customer.status === "active"
                        ? t.statuses.active
                        : t.statuses.inactive}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <NewCustomerModal
        isOpen={isNewCustomerOpen}
        onClose={() => setIsNewCustomerOpen(false)}
        onCreate={handleCreateCustomer}
        locale={locale}
      />
    </section>
  );
}
