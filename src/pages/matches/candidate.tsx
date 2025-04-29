import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import API from "@/lib/axios";

export default function CandidateMatchesPage() {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [matches, setMatches] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fetchMatches = async () => {
      try {
        const res = await API.get("/matches/candidate");
        setMatches(res.data);
        /* eslint-disable @typescript-eslint/no-explicit-any */
      } catch (err) {
        console.error(err);
        router.push("/auth/login");
      }
    };

    fetchMatches();
  }, [router]);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "40px" }}>
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Recommended Jobs
      </h1>
      {matches.length === 0 ? (
        <p>No matches yet. Upload your resume first.</p>
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
              <h3 style={{ marginBottom: "8px", color: "#333" }}>
                {match.job.title}
              </h3>
              <p style={{ marginBottom: "10px", color: "#555" }}>
                {match.job.description}
              </p>

              <div style={{ marginTop: "10px" }}>
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
                      background: match.score > 75 ? "#4caf50" : "#ffa726",
                      height: "100%",
                    }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
