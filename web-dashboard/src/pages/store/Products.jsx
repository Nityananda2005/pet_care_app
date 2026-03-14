import React, { useState, useMemo } from 'react';
import { 
  Download, 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  MoreHorizontal,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const ProductCard = ({ image, sku, name, price, lowStock }) => (
  <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden group hover:shadow-xl hover:shadow-gray-100 transition-all duration-300">
    <div className="aspect-square relative overflow-hidden bg-gray-50">
      <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      {lowStock && (
        <div className="absolute top-3 left-3 bg-[#FF4D4D] text-white text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-wider shadow-lg">
          Low Stock: {lowStock}
        </div>
      )}
    </div>
    <div className="p-5">
      <div className="flex justify-between items-start mb-2">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{sku}</p>
        <div className="p-1 bg-gray-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal size={14} className="text-gray-400" />
        </div>
      </div>
      <h4 className="text-sm font-bold text-gray-900 mb-4 line-clamp-1">{name}</h4>
      <div className="flex justify-between items-center">
        <p className="text-lg font-black text-gray-900">${price}</p>
        <div className="flex gap-2">
          <button className="p-2 border border-gray-100 rounded-xl text-gray-400 hover:text-[#00A99D] hover:bg-[#00D1C1]/5 transition-all">
            <Edit2 size={16} />
          </button>
          <button className="p-2 border border-gray-100 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('All Items');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = ['All Items', 'Food', 'Toys', 'Grooming', 'Health'];

  const allProducts = [
    { sku: 'PC-FD-001', name: 'Premium Grain-Free Kibble', price: '64.99', category: 'Food', image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=400' },
    { sku: 'PC-TY-042', name: 'Interactive Puzzle Toy - Level 2', price: '24.50', category: 'Toys', image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?auto=format&fit=crop&q=80&w=400' },
    { sku: 'PC-GR-015', name: 'Organic Lavender Pet Shampoo', price: '18.00', category: 'Grooming', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400' },
    { sku: 'PC-HL-088', name: 'Hip & Joint Supplements', price: '35.95', category: 'Health', image: 'https://images.unsplash.com/photo-1626242342636-dfd261e69925?auto=format&fit=crop&q=80&w=400', lowStock: 8 },
    { sku: 'PC-TY-003', name: 'Tough-Chew Rubber Bone', price: '12.99', category: 'Toys', image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&q=80&w=400' },
    { sku: 'PC-FD-092', name: 'Freeze-Dried Chicken Liver', price: '14.50', category: 'Food', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400' },
    { sku: 'PC-GR-002', name: 'Stainless Steel Non-Slip Bowl', price: '9.99', category: 'Grooming', image: 'https://images.unsplash.com/photo-1551730459-92db2a308d6a?auto=format&fit=crop&q=80&w=400' },
    { sku: 'PC-HL-001', name: 'Multi-Vitamin Daily Care drops', price: '22.40', category: 'Health', image: 'https://images.unsplash.com/photo-1628102422509-646fbad62772?auto=format&fit=crop&q=80&w=400', lowStock: 3 },
    { sku: 'PC-FD-005', name: 'Gourmet Wet Cat Food', price: '45.00', category: 'Food', image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&q=80&w=400' },
    { sku: 'PC-TY-012', name: 'Catnip Plush Fish', price: '8.50', category: 'Toys', image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&q=80&w=400' },
    { sku: 'PC-GR-009', name: 'Self-Cleaning Slicker Brush', price: '15.99', category: 'Grooming', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=400' },
    { sku: 'PC-HL-022', name: 'Pet Probiotic Powder', price: '28.50', category: 'Health', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400' },
  ];

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesCategory = activeCategory === 'All Items' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.sku.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Product Catalog</h1>
          <p className="text-gray-500 text-sm font-medium">Manage your pet supplies, update pricing, and track inventory levels.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2">
            <Download size={18} />
            Export CSV
          </button>
          <button className="px-5 py-2.5 rounded-xl bg-[#00D1C1] text-white text-sm font-bold hover:bg-[#00B8A9] transition-all shadow-lg shadow-[#00D1C1]/20 flex items-center gap-2">
            <Plus size={18} />
            Add New Product
          </button>
        </div>
      </div>

      {/* Filters & View Toggle */}
      <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-[300px]">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search product name, SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-transparent focus:bg-white focus:border-[#00D1C1]/30 focus:ring-0 rounded-2xl text-sm transition-all shadow-inner"
            />
          </div>
          <button className="px-4 py-2.5 rounded-2xl border border-gray-100 text-sm font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <Filter size={18} />
            Advanced
          </button>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center bg-gray-50 p-1 rounded-2xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex items-center border-l border-gray-100 pl-6 gap-2">
            <button className="p-2 rounded-xl bg-[#00D1C1]/10 text-[#00A99D]">
              <Grid size={20} />
            </button>
            <button className="p-2 rounded-xl text-gray-300 hover:text-gray-500 hover:bg-gray-50 transition-all">
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid Header */}
      <div className="flex justify-between items-center px-2">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Showing <span className="text-gray-900">{filteredProducts.length}</span> of {allProducts.length} products
        </p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live Sync Active</span>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={idx} {...product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border border-dashed border-gray-200">
          <div className="p-6 bg-gray-50 rounded-full mb-4">
            <Search size={40} className="text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 text-sm">Try adjusting your filters or search query.</p>
        </div>
      )}

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div className="flex justify-center items-center gap-2 pt-8">
          <button className="p-2 rounded-xl border border-gray-100 text-gray-400 hover:bg-gray-50 transition-all">
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-1">
            {[1, 2, 3, '...', 12].map((page, i) => (
              <button
                key={i}
                className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                  page === 1 
                    ? 'bg-[#00D1C1] text-white shadow-lg shadow-[#00D1C1]/20' 
                    : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="p-2 rounded-xl border border-gray-100 text-gray-400 hover:bg-gray-50 transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="text-center pt-8 border-t border-gray-50">
        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[2px]">
          © 2024 PetCare+ Admin. All rights reserved. System Status: Healthy
        </p>
      </div>
    </div>
  );
};

export default Products;
