import React from 'react';
import { 
  FileText, 
  Truck, 
  CheckCircle, 
  Clock, 
  Search, 
  Filter, 
  Eye, 
  MoreVertical,
  Package,
  ChevronLeft,
  ChevronRight,
  Download,
  Box
} from 'lucide-react';

const OrderStatCard = ({ icon: Icon, label, value, color, iconColor }) => (
  <div className="bg-white p-8 rounded-[40px] border border-gray-100 flex-1 min-w-[250px] shadow-sm relative overflow-hidden group">
    <div className="relative z-10 flex justify-between items-center">
      <div>
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">{label}</p>
        <h3 className="text-4xl font-black text-gray-900">{value}</h3>
      </div>
      <div className={`p-4 rounded-3xl ${color}`}>
        <Icon size={28} className={iconColor} />
      </div>
    </div>
  </div>
);

const Orders = () => {
  const stats = [
    { icon: Clock, label: "Processing", value: "12", color: "bg-gray-50", iconColor: "text-gray-600" },
    { icon: Truck, label: "Shipped Today", value: "45", color: "bg-blue-50", iconColor: "text-blue-500" },
    { icon: CheckCircle, label: "Delivered", value: "128", color: "bg-teal-50", iconColor: "text-teal-500" },
  ];

  const ordersData = [
    { id: '#ORD-8821', customer: { name: 'Sarah Jenkins', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' }, products: 'Premium Puppy Kibble (5kg), Squeaky Rubber Bone', items: 3, total: '$102.99', status: 'Shipped', date: '2024-05-15', statusColor: 'bg-blue-50 text-blue-500' },
    { id: '#ORD-8822', customer: { name: 'Michael Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' }, products: 'Automatic Cat Feeder', items: 1, total: '$89.99', status: 'Processing', date: '2024-05-15', statusColor: 'bg-orange-50 text-orange-500' },
    { id: '#ORD-8819', customer: { name: 'Emily Rodriguez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily' }, products: 'Bird Cage Large, Mixed Bird Seed (2kg)', items: 4, total: '$195.00', status: 'Delivered', date: '2024-05-14', statusColor: 'bg-teal-50 text-teal-500' },
    { id: '#ORD-8818', customer: { name: 'David Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' }, products: 'Orthopedic Dog Bed', items: 1, total: '$120.00', status: 'Delivered', date: '2024-05-14', statusColor: 'bg-teal-50 text-teal-500' },
    { id: '#ORD-8823', customer: { name: 'Lisa Thompson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa' }, products: 'UVB Reptile Lamp', items: 1, total: '$35.50', status: 'Cancelled', date: '2024-05-15', statusColor: 'bg-red-50 text-red-500' },
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Orders Ledger</h1>
          <p className="text-gray-500 text-sm font-medium">Manage customer transactions and track fulfillment progress.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2">
            <Download size={18} />
            Export CSV
          </button>
          <button className="px-5 py-2.5 rounded-xl bg-teal-400 text-white text-sm font-bold hover:bg-teal-500 transition-all shadow-lg shadow-teal-400/20 flex items-center gap-2">
            <Box size={18} />
            Bulk Ship
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <OrderStatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Orders Table Section */}
      <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900">All Orders</h3>
            <p className="text-xs text-gray-400 font-medium">A list of all recent transactions across the store.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search orders..."
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
                <th className="pb-4 px-4 font-black">Order ID</th>
                <th className="pb-4 px-4 font-black">Customer</th>
                <th className="pb-4 px-4 font-black">Products</th>
                <th className="pb-4 px-4 font-black">Items</th>
                <th className="pb-4 px-4 font-black">Total</th>
                <th className="pb-4 px-4 font-black">Status</th>
                <th className="pb-4 px-4 font-black">Date</th>
                <th className="pb-4 px-4 font-black text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[13px]">
              {ordersData.map((order, i) => (
                <tr key={i} className="group hover:bg-gray-50/50 transition-all">
                  <td className="py-5 px-4 font-bold text-teal-400">{order.id}</td>
                  <td className="py-5 px-4">
                    <div className="flex items-center gap-2">
                      <img src={order.customer.avatar} alt="" className="w-8 h-8 rounded-full bg-gray-100" />
                      <span className="font-bold text-gray-800">{order.customer.name}</span>
                    </div>
                  </td>
                  <td className="py-5 px-4 text-gray-500 font-medium max-w-[200px] truncate">{order.products}</td>
                  <td className="py-5 px-4">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-500">
                      {order.items}
                    </span>
                  </td>
                  <td className="py-5 px-4 font-black text-gray-800">{order.total}</td>
                  <td className="py-5 px-4">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-5 px-4 font-bold text-gray-400">{order.date}</td>
                  <td className="py-5 px-4 text-right">
                    <div className="flex items-center justify-end gap-3 text-gray-400">
                      <button className="hover:text-gray-900 transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="hover:text-gray-900 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination placeholder */}
        <div className="flex justify-between items-center mt-8">
          <p className="text-xs font-bold text-gray-400">Showing <span className="text-gray-900">5</span> of 128 orders</p>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl border border-gray-100 text-gray-400 hover:bg-gray-50">
              <ChevronLeft size={16} />
            </button>
            <button className="p-2 rounded-xl border border-gray-100 text-gray-400 hover:bg-gray-50">
              <ChevronRight size={16} />
            </button>
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

export default Orders;
