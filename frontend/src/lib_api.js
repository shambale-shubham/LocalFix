// src/lib_api.js

const configured = (import.meta.env.VITE_API_URL || "http://localhost:5001").replace(/\/$/, "");

export async function apiFetch(path, options = {}) {
  // Handle both absolute and relative paths
  let cleanPath = path;
  
  // If path is absolute URL, extract pathname and search
  if (path.startsWith("http")) {
    const url = new URL(path);
    cleanPath = url.pathname + url.search;
  }
  
  // Ensure path starts with /
  if (!cleanPath.startsWith("/")) {
    cleanPath = "/" + cleanPath;
  }

  const fullUrl = `${configured}${cleanPath}`;
  console.log(`🌐 API Request: ${fullUrl}`);

  try {
    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    
    console.log(`📡 API Response: ${response.status} ${response.statusText}`);
    return response;
  } catch (error) {
    console.error(`❌ API Error: ${error.message}`);
    throw new Error(
      `Cannot connect to the backend at ${configured}. Make sure the backend is running. Error: ${error.message}`
    );
  }
}

export const API_URL = configured;