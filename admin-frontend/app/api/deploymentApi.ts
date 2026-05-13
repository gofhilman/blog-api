import { jwtHeaders } from "~/lib/httpHeaders";
import { fetchWithRetry } from "./fetchWithRetry";
import throwError from "./throwError";

const deploymentUrl = import.meta.env.VITE_API_ROOT_URL + "/deployment/";

async function getLatestDeployment() {
  const response = await fetchWithRetry(deploymentUrl + "latest");
  if (!response.ok) await throwError(response);
  return await response.json();
}

async function postDeployment() {
  const headers = jwtHeaders(new Headers());
  const response = await fetchWithRetry(deploymentUrl, {
    method: "POST",
    headers,
  });
  if (!response.ok) await throwError(response);
  return await response.json();
}

export { getLatestDeployment, postDeployment };
