"use client";
import React, { useState, useEffect } from 'react';
import UserTable from '../components/user-table';
import { blockUserServer, deactivateUserServer, fetchUsersServer, unblockUserServer, updateUserRoleServer } from '../server_calls';

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
    const [limit, setLimit] = useState<number>(5);
    const [totalUsers, setTotalUsers] = useState<number>(0);

    useEffect(() => {
        fetchUsers();
    }, [search, skip, limit]);

    const fetchUsers = async () => {
        try {
            const data = await fetchUsersServer(search, skip, limit);
            setUsers(data.users);
            setTotalUsers(data.total);
        } catch (error: any) {
            setError(error.message);
        }
    };

    const updateUserRole = async (userId: string, newRole: string) => {
        try {
            await updateUserRoleServer(userId, newRole);
            await fetchUsers();
        } catch (error: any) {
            setError(error.message);
        }
    };

    const deactivateUser = async (userId: string) => {
        try {
            await deactivateUserServer(userId);
            await fetchUsers();
        } catch (error: any) {
            setError(error.message);
        }
    };

    const blockUser = async (userId: string) => {
        try {
            await blockUserServer(userId);
            await fetchUsers();
        } catch (error: any) {
            setError(error.message);
        }
    };

    const unblockUser = async (userId: string) => {
        try {
            await unblockUserServer(userId);
            await fetchUsers();
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleNextPage = () => {
        setSkip(skip + limit);
    };

    const handlePrevPage = () => {
        setSkip(Math.max(0, skip - limit));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
            <h1 className="text-2xl font-bold text-white mb-4">Admin Panel</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by email or phone"
                className="rounded-full px-4 py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-700 my-2"
            />
            <UserTable
                users={users}
                onUpdateRole={updateUserRole}
                onDeactivate={deactivateUser}
                onBlock={blockUser}
                onUnblock={unblockUser}
            />
            <div className="flex justify-between mt-4">
                <button
                    onClick={handlePrevPage}
                    disabled={skip === 0}
                    className="rounded-full px-4 py-2 text-white bg-black text-xs font-bold dark:bg-zinc-800 mr-2 w-20">
                    Previous
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={skip + limit >= totalUsers}
                    className="rounded-full px-4 py-2 text-white bg-black text-xs font-bold dark:bg-zinc-800 ml-2 w-20">
                    Next
                </button>
            </div>
        </div>
    );
}
