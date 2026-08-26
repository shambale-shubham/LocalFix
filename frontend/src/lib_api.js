const configured = (import.meta.env.VITE_API_URL || "http://localhost:5001").replace(/\/$/, "");

export async function apiFetch(path, options = {}) {
  const cleanPath = path.startsWith("http") ? new URL(path).pathname + new URL(path).search : path;

  try {
    const response = await fetch(`${configured}${cleanPath}`, options);
    return response;
  } catch (error) {
    throw new Error(
      `Cannot connect to the backend at ${configured}. Make sure the backend is running. Error: ${error.message}`
    );
  }
}

export const API_URL = configured;
