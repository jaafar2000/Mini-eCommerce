"use client";
import { useState } from "react";
import { Product } from "../lib/types";

type Props = {
  onAdd: (product: Product) => void;
  onNewCategory: (category: string) => void;
  categories: string[];
};

export default function ProductForm({
  onAdd,
  onNewCategory,
  categories,
}: Props) {
  const [form, setForm] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    category: "",
    in_stock: true,
  });
  const [inStock, SetInStock] = useState<boolean>(true);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.price < 0) {
      alert("Price cannot be negative.");
      return;
    }
    // sanitize strings before sending
    const sanitized = {
      ...form,
      name: form.name.trim(),
      category: form.category.trim(),
      in_stock: inStock,
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sanitized),
    });

    const data: Product = await res.json();
    onAdd(data);

    if (!categories.includes(sanitized.category)) {
      onNewCategory(sanitized.category);
    }

    setForm({ name: "", price: 0, category: "", in_stock: true });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="mb-10 flex flex-col sm:flex-row flex-wrap gap-3 w-full max-w-4xl"
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
        type="button"
        className="w-[100px] cursor-pointer hover:bg-white bg-zinc-800 hover:text-black rounded ease-in-out duration-500 "
        onClick={() => SetInStock((prev) => !prev)}
      >
        {inStock ? "in stock" : "out of stock"}
      </button>
      <button
        type="submit"
        className="bg-zinc-800 cursor-pointer text-white px-4 py-2 rounded hover:bg-white hover:text-black  duration-500 transition"
      >
        Add Product
      </button>
    </form>
  );
}
