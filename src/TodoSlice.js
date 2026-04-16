import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: { listTugas: [] },
  reducers: {
    tambahTugas: (state, action) => {
      state.listTugas.push(action.payload);
    },
    hapusSemua: (state) => {
      state.listTugas = [];
    },
    editTugas: (state, action) => {
      const { id, newText } = action.payload;
      const tugas = state.listTugas.find(t => t.id === id);
      if (tugas) {
        tugas.text = newText;
      }
    },
    // Reducer untuk menghapus satu tugas berdasarkan ID
    hapusSatuTugas: (state, action) => {
      const idYangDihapus = action.payload;
      state.listTugas = state.listTugas.filter(t => t.id !== idYangDihapus);
    }
  }
});

export const { tambahTugas, hapusSemua, editTugas, hapusSatuTugas } = todoSlice.actions;
export default todoSlice.reducer;