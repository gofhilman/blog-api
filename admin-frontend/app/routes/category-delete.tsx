import { deleteCategory } from "~/api/categoriesApi";
import type { Route } from "./+types/category-delete";
import { data } from "react-router";

export async function clientAction({ params }: Route.ActionArgs) {
  try {
    return await deleteCategory(params.categoryUri);
  } catch (error: any) {
    const errors = await error.json();
    return data({ errors }, { status: error.status });
  }
}
