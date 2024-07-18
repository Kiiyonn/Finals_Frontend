const apiUrl = 'https://finals-backend-dr62.onrender.com/api';


// Utility function to make authenticated HTTP requests with a JSON web token (JWT)
export const fetchWithToken = async (url, method = "GET", body = null) => {
  // Retrieve the JWT from local storage
  const token = localStorage.getItem("jwtToken");

  // Construct headers to include the JWT and set content type to JSON
  const headers = {
    Authorization: `Bearer ${token}`, // Bearer token for authorization
    "Content-Type": "application/json", // Content type set to JSON for the body payload
  };

  // Configure the fetch request with method, headers, and body
  const config = {
    method, // HTTP method (GET, POST, etc.)
    headers, // Headers including authorization and content type
    body: body ? JSON.stringify(body) : null, // Convert body object to JSON string if body is not null
  };

  // Perform the fetch request using the provided URL and configuration
  const fullUrl = apiUrl + url; // Construct full URL
  const response = await fetch(url, config);
  // Throw an error if the response is not OK (HTTP status 200-299)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  // Return the parsed JSON from the response
  return await response.json();
};

export default apiUrl;
