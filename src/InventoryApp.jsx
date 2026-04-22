import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { tambahBarang, hapusSemuaBarang, editBarang, hapusSatuBarang } from './inventorySlice';

const InventoryApp = () => {
  const listBarang = useSelector((state) => state.inventory.listBarang);
  const dispatch = useDispatch();
  
  const [namaBarang, setNamaBarang] = useState('');
  const [kuantitas, setKuantitas] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = () => {
    if (namaBarang.trim() === '' || kuantitas === '') return;

    if (editingId) {
      dispatch(editBarang({ 
        id: editingId, 
        nama: namaBarang, 
        kuantitas: parseInt(kuantitas) 
      }));
      setEditingId(null);
    } else {
      dispatch(tambahBarang({ 
        id: Date.now(), 
        nama: namaBarang, 
        kuantitas: parseInt(kuantitas) 
      }));
    }
    
    // Reset form
    setNamaBarang('');
    setKuantitas('');
  };

  const mulaiEdit = (barang) => {
    setEditingId(barang.id);
    setNamaBarang(barang.nama);
    setKuantitas(barang.kuantitas);
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-6 text-slate-900 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border border-emerald-100">
        <h1 className="text-3xl font-extrabold mb-2 text-center tracking-tight text-emerald-700">
          E-Inventory Masjid
        </h1>
        <p className="text-center text-slate-500 mb-8 text-sm">Manajemen Inventaris Barang Masjid</p>
        
        <div className="space-y-3 mb-8">
          <input 
            type="text"
            value={namaBarang}
            onChange={(e) => setNamaBarang(e.target.value)}
            placeholder="Nama Barang (misal: Al-Qur'an)"
            className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
          <input 
            type="number"
            value={kuantitas}
            onChange={(e) => setKuantitas(e.target.value)}
            placeholder="Kuantitas"
            className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
          
          <div className="flex gap-2">
            <button 
              onClick={handleSubmit}
              className={`flex-1 ${editingId ? 'bg-orange-500' : 'bg-emerald-600'} text-white font-semibold py-3 px-4 rounded-xl active:scale-95 transition-all cursor-pointer`}
            >
              {editingId ? '💾 Simpan Perubahan' : '➕ Tambah Barang'}
            </button>
            
            <button 
              onClick={() => dispatch(hapusSemuaBarang())}
              className="bg-slate-100 text-rose-600 border border-rose-200 font-semibold py-3 px-4 rounded-xl hover:bg-rose-50 active:scale-95 transition-all cursor-pointer"
              title="Reset Semua"
            >
              🗑️
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-emerald-600 text-white">
              <tr>
                <th className="p-3 text-sm font-semibold">Nama Barang</th>
                <th className="p-3 text-sm font-semibold">Jumlah</th>
                <th className="p-3 text-sm font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {listBarang.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-6 text-center text-slate-400 italic bg-slate-50">
                    Belum ada data barang.
                  </td>
                </tr>
              ) : (
                listBarang.map((barang) => (
                  <tr key={barang.id} className="hover:bg-emerald-50 transition-colors">
                    <td className="p-3 font-medium text-slate-700">{barang.nama}</td>
                    <td className="p-3 text-slate-600">{barang.kuantitas} pcs</td>
                    <td className="p-3 flex justify-center gap-2">
                      <button 
                        onClick={() => mulaiEdit(barang)}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => dispatch(hapusSatuBarang(barang.id))}
                        className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors"
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryApp;