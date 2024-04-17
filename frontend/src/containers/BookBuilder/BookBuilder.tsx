import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchBook, deleteBook } from "@/features/book/bookSlice";
import BookForm from "@/components/BookForm/BookForm";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Preloader from "@/components/UI/Preloader/Preloader";
import { Alert } from "@mui/material";
import "./BookBuilder.css"

const BookBuilder = () => {
  const dispatch = useAppDispatch();
  const { book, loading, error } = useAppSelector((state) => state.book);

  const handleDelete = async (id: number) => {
    await dispatch(deleteBook(id));
  };

  useEffect(() => {
    dispatch(fetchBook());
  }, [dispatch]);

  return (
    <>
      {loading && <Preloader show />}
      <Container>
        <div className="main">
          <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
            Books
          </Typography>
          {error && (
            <Alert sx={{ width: "100%", mt: 2 }} severity="error">
              {error.message}
            </Alert>
          )}
          {book.map((bookItem) => (
            <div key={bookItem.id} style={{ marginBottom: "16px", width: "80%" }}>
              <BookForm
                title={bookItem.title}
                author={bookItem.author}
                description={bookItem.description}
                date={bookItem.date}
                id={bookItem.id}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default BookBuilder;
