'use client';
import { useState, useEffect } from "react";
import { Product } from "./lib/types";
import ProductCard from "./components/ProductCard";
import ProductForm from "./components/ProductForm";
import CategoryFilter from "./components/CategoryFilter";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("all");

  // Fetch products on mount
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        const cats = Array.from(new Set(data.map((p) => p.category))) as string[];
        setCategories(cats);
      });
  }, []);

  // Add new product
  const handleAdd = (p: Product) => setProducts((prev) => [...prev, p]);
  const handleNewCategory = (cat: string) =>
    setCategories((prev) => (prev.includes(cat) ? prev : [...prev, cat]));

  // Filter logic
  const filtered =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-zinc-50 dark:bg-black py-16 px-6 font-sans">
      <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-10">
        Product Catalog
      </h1>

      <ProductForm
        onAdd={handleAdd}
        onNewCategory={handleNewCategory}
        categories={categories}
      />

      <CategoryFilter
        categories={categories}
        active={category}
        onChange={setCategory}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
        {filtered.length === 0 && (
          <p className="text-zinc-500 dark:text-zinc-400 col-span-full text-center">
            No products found in this category.
          </p>
        )}
      </div>
    </div>
  );
}
