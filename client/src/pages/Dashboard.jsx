import { useState, useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { getClients, searchClients, addClient, logoutUser } from "../api";

export default function ClientsPage() {
  const [clientData, setClientData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const data = await getClients();
      setClients(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchClients();
      return;
    }
    setLoading(true);
    try {
      const data = await searchClients(searchQuery);
      setClients(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clientData.fullName.trim()) {
      alert("Please enter full name");
      return;
    }

    if (
      clientData.email &&
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(clientData.email)
    ) {
      alert("Please enter a valid email");
      return;
    }

    setLoading(true);
    try {
      const response = await addClient(clientData);
      alert(
        `New customer ${response.first_name} ${response.last_name} has been added successfully!`
      );
      setClientData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
      });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="top-bar">
        <Button text="Logout" onClick={handleLogout} className="logout-button" />
      </div>

      <h1>Clients Management</h1>

      <section className="form-section">
        <form onSubmit={handleSubmit} className="client-form">
          <Input
            label="Full Name"
            name="fullName"
            type="text"
            value={clientData.fullName}
            onChange={handleChange}
            className="form-input"
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={clientData.email}
            onChange={handleChange}
            className="form-input"
          />
          <Input
            label="Phone"
            name="phone"
            type="text"
            value={clientData.phone}
            onChange={handleChange}
            className="form-input"
          />
          <Input
            label="Address"
            name="address"
            type="text"
            value={clientData.address}
            onChange={handleChange}
            className="form-input"
          />

          {loading ? (
            <button className="spinner-button" disabled>
              <div className="spinner"></div>
            </button>
          ) : (
            <Button text="Add Client" className="submit-button" />
          )}
        </form>
      </section>

      <section className="clients-list-section">
        <h2>Client List</h2>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search clients"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button text="Search" onClick={handleSearch} />
        </div>

        {loading && clients.length === 0 ? (
          <p>Loading clients...</p>
        ) : clients.length === 0 ? (
          <p>No clients found.</p>
        ) : (
          <ul className="client-list">
            {clients.map((client) => (
              <li key={client.id} className="client-item">
                <strong>{client.full_name}</strong> - {client.email || "No Email"}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
