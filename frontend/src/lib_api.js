const configured = (import.meta.env.VITE_API_URL || "http://localhost:5001").replace(/\/$/, "");

// Try the configured port plus the ports used by earlier LocalFix builds.
const API_CANDIDATES = [...new Set([
  configured,
  "https://localfix-gv9q.onrender.com",
  "https://localfix-gv9q.onrender.com/api",
  "https://localfix-gv9q.onrender.com/api/",
  "https://localfix-gv9q.onrender.com/",
])].filter(Boolean);

export async function apiFetch(path, options = {}) {
  const cleanPath = path.startsWith("http") ? new URL(path).pathname + new URL(path).search : path;
  let lastError;

  for (const base of API_CANDIDATES) {
    try {
      const response = await fetch(`${base}${cleanPath}`, options);
      return response;
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(
    `Cannot connect to the backend. Start it with "cd backend && npm install && npm run dev". Tried: ${API_CANDIDATES.join(", ")}`
  );
}

export const API_URL = configured;
