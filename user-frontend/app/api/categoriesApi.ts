import throwError from "./throwError";

const categoriesUrl = import.meta.env.VITE_API_ROOT_URL + "/categories/";

async function getCategories() {
  const response = await fetch(categoriesUrl);
  if (!response.ok) await throwError(response);
  return await response.json();
}

export { getCategories };
