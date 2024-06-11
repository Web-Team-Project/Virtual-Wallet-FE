import React from 'react';

interface User {
    id: string;
    email: string;
    phone_number: string;
    is_admin: boolean;
    is_active: boolean;
    is_blocked: boolean;
    created_at: string;
}

interface UserTableProps {
    users: User[];
    onUpdateRole: (userId: string) => void;
    onDeactivate: (userId: string) => void;
    onBlock: (userId: string) => void;
    onUnblock: (userId: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onUpdateRole, onDeactivate, onBlock, onUnblock }) => {
    if (!Array.isArray(users)) {
        return <p>Invalid user data.</p>;
    }

    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            {users.length === 0 ? (
                <p className="text-gray-400">No users found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-white bg-gray-700 rounded-lg shadow-lg overflow-hidden">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="border px-4 py-2">ID</th>
                                <th className="border px-4 py-2">Email</th>
                                <th className="border px-4 py-2">Phone Number</th>
                                <th className="border px-4 py-2">Is Admin</th>
                                <th className="border px-4 py-2">Is Active</th>
                                <th className="border px-4 py-2">Is Blocked</th>
                                <th className="border px-4 py-2">Created At</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-blue-500 transition-all hover:shadow-[0_0_10px_2px_rgba(0,0,255,0.5)]">
                                    <td className="border px-4 py-2">{user.id}</td>
                                    <td className="border px-4 py-2">{user.email}</td>
                                    <td className="border px-4 py-2">{user.phone_number}</td>
                                    <td className="border px-4 py-2">{user.is_admin ? 'Yes' : 'No'}</td>
                                    <td className="border px-4 py-2">{user.is_active ? 'Yes' : 'No'}</td>
                                    <td className="border px-4 py-2">{user.is_blocked ? 'Yes' : 'No'}</td>
                                    <td className="border px-4 py-2">{new Date(user.created_at).toLocaleString()}</td>
                                    <td className="border px-4 py-2">
                                        {!user.is_admin && (
                                            <button
                                                onClick={() => onUpdateRole(user.id)}
                                                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                            >
                                                Make Admin
                                            </button>
                                        )}
                                        {user.is_active && (
                                            <button
                                                onClick={() => onDeactivate(user.id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                                            >
                                                Deactivate
                                            </button>
                                        )}
                                        {!user.is_blocked ? (
                                            <button
                                                onClick={() => onBlock(user.id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                            >
                                                Block
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => onUnblock(user.id)}
                                                className="bg-green-500 text-white px-2 py-1 rounded"
                                            >
                                                Unblock
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserTable;
