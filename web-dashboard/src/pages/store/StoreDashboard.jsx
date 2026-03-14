import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  Download,
  Plus,
  Search,
  MoreVertical,
  ArrowUpRight,
  ChevronRight,
  Clock
} from 'lucide-react';
import { fetchStoreStats, fetchStoreOrders } from '../../api';

const StatCard = ({ icon: Icon, label, value, trend, subtext, color, iconColor }) => (
  <div className="bg-white p-6 rounded-[32px] border border-gray-100 flex-1 min-w-[200px] shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${color}`}>
        <Icon size={22} className={iconColor} />
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-[11px] font-bold text-gray-400">
          <ArrowUpRight size={14} className="text-green-500" />
          {trend}
        </div>
      )}
    </div>
    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">{label}</p>
    <h3 className="text-2xl font-extrabold text-gray-900 mb-1">{value}</h3>
    <p className={`text-[10px] font-medium ${subtext === 'Needs attention' ? 'text-teal-500' : 'text-gray-400'}`}>{subtext}</p>
  </div>
);

const StoreDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const profile = JSON.parse(localStorage.getItem('profile') || '{}');
  const ownerName = profile?.result?.name || 'Owner';

  useEffect(() => {
    const loadData = async () => {
      try {
        const [sRes, oRes] = await Promise.all([
          fetchStoreStats(),
          fetchStoreOrders()
        ]);
        setStatsData(sRes.data);
        setRecentOrders(oRes.data.orders?.slice(0, 5) || []);
      } catch (err) {
        console.error("Error loading store dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const stats = [
    { icon: ShoppingBag, label: "Total Products", value: statsData?.totalProducts || "0", trend: "+4%", subtext: "Live catalog", color: "bg-gray-50", iconColor: "text-gray-600" },
    { icon: AlertTriangle, label: "Low Stock Items", value: statsData?.lowStockItems || "0", subtext: "Needs attention", color: "bg-teal-50", iconColor: "text-teal-500" },
    { icon: ShoppingCart, label: "Total Orders", value: statsData?.totalOrders || "0", trend: "+12%", subtext: "All time", color: "bg-gray-50", iconColor: "text-gray-600" },
    { icon: TrendingUp, label: "Total Revenue", value: `₹${statsData?.totalRevenue || 0}`, trend: "+8.2%", subtext: "Monthly growth", color: "bg-gray-50", iconColor: "text-gray-600" },
  ];


  const stockItems = [
    { name: "Organic Puppy Kibble (10kg)", category: "Food", stock: "3 units", status: "Low", statusColor: "bg-red-500 text-white" },
    { name: "Silicon Cat Litter (5L)", category: "Hygiene", stock: "8 units", status: "Medium", statusColor: "bg-orange-100 text-orange-600" },
    { name: "Heavy Duty Leash", category: "Accessories", stock: "2 units", status: "Low", statusColor: "bg-red-500 text-white" },
    { name: "Squeaky Rubber Duck", category: "Toys", stock: "12 units", status: "Medium", statusColor: "bg-orange-100 text-orange-600" },
    { name: "Premium Fish Flakes", category: "Food", stock: "0 units", status: "Out of Stock", statusColor: "bg-red-600 text-white" },
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Store Dashboard</h1>
          <p className="text-gray-500 text-sm font-medium">Welcome back, {ownerName}. Here's what's happening in your shop today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2">
            Download CSV
          </button>
          <button className="px-5 py-2.5 rounded-xl bg-teal-400 text-white text-sm font-bold hover:bg-teal-500 transition-all shadow-lg shadow-teal-400/20 flex items-center gap-2">
            <Plus size={18} />
            New Campaign
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400"></div>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Revenue Trends Chart */}
            <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Revenue Trends</h3>
                  <p className="text-xs text-gray-400 font-medium">Visualizing weekly sales performance for PetCare+</p>
                </div>
                <button className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 hover:text-teal-500 transition-colors">
                  View Full Report
                  <ChevronRight size={14} />
                </button>
              </div>

              <div className="h-64 relative">
                <svg viewBox="0 0 800 200" className="w-full h-full">
                  <path
                    d="M0,150 Q100,120 200,140 T400,130 T600,80 T800,20"
                    fill="none"
                    stroke="teal"
                    strokeWidth="3"
                    className="drop-shadow-lg"
                  />
                  <circle cx="200" cy="140" r="4" fill="teal" />
                  <circle cx="400" cy="130" r="4" fill="teal" />
                  <circle cx="600" cy="80" r="4" fill="teal" />
                </svg>
                <div className="flex justify-between mt-4 px-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <span key={day} className="text-[10px] font-bold text-gray-400">{day}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-4 justify-center">
                  <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Weekly Revenue</span>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-gray-900">Recent Orders</h3>
                <button className="text-gray-400">
                  <MoreVertical size={18} />
                </button>
              </div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-6">Latest customer transactions</p>

              <div className="space-y-6">
                {recentOrders.length > 0 ? recentOrders.map((order, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                        <ShoppingCart size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">{order.user?.name || 'Customer'}</h4>
                        <p className="text-[10px] text-gray-400 font-bold">#{order._id?.slice(-6) || 'N/A'} • {order.createdAt ? new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-gray-900 mb-1">₹{order.totalAmount || '0'}</p>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${order.status === 'delivered' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                )) : (
                  <p className="text-center text-gray-500 py-10">No recent orders found.</p>
                )}
              </div>
              <button className="w-full mt-8 py-3 bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-gray-100 transition-all">
                View All Transactions
              </button>
            </div>
          </div>
        </>
      )}


      {/* Stock Management Snapshot */}
      <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Stock Management Snapshot</h3>
            <p className="text-xs text-gray-400 font-medium">Critical inventory items that need restocking</p>
          </div>
          <button className="text-teal-500 text-xs font-bold hover:underline">
            Go to Inventory
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                <th className="pb-4">Product Name</th>
                <th className="pb-4">Category</th>
                <th className="pb-4">Current Stock</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stockItems.map((item, i) => (
                <tr key={i} className="group hover:bg-gray-50/50 transition-all">
                  <td className="py-4 text-xs font-bold text-gray-800">{item.name}</td>
                  <td className="py-4 text-xs font-medium text-gray-500">{item.category}</td>
                  <td className="py-4 text-xs font-medium text-gray-500">{item.stock}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-bold ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-[10px] font-bold text-gray-600 hover:bg-white hover:border-teal-500 hover:text-teal-500 transition-all">
                      Restock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-8 border-t border-gray-50">
        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[2px]">
          © 2024 PetCare+ Admin. All rights reserved. System Status: Healthy
        </p>
      </div>
    </div>
  );
};

export default StoreDashboard;
