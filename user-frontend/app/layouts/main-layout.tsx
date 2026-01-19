import type { Route } from "./+types/main-layout";
import { getCategories } from "~/api/categoriesApi";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { Outlet } from "react-router";

export async function clientLoader() {
  const { categories } = await getCategories();
  return { categories };
}

export default function MainLayout({ loaderData }: Route.ComponentProps) {
  const { categories } = loaderData;

  return (
    <div className="flex min-h-screen flex-col px-5 py-12">
      <Header />
      <Outlet />
      <Footer categories={categories} />
    </div>
  );
}
