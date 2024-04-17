import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { createBook } from "@/features/book/bookSlice";
import AddBookForm from "@/components/BookForm/AddBookForm";
import { useNavigate } from "react-router-dom";
import { Alert, Paper, Typography } from "@mui/material";
import Preloader from "@/components/UI/Preloader/Preloader";

const CreateBook = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { errorFromForm, error, loading } = useAppSelector(
    (state) => state.book
  );

  const onBookFormSubmit = async (bookData: FormData) => {
    try {
      await dispatch(createBook(bookData))
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch();
    } catch (error) {}
  };

  return (
    <>
      {loading && <Preloader show />}
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h4">New book</Typography>
        {error && (
          <Alert sx={{ width: "100%", mt: 2 }} severity="error">
            {error.message}
          </Alert>
        )}
        <AddBookForm
          onSubmit={onBookFormSubmit}
          errorFromForm={errorFromForm}
        />
      </Paper>
    </>
  );
};

export default CreateBook;
