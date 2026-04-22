import { createSlice } from '@reduxjs/toolkit';

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: { listBarang: [] },
  reducers: {
    tambahBarang: (state, action) => {
      // payload berisi { id, nama, kuantitas }
      state.listBarang.push(action.payload);
    },
    hapusSemuaBarang: (state) => {
      state.listBarang = [];
    },
    editBarang: (state, action) => {
      const { id, nama, kuantitas } = action.payload;
      const barang = state.listBarang.find(b => b.id === id);
      if (barang) {
        barang.nama = nama;
        barang.kuantitas = kuantitas;
      }
    },
    hapusSatuBarang: (state, action) => {
      const idYangDihapus = action.payload;
      state.listBarang = state.listBarang.filter(b => b.id !== idYangDihapus);
    }
  }
});

export const { 
  tambahBarang, 
  hapusSemuaBarang, 
  editBarang, 
  hapusSatuBarang 
} = inventorySlice.actions;

export default inventorySlice.reducer;