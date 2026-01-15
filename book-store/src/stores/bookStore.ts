import { useAppSelector, dispatch } from '../redux/store';
import { addBook, updateBook, removeBook, removeBooks } from '../redux/bookSlice';
import type { Book } from '../types';

export const useBookStore = () => {
    // Select state from Redux
    const books = useAppSelector((state) => state.book.books);

    // Map functions to dispatch actions
    const addBookAction = (book: Omit<Book, 'id'>) => {
        dispatch(addBook(book));
    };

    const updateBookAction = (updatedBook: Book) => {
        dispatch(updateBook(updatedBook));
    };

    const removeBookAction = (id: string) => {
        dispatch(removeBook(id));
    };

    const removeBooksAction = (ids: string[]) => {
        dispatch(removeBooks(ids));
    };

    return {
        books, // This is now a computed, compatible with existing usage
        addBook: addBookAction,
        updateBook: updateBookAction,
        removeBook: removeBookAction,
        removeBooks: removeBooksAction,
    };
};
