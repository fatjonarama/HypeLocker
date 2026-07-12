export type ProductDTO = {
  id: number;
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  gender: string;
  priceCents: number;
  compareAtCents: number | null;
  description: string;
  images: string[];
  sizes: string[];
  stock: number;
  isNew: boolean;
  active: boolean;
};
