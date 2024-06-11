"use client";
import React, { useState, useEffect } from "react";
import { createCategoryServer, deleteCategoryServer, fetchCategoriesServer } from "../server_calls";

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
    <div>
      <h1>Category Management</h1>
      {error && <p>{error}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <form onSubmit={handleCreateCategory}>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="New category name"
              required
            />
            <button type="submit">Create Category</button>
          </form>
          <ul>
            {categories.map((category) => (
              <li key={category.name}>
                {category.name}
                <button onClick={() => handleDeleteCategory(category.name)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CategoryPage;