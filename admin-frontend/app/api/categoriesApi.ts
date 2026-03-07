import { jsonContentJwtHeaders, jwtHeaders } from "~/lib/httpHeaders";
import throwError from "./throwError";
import { fetchWithRetry } from "./fetchWithRetry";

const categoriesUrl = import.meta.env.VITE_API_ROOT_URL + "/categories/";

async function getCategories() {
  const response = await fetchWithRetry(categoriesUrl);
  if (!response.ok) await throwError(response);
  return await response.json();
}

async function putCategory(categoryUri: any, name: any) {
  const headers = jsonContentJwtHeaders(new Headers());
  const response = await fetchWithRetry(categoriesUrl + categoryUri, {
    method: "PUT",
    headers,
    body: JSON.stringify({ name }),
  });
  if (!response.ok) await throwError(response);
  return await response.json();
}

async function deleteCategory(categoryUri: any) {
  const headers = jwtHeaders(new Headers());
  const response = await fetchWithRetry(categoriesUrl + categoryUri, {
    method: "DELETE",
    headers,
  });
  if (!response.ok) await throwError(response);
  return await response.json();
}

export { getCategories, putCategory, deleteCategory };
