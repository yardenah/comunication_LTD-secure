export const API_URL = "http://localhost:5000/api";

// Login user 
export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data; 
}

// Register user 
export async function registerUser(userData) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}


// Change password
export async function changePassword(email,oldPassword, newPassword) {
  const res = await fetch(`${API_URL}/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email,oldPassword, newPassword }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

// Request reset password
export async function requestPasswordReset(email) {
  const res = await fetch(`${API_URL}/request-reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to send reset token');
  }
  return data;
}

// Reset password
export async function resetPassword({ email, token, newPassword }) {
  const res = await fetch(`${API_URL}/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, token, newPassword }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to reset password');
  }
  return data;
}

// Get all clients
export async function getClients() {
  const res = await fetch(`${API_URL}/clients`);
  if (!res.ok) {
    throw new Error("Failed to fetch clients");
  }
  return await res.json();
}

// Search clients by query
// export async function searchClients(query) {
//   const res = await fetch(`${API_URL}/clients/search?query=${encodeURIComponent(query)}`);
//   if (!res.ok) {
//     throw new Error("Failed to search clients");
//   }
//   return await res.json();
// }

// Add new client
export async function addClient(clientData) {
  const res = await fetch(`${API_URL}/clients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clientData),
  });

  if (!res.ok) {
    throw new Error("Failed to add client");
  }
  return await res.json();
}

// Logout user
export function logoutUser() {
  localStorage.removeItem("token");
}
