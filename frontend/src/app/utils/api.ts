export async function ApiCall({ url, method, body }: { url: string; method: string; body?: any }) {
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include", // Allows cookies (if authentication is session-based)
      });
  
      const contentType = response.headers.get("content-type");
  
      if (!response.ok) {
        // Ensure API returns JSON
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Something went wrong");
        } else {
          throw new Error(`Unexpected response from server: ${response.status}`);
        }
      }
  
      return await response.json();
    } catch (err: any) {
      console.error("API Error:", err.message);
      throw new Error(err.message);
    }
  }
  