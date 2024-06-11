"use client";
import React, { useState, useEffect } from "react";
import { createCategoryServer, deleteCategoryServer, fetchCategoriesServer } from "../server_calls";
import { BackgroundGradient } from "../components/ui/background-gradient";

interface Category {
  name: string;
}

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createCategory = async (name: string) => {
    await createCategoryServer(name);
    setRefreshCounter(prev => prev + 1);
  };


  const handleCreateCategory = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createCategory(newCategoryName);
  };

  const handleDeleteCategory = async (name: string) => {
    await deleteCategoryServer(name);
    setRefreshCounter(prev => prev + 1);
  };

  const fetchCategories = async () => {
    const data = await fetchCategoriesServer();
    setCategories(data.categories);
  }
  useEffect(() => {
    fetchCategories()
  }, [refreshCounter]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="mb-6">
          <form onSubmit={handleCreateCategory} className="flex flex-col items-center">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="New category name"
              required
              className="rounded-full px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700 my-2"
            />
            <button type="submit"
              className="rounded-full px-4 py-2 text-white bg-black text-xs font-bold dark:bg-zinc-800">
              Create Category
            </button>
          </form>
        </div>
        <div className="flex flex-row flex-wrap justify-center gap-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            categories.map((category, index) => (
              <BackgroundGradient key={index} className="flex flex-col items-center justify-center rounded-[22px] w-full sm:max-w-xs p-4 sm:p-10 bg-white dark:bg-zinc-900">
                <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200 text-center">
                  {category.name}
                </p>
                <button onClick={() => handleDeleteCategory(category.name)}
                  className="rounded-full px-4 py-2 text-white bg-black text-xs font-bold dark:bg-zinc-800 w-full mt-4">
                  Delete
                </button>
              </BackgroundGradient>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;