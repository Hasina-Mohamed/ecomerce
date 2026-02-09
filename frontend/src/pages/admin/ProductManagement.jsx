import { Plus, Search, MoreVertical, Edit3, Trash2 } from 'lucide-react';

const ProductManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Product Catalog</h1>
          <p className="text-slate-500">Manage your luxury inventory.</p>
        </div>
        <button className="bg-luxe-green text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-500 shadow-lg shadow-luxe-green/20">
          <Plus size={20}/> Add New Product
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search products..." className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-lg outline-none border border-transparent focus:border-luxe-green transition-all" />
          </div>
          <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">Filters</button>
        </div>

        <table className="w-full">
          <thead className="bg-slate-50 text-[11px] font-black uppercase text-slate-400">
            <tr>
              <th className="px-6 py-4 text-left">Product</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Price</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[
              { name: 'Emerald Silk Scarf', sku: 'SKU: ACC-ES-001', price: '$120.00', status: 'Active' },
              { name: 'Heritage Gold Cuff', sku: 'SKU: JW-HGC-442', price: '$350.00', status: 'Active' },
            ].map((p, i) => (
              <tr key={i} className="hover:bg-slate-50/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg border border-slate-200"></div>
                    <div>
                      <p className="font-bold text-slate-900">{p.name}</p>
                      <p className="text-[10px] text-slate-400">{p.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">Accessories</td>
                <td className="px-6 py-4 font-bold text-luxe-gold">{p.price}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase rounded">Active</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 text-slate-400">
                    <button className="p-2 hover:bg-slate-100 rounded-lg hover:text-luxe-green"><Edit3 size={16}/></button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg hover:text-red-500"><Trash2 size={16}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;