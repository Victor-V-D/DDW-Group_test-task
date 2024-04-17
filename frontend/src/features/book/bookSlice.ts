import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IBook } from "@/interfaces/IBook";
import axiosForum from "@/api/axiosForum";
import { RootState } from "@/store/store";
import IErrors from "@/interfaces/IErrors";
import { AxiosError, isAxiosError } from "axios";

interface State {
    book: IBook[];
    errorFromForm: IErrors[];
    error: Error | null;
    loading: boolean;
}

const initialState: State = {
    book: [],
    errorFromForm: [],
    error: null,
    loading: false,
};

export const fetchBook = createAsyncThunk<IBook[], string | undefined, { state: RootState }>(
    "fetch/book",
    async (searchQuery = "", { getState }) => {
        const token = getState().auth.user?.token;
        const { data } = await axiosForum.get(`/book?search=${searchQuery}`, {
            headers: { Authorization: token },
        });
        return data;
    }
);

export const createBook = createAsyncThunk<
    IBook,
    FormData,
    { state: RootState, rejectValue: IErrors[] }
>(
    "create/book",
    async (bookData, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.user?.token;
            return await axiosForum
                .post<IBook>("/book", bookData, {
                    headers: { Authorization: token },
                })
                .then((res) => res.data);
        } catch (err) {
            if (isAxiosError(err) && Array.isArray(err.response?.data)) {
                const error: AxiosError<IErrors[]> = err;
                if (error.response) return rejectWithValue(error.response.data);
            }
            throw err;
        }
    }
);

export const deleteBook = createAsyncThunk<
    IBook,
    FormData,
    { state: RootState, rejectValue: IErrors[] }
>(
    "delete/book",
    async (id, { getState }) => {
        const token = getState().auth.user?.token;
        const { data } = await axiosForum.delete(`/book/${id}`, {
            headers: { Authorization: token },
        });
        return data;
    }
);

export const updateBook = createAsyncThunk<
    IBook,
    { id: number, bookData: FormData },
    { state: RootState, rejectValue: IErrors[] }
>(
    "update/book",
    async ({ id, bookData }, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.user?.token;
            return await axiosForum
                .put<IBook>(`/book/${id}`, bookData, {
                    headers: { Authorization: token },
                })
                .then((res) => res.data);
        } catch (err) {
            if (isAxiosError(err) && Array.isArray(err.response?.data)) {
                const error: AxiosError<IErrors[]> = err;
                if (error.response) return rejectWithValue(error.response.data);
            }
            throw err;
        }
    }
);

export const sortBooks = createSlice({
    name: "sort",
    initialState,
    reducers: {
        sort(state, action) {
            const { field, order } = action.payload;
            state.book.sort((a, b) => {
                if (field === "title") {
                    return order === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
                } else if (field === "date") {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return order === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
                }
                return 0;
            });
        }
    }
});

const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(fetchBook.fulfilled, (state, action) => {
                state.book = action.payload;
                state.loading = false;
            })

            .addCase(fetchBook.rejected, (state, action) => {
                state.error = action.error as Error;
                state.loading = false;
            })

            .addCase(fetchBook.pending, (state) => {
                state.book = [];
                state.error = null;
                state.loading = true;
            })

            .addCase(deleteBook.fulfilled, (state, action) => {
                state.book = state.book.filter((book) => book.id !== action.payload.id);
            })

            .addCase(createBook.fulfilled, (state, action) => {
                state.book = [...state.book, action.payload];
                state.loading = false;
            })
            .addCase(createBook.rejected, (state, action) => {
                if (action.payload) state.errorFromForm = action.payload;
                else state.error = action.error as Error;
                state.loading = false;
            })
            .addCase(createBook.pending, (state) => {
                state.errorFromForm = [];
                state.error = null;
                state.loading = true;
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                const updatedBookIndex = state.book.findIndex((book) => book.id === action.payload.id);
                if (updatedBookIndex !== -1) {
                    state.book[updatedBookIndex] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateBook.rejected, (state, action) => {
                if (action.payload) state.errorFromForm = action.payload;
                else state.error = action.error as Error;
                state.loading = false;
            })
            .addCase(updateBook.pending, (state) => {
                state.errorFromForm = [];
                state.error = null;
                state.loading = true;
            });
    },
});

export const book = bookSlice;
export const { sort } = sortBooks.actions;