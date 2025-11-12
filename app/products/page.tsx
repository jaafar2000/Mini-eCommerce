'use client';
import { useState, useEffect } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  in_stock?: boolean;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<string>('all');
  const [form, setForm] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    category: '',
  });

  // Fetch products and categories
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        const cats = Array.from(new Set(data.map((p) => p.category))) as string[];
        setCategories(cats);
      });
  }, []);

  // Add new product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.price) return;
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data: Product = await res.json();
    setProducts((prev) => [...prev, data]);
    if (!categories.includes(form.category)) {
      setCategories((prev) => [...prev, form.category]);
    }
    setForm({ name: '', price: 0, category: '' });
  };

  // Filter products by category
  const filtered =
    category === 'all'
      ? products
      : products.filter((p) => p.category === category);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-zinc-50 dark:bg-black py-16 px-6 font-sans">
      <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-10">
        Product Catalog
      </h1>

      {/* Add Product Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-10 flex flex-col sm:flex-row flex-wrap gap-3 w-full max-w-3xl"
      >
        <input
          placeholder="Product name"
          className="border p-2 rounded w-full sm:flex-1"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Price"
          type="number"
          className="border p-2 rounded w-full sm:w-32"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: parseFloat(e.target.value) || 0 })
          }
          required
        />
        <input
          placeholder="Category"
          className="border p-2 rounded w-full sm:w-40"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-zinc-800 transition"
        >
          Add Product
        </button>
      </form>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-3">
        <button
          onClick={() => setCategory('all')}
          className={`px-4 py-2 rounded-full border ${
            category === 'all'
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : 'border-zinc-300 text-zinc-700 dark:text-zinc-300'
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-full border ${
              category === c
                ? 'bg-black text-white dark:bg-white dark:text-black'
                : 'border-zinc-300 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 bg-white dark:bg-zinc-900"
          >
            <h2 className="text-lg font-semibold text-black dark:text-zinc-50">
              {p.name}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {p.category} — ${p.price}
            </p>
          </div>
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
