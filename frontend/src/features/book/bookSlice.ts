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

export const fetchBook = createAsyncThunk(
    "fetch/book",

    async () => {
        return await axiosForum
            .get<IBook[]>("/book")
            .then((res) => res.data);
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
    number,
    { state: RootState }
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
            });
    },
});

export const book = bookSlice;