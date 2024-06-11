"use client";
import React, { useState, useEffect } from "react";
import { createCategoryServer, deleteCategoryServer, fetchCategoriesServer } from "../server_calls";
import { BackgroundGradient } from "../components/ui/background-gradient";
import { FaArrowLeft } from "react-icons/fa";

interface Category {
  name: string;
}

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

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
  };

  useEffect(() => {
    fetchCategories();
  }, [refreshCounter]);

  const handleGoBack = () => {
    window.history.back(); // Fallback mechanism to handle navigation if useRouter is not available
  };

  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center">
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 flex items-center space-x-2 rounded-full px-3 py-1 text-white bg-black border border-white text-xs font-bold dark:bg-zinc-800 hover:bg-white hover:text-black transition-colors duration-300"
      >
        <FaArrowLeft className="text-white group-hover:text-black transition-colors duration-300" />
        <span>Go Back to Dashboard</span>
      </button>
      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-white text-center w-full">
            Manage Your Categories
          </h1>
        </div>
        <p className="text-lg text-gray-300 mb-12 text-center">Create, view, and delete categories to organize your content better.</p>
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
        <div className="mt-8">
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="rounded-full px-4 py-2 text-white bg-black border border-white text-xs font-bold dark:bg-zinc-800 relative overflow-hidden"
          >
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(255,255,255,0.6)_25%,rgba(255,255,255,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            <span className="relative z-10">{showCreateForm ? 'Hide Form' : 'Create Category'}</span>
          </button>
          {showCreateForm && (
            <form onSubmit={handleCreateCategory} className="flex flex-col items-center mt-4">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="New category name"
                required
                className="rounded-full px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700 my-2"
              />
              <button type="submit"
                className="rounded-full px-4 py-2 text-white bg-black text-xs font-bold dark:bg-zinc-800 border border-white relative overflow-hidden">
                Create Category
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(255,255,255,0.6)_25%,rgba(255,255,255,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
