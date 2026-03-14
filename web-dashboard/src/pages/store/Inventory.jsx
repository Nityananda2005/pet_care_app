import React from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Package, 
  AlertTriangle, 
  DollarSign, 
  TrendingUp,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

const InventoryStatCard = ({ icon: Icon, label, value, subtext, trend, color, iconColor }) => (
  <div className="bg-white p-6 rounded-[32px] border border-gray-100 flex-1 min-w-[200px] shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${color}`}>
        <Icon size={22} className={iconColor} />
      </div>
      {trend && (
        <div className={`px-2 py-1 rounded-lg text-[9px] font-black ${trend.startsWith('+') ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
          {trend}
        </div>
      )}
    </div>
    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">{label}</p>
    <h3 className="text-2xl font-extrabold text-gray-900 mb-1">{value}</h3>
    <p className="text-[10px] text-gray-400 font-medium">{subtext}</p>
  </div>
);

const Inventory = () => {
  const stats = [
    { icon: Package, label: "Total Inventory", value: "1,284", subtext: "Across 42 categories", color: "bg-[#F0FEFD]", iconColor: "text-[#00D1C1]" },
    { icon: AlertTriangle, label: "Low Stock Alerts", value: "12", subtext: "Immediate attention needed", trend: "+12%", color: "bg-[#F0FEFD]", iconColor: "text-[#00D1C1]" },
    { icon: DollarSign, label: "Stock Value", value: "$42,850", subtext: "Estimated retail value", color: "bg-[#F0FEFD]", iconColor: "text-[#00D1C1]" },
    { icon: TrendingUp, label: "Turnover Rate", value: "84%", subtext: "Average item lifecycle", trend: "-4%", color: "bg-[#F0FEFD]", iconColor: "text-[#00D1C1]" },
  ];

  const inventoryData = [
    { sku: 'PC-FD-001', name: 'Premium Grain-Free Salmon Kibble', category: 'Dog Food', stock: 8, status: 'Low', image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=400' },
    { sku: 'PC-TY-042', name: 'Interactive Feather Wand', category: 'Cat Toys', stock: 45, status: 'Medium', image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?auto=format&fit=crop&q=80&w=400' },
    { sku: 'PC-GR-108', name: 'Soothe & Shine Lavender Shampoo', category: 'Grooming', stock: 124, status: 'High', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400' },
    { sku: 'PC-AQ-015', name: 'Ultra-Quiet Oxygen Pump', category: 'Aquarium', stock: 5, status: 'Low', image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=400' },
    { sku: 'PC-BD-022', name: 'Orthopedic Memory Foam Bed (L)', category: 'Bedding', stock: 22, status: 'Medium', image: 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Inventory Management</h1>
          <p className="text-gray-500 text-sm font-medium">Track, manage, and restock your pet supply catalog.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2">
            <FileText size={18} />
            Export PDF
          </button>
          <button className="px-5 py-2.5 rounded-xl bg-[#00D1C1] text-white text-sm font-bold hover:bg-[#00B8A9] transition-all shadow-lg shadow-[#00D1C1]/20 flex items-center gap-2">
            <Plus size={18} />
            Add New Product
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <InventoryStatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Main Inventory Table */}
      <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Product Catalog</h3>
            <p className="text-xs text-gray-400 font-medium">A complete list of your current store inventory levels.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search SKU or name..."
                className="pl-9 pr-4 py-2 bg-gray-50 border-transparent focus:bg-white focus:ring-0 rounded-xl text-xs w-64 transition-all"
              />
            </div>
            <button className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-gray-600">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                <th className="pb-4 px-4"><input type="checkbox" className="rounded" /></th>
                <th className="pb-4 px-4">SKU</th>
                <th className="pb-4 px-4">Product Details</th>
                <th className="pb-4 px-4">Category</th>
                <th className="pb-4 px-4">In Stock</th>
                <th className="pb-4 px-4">Status</th>
                <th className="pb-4 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {inventoryData.map((item, i) => (
                <tr key={i} className="group hover:bg-gray-50/50 transition-all">
                  <td className="py-5 px-4"><input type="checkbox" className="rounded" /></td>
                  <td className="py-5 px-4 text-xs font-bold text-gray-400">{item.sku}</td>
                  <td className="py-5 px-4">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt="" className="w-10 h-10 rounded-xl object-cover" />
                      <span className="text-xs font-bold text-gray-800 line-clamp-1 max-w-[200px]">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-5 px-4 text-xs font-medium text-gray-500">{item.category}</td>
                  <td className="py-5 px-4 text-xs font-black text-gray-800">{item.stock}</td>
                  <td className="py-5 px-4">
                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                      item.status === 'Low' ? 'bg-red-50 text-red-500' :
                      item.status === 'Medium' ? 'bg-orange-50 text-orange-500' : 'bg-gray-50 text-gray-500'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className={`px-4 py-1.5 rounded-xl text-[10px] font-bold transition-all ${
                        item.status === 'Low' 
                        ? 'bg-[#00D1C1] text-white shadow-lg shadow-[#00D1C1]/20' 
                        : 'bg-white border border-gray-100 text-gray-600 hover:border-gray-300'
                      }`}>
                        {item.status === 'Low' ? 'Restock Now' : 'Restock'}
                      </button>
                      <button className="text-gray-300 hover:text-gray-600">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-8">
          <p className="text-xs font-bold text-gray-400">Showing <span className="text-gray-900">5</span> of 42 products</p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-gray-600">Previous</button>
            <div className="flex gap-1">
              {[1, 2, 3, '...', 8].map((n, i) => (
                <button key={i} className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${n === 1 ? 'bg-[#00D1C1]/10 text-[#00A99D]' : 'text-gray-400 hover:bg-gray-50'}`}>{n}</button>
              ))}
            </div>
            <button className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-gray-600">Next</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Critical Alert */}
        <div className="lg:col-span-2 bg-red-50 p-8 rounded-[40px] border border-red-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 text-red-500 group-hover:scale-110 transition-transform">
            <AlertTriangle size={80} />
          </div>
          <div className="relative z-10 flex gap-6">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-500 shadow-sm border border-red-100">
              <AlertTriangle size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Critical Stock Alert</h3>
              <p className="text-sm text-red-600 font-medium mb-4">
                You have 3 items that will likely be out of stock within 48 hours based on recent sales trends. Automated restock suggestions have been added to your draft orders.
              </p>
              <button className="text-gray-900 text-xs font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
                Review Draft Orders
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Stock Health */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6 text-[#00D1C1]">
             <TrendingUp size={18} />
             <h3 className="text-sm font-bold text-gray-900">Category Stock Health</h3>
          </div>
          <div className="space-y-6">
            {[
              { label: 'Dog Food', value: 85, color: 'bg-teal-400' },
              { label: 'Cat Toys', value: 42, color: 'bg-teal-400' },
              { label: 'Grooming Supplies', value: 92, color: 'bg-teal-400' },
            ].map((cat, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-bold text-gray-600 uppercase tracking-widest">{cat.label}</span>
                  <span className="text-[11px] font-black text-gray-900">{cat.value}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                  <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
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

export default Inventory;
