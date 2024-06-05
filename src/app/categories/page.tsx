"use client";
import React, { useState, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
}

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function getSession() {
    const session = localStorage.getItem("session");
    return session ? JSON.parse(session) : null;
  }

  const fetchCategories = async () => {
    const session = getSession();
    if (session) {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:8000/api/v1/categories', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.id}`,
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch categories: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        setError("Failed to fetch categories.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const createCategory = async (name: string) => {
    const session = getSession();
    if (session) {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:8000/api/v1/categories', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.id}`,
          },
          body: JSON.stringify({ name }),
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`Failed to create category: ${response.status}`);
        }
        await fetchCategories();
      } catch (error) {
        setError("Failed to create category.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const deleteCategory = async (name: string) => {
    const session = getSession();
    if (session) {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/api/v1/categories?category_name=${encodeURIComponent(name)}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.id}`,
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`Failed to delete category: ${response.status}`);
        }
        await fetchCategories();
      } catch (error) {
        setError("Failed to delete category.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createCategory(newCategoryName);
  };

  const handleDeleteCategory = (name: string) => {
    deleteCategory(name);
  };

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
              <li key={category.id}>
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