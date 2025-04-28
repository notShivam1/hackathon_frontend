import { useState } from "react";
import { useRouter } from "next/router";
import API from "@/lib/axios";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CANDIDATE");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await API.post("/auth/register", { email, password, role });
      router.push("/auth/login");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleRegister} style={styles.form}>
        <h1 style={styles.title}>Register</h1>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.field}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Password</label>
          <input
            // type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.input}
          >
            <option value="CANDIDATE">Candidate</option>
            <option value="EMPLOYER">Employer</option>
          </select>
        </div>

        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f3f3f3",
  },
  form: {
    background: "white",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    fontSize: "24px",
    fontWeight: 700,
    marginBottom: "20px",
    textAlign: "center",
  },
  field: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: "10px",
  },
  error: {
    color: "red",
    marginBottom: "10px",
    textAlign: "center",
  },
};
