import { fetchWithRetry } from "./fetchWithRetry";
import throwError from "./throwError";

const commentsUrl = import.meta.env.VITE_API_ROOT_URL + "/comments/";

async function getUnreadComments() {
  const response = await fetchWithRetry(commentsUrl + "unread");
  if (!response.ok) await throwError(response);
  return await response.json();
}

export { getUnreadComments };
