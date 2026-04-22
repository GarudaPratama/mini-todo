import { createSlice } from '@reduxjs/toolkit';

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: { listBarang: [] },
  reducers: {
    tambahBarang: (state, action) => {
      state.listBarang.push(action.payload);
    },
    hapusSemuaBarang: (state) => {
      state.listBarang = [];
    },
    editBarang: (state, action) => {
      const { id, nama, berfungsi, rusak } = action.payload;
      const barang = state.listBarang.find(b => b.id === id);
      if (barang) {
        barang.nama = nama;
        barang.berfungsi = berfungsi;
        barang.rusak = rusak;
      }
    },
    hapusSatuBarang: (state, action) => {
      state.listBarang = state.listBarang.filter(b => b.id !== action.payload);
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