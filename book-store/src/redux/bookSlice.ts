import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Book } from '../types';

interface BookState {
  books: Book[];
}

const initialState: BookState = {
  books: [
    { id: '1', name: 'Vue 3 权威指南', price: 50, category: '技术', description: '深入理解 Vue 3 核心原理' },
    { id: '2', name: 'TypeScript 编程艺术', price: 45, category: '技术', description: '精通 TypeScript 类型系统' },
    { id: '3', name: '活着', price: 20, category: '小说', description: '余华代表作' },
  ],
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Omit<Book, 'id'>>) => {
    
      state.books.push({
        ...action.payload,
        id: Date.now().toString(),
      });
    },
    updateBook: (state, action: PayloadAction<Book>) => {
      const index = state.books.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
    removeBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter(b => b.id !== action.payload);
    },
    removeBooks: (state, action: PayloadAction<string[]>) => {
      state.books = state.books.filter(b => !action.payload.includes(b.id));
    },
  },
});

export const { addBook, updateBook, removeBook, removeBooks } = bookSlice.actions;
export default bookSlice.reducer;
