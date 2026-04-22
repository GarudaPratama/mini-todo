import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { tambahBarang, hapusSemuaBarang, editBarang, hapusSatuBarang } from './inventorySlice';

const InventoryApp = () => {
  const listBarang = useSelector((state) => state.inventory.listBarang);
  const dispatch = useDispatch();
  
  const [namaBarang, setNamaBarang] = useState('');
  const [jmlBerfungsi, setJmlBerfungsi] = useState('');
  const [jmlRusak, setJmlRusak] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = () => {
    if (!namaBarang || jmlBerfungsi === '' || jmlRusak === '') return;

    const dataBarang = {
      id: editingId || Date.now(),
      nama: namaBarang,
      berfungsi: parseInt(jmlBerfungsi),
      rusak: parseInt(jmlRusak)
    };

    if (editingId) {
      dispatch(editBarang(dataBarang));
      setEditingId(null);
    } else {
      dispatch(tambahBarang(dataBarang));
    }
    
    setNamaBarang('');
    setJmlBerfungsi('');
    setJmlRusak('');
  };

  const mulaiEdit = (barang) => {
    setEditingId(barang.id);
    setNamaBarang(barang.nama);
    setJmlBerfungsi(barang.berfungsi);
    setJmlRusak(barang.rusak);
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-6 text-slate-900 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-emerald-100">
        <h1 className="text-3xl font-extrabold mb-2 text-center text-emerald-700 tracking-tight">
          E-Inventory Masjid
        </h1>
        <p className="text-center text-slate-500 mb-8 text-sm">Sistem Pendataan Sarana & Prasarana</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1 ml-1">Nama Barang</label>
            <input 
              type="text"
              value={namaBarang}
              onChange={(e) => setNamaBarang(e.target.value)}
              placeholder="Contoh: Kursi Salat"
              className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-emerald-600 mb-1 ml-1">Kondisi Baik</label>
            <input 
              type="number"
              value={jmlBerfungsi}
              onChange={(e) => setJmlBerfungsi(e.target.value)}
              placeholder="0"
              className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-rose-600 mb-1 ml-1">Kondisi Rusak</label>
            <input 
              type="number"
              value={jmlRusak}
              onChange={(e) => setJmlRusak(e.target.value)}
              placeholder="0"
              className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 outline-none"
            />
          </div>
          
          <button 
            onClick={handleSubmit}
            className={`md:col-span-2 py-3.5 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 cursor-pointer ${editingId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-emerald-600 hover:bg-emerald-700'}`}
          >
            {editingId ? '💾 Simpan Perubahan' : '➕ Tambah ke Inventaris'}
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800 text-white text-xs uppercase tracking-wider">
                <th className="p-4">Barang</th>
                <th className="p-4 text-center">Total</th>
                <th className="p-4 text-center">Baik</th>
                <th className="p-4 text-center">Rusak</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {listBarang.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-slate-400 italic bg-slate-50">
                    Belum ada data inventaris terdaftar.
                  </td>
                </tr>
              ) : (
                listBarang.map((b) => (
                  <tr key={b.id} className="hover:bg-emerald-50/50 transition-colors">
                    <td className="p-4 font-bold text-slate-700">{b.nama}</td>
                    <td className="p-4 text-center bg-slate-50/80 font-bold">{b.berfungsi + b.rusak}</td>
                    <td className="p-4 text-center text-emerald-600 font-semibold">{b.berfungsi}</td>
                    <td className="p-4 text-center text-rose-600 font-semibold">{b.rusak}</td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => mulaiEdit(b)} className="p-2 hover:bg-blue-100 rounded-lg text-blue-600 transition-colors">
                          ✏️
                        </button>
                        <button onClick={() => dispatch(hapusSatuBarang(b.id))} className="p-2 hover:bg-rose-100 rounded-lg text-rose-600 transition-colors">
                          ❌
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {listBarang.length > 0 && (
           <div className="mt-6 flex justify-end">
             <button 
               onClick={() => dispatch(hapusSemuaBarang())}
               className="text-sm font-medium text-rose-500 hover:text-rose-700 transition-colors cursor-pointer"
             >
               Hapus Seluruh Data
             </button>
           </div>
        )}
      </div>
    </div>
  );
};

export default InventoryApp;