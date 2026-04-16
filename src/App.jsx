import React from 'react';
import TodoApp from './TodoApp';

function App() {
  return (
    // Kita panggil TodoApp di sini
    // Tailwind v4 akan otomatis mendeteksi class yang ada di dalam TodoApp
    <TodoApp />
  );
}

export default App;