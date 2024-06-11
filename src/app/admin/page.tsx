"use client";

import React, { useState, useEffect } from 'react';
import UserTable from '../components/UserTable';

interface User {
    id: string;
    email: string;
    phone_number: string;
    is_admin: boolean;
    is_active: boolean;
    is_blocked: boolean;
    created_at: string;
}

export default function AdminPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState<string>('');
    const [skip, setSkip] = useState<number>(0);
    const [limit, setLimit] = useState<number>(100);

    useEffect(() => {
        fetchUsers();
    }, [search, skip, limit]);

    function getSession() {
        const session = localStorage.getItem("session");
        if (session) {
            return JSON.parse(session);
        }
        return null;
    }

    const fetchUsers = async () => {
        const session = getSession();
        if (!session) {
            setError("No session found. Please log in.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/v1/search/users?search=${search}&skip=${skip}&limit=${limit}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.token}`,
                },
                credentials: "include",
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch users: ${errorText}`);
            }

            const data = await response.json();
            setUsers(data);
        } catch (error: any) {
            setError(error.message);
        }
    };

    const updateUserRole = async (userId: string) => {
        const session = getSession();
        if (!session) {
            setError("No session found. Please log in.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/v1/users/${userId}/role`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.token}`,
                },
                credentials: "include",
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to update user role: ${errorText}`);
            }

            fetchUsers();
        } catch (error: any) {
            setError(`Failed to update user role: ${error.message}`);
        }
    };

    const deactivateUser = async (userId: string) => {
        const session = getSession();
        if (!session) {
            setError("No session found. Please log in.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/v1/users/${userId}/deactivate`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.token}`,
                },
                credentials: "include",
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to deactivate user: ${errorText}`);
            }

            fetchUsers();
        } catch (error: any) {
            setError(`Failed to deactivate user: ${error.message}`);
        }
    };

    const blockUser = async (userId: string) => {
        const session = getSession();
        if (!session) {
            setError("No session found. Please log in.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/v1/users/${userId}/block`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.token}`,
                },
                credentials: "include",
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to block user: ${errorText}`);
            }

            fetchUsers();
        } catch (error: any) {
            setError(`Failed to block user: ${error.message}`);
        }
    };

    const unblockUser = async (userId: string) => {
        const session = getSession();
        if (!session) {
            setError("No session found. Please log in.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/v1/users/${userId}/unblock`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.token}`,
                },
                credentials: "include",
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to unblock user: ${errorText}`);
            }

            fetchUsers();
        } catch (error: any) {
            setError(`Failed to unblock user: ${error.message}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
            <h1 className="text-2xl font-bold text-white mb-4">Admin Panel</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by email or phone number"
                className="mb-4 p-2 rounded"
            />
            <UserTable 
                users={users} 
                onUpdateRole={updateUserRole} 
                onDeactivate={deactivateUser} 
                onBlock={blockUser}
                onUnblock={unblockUser}
            />
        </div>
    );
}
