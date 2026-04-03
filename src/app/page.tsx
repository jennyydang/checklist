"use client";

import { useState, useRef } from "react";

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export default function Home() {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addItem = () => {
    const text = inputValue.trim();
    if (!text) return;
    setItems((prev) => [
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: Date.now(),
      },
      ...prev,
    ]);
    setInputValue("");
    inputRef.current?.focus();
  };

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCompleted = () => {
    setItems((prev) => prev.filter((item) => !item.completed));
  };

  const completedCount = items.filter((i) => i.completed).length;
  const remainingCount = items.length - completedCount;

  return (
    <main className="min-h-screen flex items-start justify-center px-4 py-12 sm:py-20">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Checklist
          </h1>
          {items.length > 0 && (
            <p className="mt-2 text-sm text-gray-500">
              {remainingCount === 0
                ? "All done!"
                : `${remainingCount} item${remainingCount !== 1 ? "s" : ""} remaining`}
            </p>
          )}
        </div>

        {/* Input */}
        <div className="flex gap-2 mb-6">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addItem()}
            placeholder="Add a new item..."
            className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-sm outline-none ring-0 transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
          <button
            onClick={addItem}
            disabled={!inputValue.trim()}
            className="rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Add
          </button>
        </div>

        {/* List */}
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white py-16 text-center shadow-sm">
            <div className="text-4xl mb-3">✓</div>
            <p className="text-sm text-gray-400">Nothing here yet. Add something above!</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="group flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm transition hover:border-gray-200"
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleItem(item.id)}
                  aria-label={item.completed ? "Mark incomplete" : "Mark complete"}
                  className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                    item.completed
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {item.completed && (
                    <svg
                      className="h-3 w-3 text-white"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>

                {/* Text */}
                <span
                  className={`flex-1 text-sm transition-all ${
                    item.completed
                      ? "text-gray-400 line-through"
                      : "text-gray-800"
                  }`}
                >
                  {item.text}
                </span>

                {/* Delete */}
                <button
                  onClick={() => deleteItem(item.id)}
                  aria-label="Delete item"
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-gray-300 opacity-0 transition hover:bg-red-50 hover:text-red-400 group-hover:opacity-100"
                >
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 4l8 8M12 4l-8 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Footer actions */}
        {completedCount > 0 && (
          <div className="mt-4 text-center">
            <button
              onClick={clearCompleted}
              className="text-xs text-gray-400 underline-offset-2 transition hover:text-red-400 hover:underline"
            >
              Clear {completedCount} completed item{completedCount !== 1 ? "s" : ""}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
