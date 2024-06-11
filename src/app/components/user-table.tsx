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
    onUpdateRole: (userId: string, newRole: string) => void;
    onDeactivate: (userId: string) => void;
    onBlock: (userId: string) => void;
    onUnblock: (userId: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onUpdateRole, onDeactivate, onBlock, onUnblock }) => {
    if (!Array.isArray(users)) {
        return <p>Invalid user data.</p>;
    }

    return (
        <div className="w-full max-w-7xl mx-auto p-4">
            {users.length === 0 ? (
                <p className="text-gray-400">No users found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-white bg-gray-700 rounded-lg shadow-lg overflow-hidden">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="border px-4 py-2 text-center">Email</th>
                                <th className="border px-4 py-2 text-center">Phone Number</th>
                                <th className="border px-4 py-2 text-center">Is admin</th>
                                <th className="border px-4 py-2 text-center">Is active</th>
                                <th className="border px-4 py-2 text-center">Is blocked</th>
                                <th className="border px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-cyan-500 transition-all hover:shadow-[0_0_10px_2px_rgba(0,0,255,0.5)]">
                                    <td className="border px-4 py-2 text-center">{user.email}</td>
                                    <td className="border px-4 py-2 text-center">{user.phone_number}</td>
                                    <td className="border px-4 py-2 text-center">{user.is_admin ? 'Yes' : 'No'}</td>
                                    <td className="border px-4 py-2 text-center">{user.is_active ? 'Yes' : 'No'}</td>
                                    <td className="border px-4 py-2 text-center">{user.is_blocked ? 'Yes' : 'No'}</td>
                                    <td className="border px-4 py-2">
                                        <div className="flex items-center space-x-2">
                                            {!user.is_admin && (
                                                <button
                                                    onClick={() => onUpdateRole(user.id, 'newRole')}
                                                    className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block w-[150px] h-[35px]"
                                                >
                                                    <span className="absolute inset-0 overflow-hidden rounded-full">
                                                        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(255,165,0,0.6)_25%,rgba(255,165,0,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                                                    </span>
                                                    <div className="flex justify-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                                                        <span>Promote</span>
                                                    </div>
                                                </button>
                                            )}
                                            {user.is_active && (
                                                <button
                                                    onClick={() => onDeactivate(user.id)}
                                                    className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block w-[150px] h-[35px]"
                                                >
                                                    <span className="absolute inset-0 overflow-hidden rounded-full">
                                                        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(255,0,0,0.6)_25%,rgba(255,0,0,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                                                    </span>
                                                    <div className="flex justify-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                                                        <span>Deactivate</span>
                                                    </div>
                                                </button>
                                            )}
                                            {user.is_blocked ? (
                                                <button
                                                    onClick={() => onUnblock(user.id)}
                                                    className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block w-[150px] h-[35px]"
                                                >
                                                    <span className="absolute inset-0 overflow-hidden rounded-full">
                                                        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(0,128,0,0.6)_25%,rgba(0,128,0,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                                                    </span>
                                                    <div className="flex justify-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                                                        <span>Unblock</span>
                                                    </div>
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => onBlock(user.id)}
                                                    className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block w-[150px] h-[35px]"
                                                >
                                                    <span className="absolute inset-0 overflow-hidden rounded-full">
                                                        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(255,165,0,0.6)_25%,rgba(255,165,0,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                                                    </span>
                                                    <div className="flex justify-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                                                        <span>Block</span>
                                                    </div>
                                                </button>
                                            )}
                                        </div>
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