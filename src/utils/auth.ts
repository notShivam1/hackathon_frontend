export function getRoleFromToken(): "CANDIDATE" | "EMPLOYER" | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role;
    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}
