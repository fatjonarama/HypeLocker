import { AdminProductForm } from "@/components/AdminProductForm";

export default function NewProductPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl uppercase mb-8">Add Product</h1>
      <AdminProductForm />
    </main>
  );
}
