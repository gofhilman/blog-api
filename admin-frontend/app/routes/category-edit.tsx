import { putCategory } from "~/api/categoriesApi";
import type { Route } from "./+types/category-edit";
import { data } from "react-router";

export async function clientAction({ params, request }: Route.ActionArgs) {
  const formData = await request.formData();
  try {
    return await putCategory(params.categoryUri, formData.get("name"));
  } catch (error: any) {
    const errors = await error.json();
    return data({ errors }, { status: error.status });
  }
}
