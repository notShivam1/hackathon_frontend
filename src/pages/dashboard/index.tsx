import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getRoleFromToken } from "@/utils/auth";
import API from "@/lib/axios";

export default function DashboardPage() {
  const router = useRouter();
  const [role, setRole] = useState<"CANDIDATE" | "EMPLOYER" | null>(null);

  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const r = getRoleFromToken();
    if (!r) {
      router.push("/auth/login");
    } else {
      setRole(r);
      setLoading(false);
    }
  }, [router]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!resumeFile) {
        alert("Please upload a resume");
        return;
      }

      const formData = new FormData();
      formData.append("file", resumeFile);
      formData.append("fullName", fullName);

      await API.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Resume uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Error uploading resume");
    }
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/job", { title, description, requirements });
      alert("Job posted!");
    } catch (err) {
      console.error(err);
      alert("Error posting job");
    }
  };

  if (!role) {
    return <div>Loading...</div>;
  }

  if (loading || !role) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {role === "CANDIDATE" ? (
          <form onSubmit={handleProfileSubmit} style={styles.form}>
            <h1 style={styles.title}>Create Your Profile</h1>
            <div style={styles.field}>
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Upload Resume (PDF)</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                style={styles.input}
                required
              />
            </div>
            <button type="submit" style={styles.button}>
              Save Profile
            </button>
          </form>
        ) : (
          <form onSubmit={handleJobSubmit} style={styles.form}>
            <h1 style={styles.title}>Post a New Job</h1>

            <div style={styles.field}>
              <label style={styles.label}>Job Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ ...styles.input, height: "100px" }}
                required
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Requirements</label>
              <textarea
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                style={{ ...styles.input, height: "100px" }}
                required
              />
            </div>

            <button type="submit" style={styles.button}>
              Post Job
            </button>
          </form>
        )}
        {role === "CANDIDATE" && (
          <a
            href="/matches/candidate"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            View Recommended Jobs →
          </a>
        )}

        {role === "EMPLOYER" && (
          <a
            href="/jobs"
            style={{
              display: "block",
              marginTop: "20px",
              color: "blue",
              textDecoration: "underline",
            }}
          >
            View All Posted Jobs →
          </a>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    paddingTop: "50px",
    background: "#f5f5f5",
  },
  container: {
    width: "100%",
    maxWidth: "500px",
    background: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  },
  form: {},
  title: {
    fontSize: "22px",
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
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    marginTop: "10px",
    width: "100%",
    padding: "12px",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontWeight: 600,
    cursor: "pointer",
  },
};
