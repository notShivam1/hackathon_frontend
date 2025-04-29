import { useEffect, useState } from "react";
import API from "@/lib/axios";

export default function EmployerJobList() {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/job");
        setJobs(res.data);
        /* eslint-disable @typescript-eslint/no-explicit-any */
      } catch (err) {
        console.error(err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px" }}>
      <h1
        style={{ fontSize: "26px", fontWeight: "bold", marginBottom: "30px" }}
      >
        Your Posted Jobs
      </h1>

      {jobs.length === 0 ? (
        <p>You havent posted any jobs yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {jobs.map((job) => (
            <li
              key={job.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                marginBottom: "20px",
                backgroundColor: "#fafafa",
              }}
            >
              <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>
                {job.title}
              </h2>
              <p style={{ color: "#555", marginBottom: "12px" }}>
                {job.description.length > 120
                  ? job.description.slice(0, 120) + "..."
                  : job.description}
              </p>
              <a
                href={`/matches/employer/${job.id}`}
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  color: "#0070f3",
                  textDecoration: "underline",
                  fontWeight: "bold",
                }}
              >
                View Matches →
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
