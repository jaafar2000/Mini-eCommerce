'use client';

import { Product } from "../lib/types";
type Props = {
  product: Product;
  onDelete: (id: number) => void;
};

export default function ProductCard({ product, onDelete }: Props) {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 bg-white dark:bg-zinc-900 transition hover:shadow-md flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold text-black dark:text-zinc-50">
          {product.name}
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          {product.category} — ${product.price}
        </p>
      </div>

      <button
        onClick={() => {
          if (confirm(`Delete "${product.name}"?`)) onDelete(product.id);
        }}
        className="mt-4 text-sm text-red-500 hover:text-red-700 self-end"
      >
        Delete
      </button>
    </div>
  );
}
