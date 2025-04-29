import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import API from "@/lib/axios";

export default function JobMatchesPage() {
  const router = useRouter();
  const { jobId } = router.query;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    if (!jobId) return;

    const fetchMatches = async () => {
      try {
        const res = await API.get(`/matches/job/${jobId}`);
        setMatches(res.data);
        /* eslint-disable @typescript-eslint/no-explicit-any */
      } catch (err) {
        console.error(err);
      }
    };

    fetchMatches();
  }, [jobId]);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "40px" }}>
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Matched Candidates
      </h1>
      {matches.length === 0 ? (
        <p>No candidates matched this job yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {matches.map((match, i) => (
            <li
              key={i}
              style={{
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "16px",
                marginBottom: "20px",
                background: "#f9f9f9",
              }}
            >
              <h3 style={{ marginBottom: "6px", color: "#333" }}>
                {match.candidate.profile?.fullName || "Unnamed"}
              </h3>
              <p style={{ marginBottom: "8px", color: "#555" }}>
                {match.candidate.email}
              </p>

              <div style={{ fontSize: "14px", color: "#888" }}>
                Match Score: {match.score}%
              </div>
              <div
                style={{
                  background: "#e0e0e0",
                  borderRadius: "4px",
                  height: "8px",
                  overflow: "hidden",
                  marginTop: "4px",
                }}
              >
                <div
                  style={{
                    width: `${match.score}%`,
                    background: match.score > 75 ? "#4caf50" : "#ff7043",
                    height: "100%",
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
