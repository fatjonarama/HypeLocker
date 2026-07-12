import { notFound } from "next/navigation";
import { getProductByIdForAdmin } from "@/lib/admin-queries";
import { AdminProductForm } from "@/components/AdminProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductByIdForAdmin(parseInt(id, 10));
  if (!product) notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl uppercase mb-8">Edit Product</h1>
      <AdminProductForm product={product} />
    </main>
  );
}
