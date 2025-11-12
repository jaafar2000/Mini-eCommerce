'use client';

type Props = {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
};

export default function CategoryFilter({ categories, active, onChange }: Props) {
  return (
    <div className="mb-8 flex flex-wrap gap-3">
      <button
        onClick={() => onChange("all")}
        className={`px-4 py-2 rounded-full border ${
          active === "all"
            ? "bg-black text-white dark:bg-white dark:text-black"
            : "border-zinc-300 text-zinc-700 dark:text-zinc-300"
        }`}
      >
        All
      </button>
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`px-4 py-2 rounded-full border ${
            active === c
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "border-zinc-300 text-zinc-700 dark:text-zinc-300"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
