import React, { useState, useEffect } from 'react';
import {
    Users,
    ShieldCheck,
    Activity,
    AlertCircle,
    CheckCircle2,
    XCircle,
    Search,
    Filter
} from 'lucide-react';

const AdminDashboard = () => {
    // This is a placeholder for the Admin Dashboard
    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">System Administration</h1>
                <p className="text-gray-500 text-sm font-medium">Manage users, applications, and system-wide settings.</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Users', value: '1,284', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Active Services', value: '542', icon: Activity, color: 'text-teal-600', bg: 'bg-teal-50' },
                    { label: 'Pending Approvals', value: '0', icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50' },
                    { label: 'System Health', value: 'Stable', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
                            <stat.icon size={24} />
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold text-gray-900">User Management</h3>
                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                className="pl-10 pr-4 py-2 bg-gray-50 border-transparent rounded-xl text-sm focus:bg-white focus:border-teal-500 transition-all outline-hidden w-64"
                            />
                        </div>
                        <button className="p-2 border border-gray-100 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all">
                            <Filter size={20} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-50">
                                <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">User Details</th>
                                <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Role</th>
                                <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Joined Date</th>
                                <th className="pb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {[
                                { name: 'Dr. John Doe', email: 'john@doe.com', role: 'vet', status: 'active', date: '2024-03-10' },
                                { name: 'City Shelter', email: 'contact@cityshelter.org', role: 'shelter', status: 'active', date: '2024-03-08' },
                                { name: 'Pet Mart', email: 'sales@petmart.com', role: 'seller', status: 'active', date: '2024-03-05' },
                            ].map((user, i) => (
                                <tr key={i} className="group">
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center font-bold text-gray-400 border border-gray-100">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{user.name}</p>
                                                <p className="text-[10px] text-gray-400">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${user.role === 'vet' ? 'bg-blue-50 text-blue-600' :
                                                user.role === 'shelter' ? 'bg-teal-50 text-teal-600' :
                                                    'bg-orange-50 text-orange-600'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500" />
                                            <span className="text-xs font-medium text-gray-700 capitalize">{user.status}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-xs font-medium text-gray-500">{user.date}</td>
                                    <td className="py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all">
                                                <CheckCircle2 size={18} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                                <XCircle size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
