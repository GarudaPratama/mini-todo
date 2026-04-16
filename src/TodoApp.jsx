import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { tambahTugas, hapusSemua, editTugas, hapusSatuTugas } from './TodoSlice';

const TodoApp = () => {
  const listTugas = useSelector((state) => state.todo.listTugas);
  const dispatch = useDispatch();
  
  const [inputNama, setInputNama] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleTambah = () => {
    if (inputNama.trim() === '') return;
    if (editingId) {
      dispatch(editTugas({ id: editingId, newText: inputNama }));
      setEditingId(null);
    } else {
      dispatch(tambahTugas({ id: Date.now(), text: inputNama }));
    }
    setInputNama('');
  };

  const mulaiEdit = (tugas) => {
    setEditingId(tugas.id);
    setInputNama(tugas.text);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 text-slate-900 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
        <h1 className="text-3xl font-extrabold mb-8 text-center tracking-tight text-indigo-600">
          Task Manager
        </h1>
        
        <div className="space-y-3 mb-8">
          <input 
            type="text"
            value={inputNama}
            onChange={(e) => setInputNama(e.target.value)}
            placeholder="Ketik nama tugas..."
            className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          
          <div className="flex gap-2">
            <button 
              onClick={handleTambah}
              className={`flex-1 ${editingId ? 'bg-orange-500' : 'bg-indigo-600'} text-white font-semibold py-3 px-4 rounded-xl active:scale-95 transition-all cursor-pointer`}
            >
              {editingId ? '💾 Simpan' : '➕ Tambah'}
            </button>
            
            <button 
              onClick={() => dispatch(hapusSemua())}
              className="bg-slate-100 text-rose-600 border border-rose-200 font-semibold py-3 px-4 rounded-xl hover:bg-rose-50 active:scale-95 transition-all cursor-pointer"
              title="Hapus Semua"
            >
              🗑️
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {listTugas.length === 0 ? (
            <div className="py-10 text-center border-2 border-dashed border-slate-200 rounded-xl text-slate-400">
              Belum ada tugas.
            </div>
          ) : (
            listTugas.map((tugas) => (
              <div 
                key={tugas.id} 
                className="group p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between hover:bg-white hover:shadow-md transition-all"
              >
                <span className="font-medium text-slate-700">{tugas.text}</span>
                
                <div className="flex gap-2">
                  {/* Tombol Edit */}
                  <button 
                    onClick={() => mulaiEdit(tugas)}
                    className="text-xs bg-indigo-50 text-indigo-600 p-2 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    ✏️
                  </button>

                  {/* Tombol Hapus per item */}
                  <button 
                    onClick={() => dispatch(hapusSatuTugas(tugas.id))}
                    className="text-xs bg-rose-50 text-rose-600 p-2 rounded-lg hover:bg-rose-100 transition-colors"
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;