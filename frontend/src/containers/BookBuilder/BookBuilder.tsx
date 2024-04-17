import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchBook, deleteBook, updateBook } from "@/features/book/bookSlice";
import BookForm from "@/components/BookForm/BookForm";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Preloader from "@/components/UI/Preloader/Preloader";
import { Alert, Button } from "@mui/material";
import "./BookBuilder.css"

const BookBuilder = () => {
  const dispatch = useAppDispatch();
  const { book, loading, error } = useAppSelector((state) => state.book);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  const handleDelete = async (id: number) => {
    await dispatch(deleteBook(id));
  };

  const handleEdit = async (id: number, data: FormData) => {
    await dispatch(updateBook({ id, bookData: data }));
  };

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedBooks = [...book].sort((a, b) => {
    if (sortField === 'title') {
      return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    } else if (sortField === 'date') {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    }
    return 0;
  });

  useEffect(() => {
    dispatch(fetchBook(searchQuery));
  }, [dispatch, searchQuery]);

  return (
    <>
      {loading && <Preloader show />}
      <Container>
        <div className="main">
          <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
            Books
          </Typography>

          <div className="sort-buttons">
            <Button onClick={() => handleSort("title")}>Sort by Title</Button>
            <Button onClick={() => handleSort("date")}>Sort by Date</Button>
          </div>

          {error && (
            <Alert sx={{ width: "100%", mt: 2 }} severity="error">
              {error.message}
            </Alert>
          )}
          {sortedBooks.map((bookItem) => (
            <div key={bookItem.id} style={{ marginBottom: "16px", width: "80%" }}>
              <BookForm
                {...bookItem}
                onDelete={handleDelete}
                onEdit={(id: number, data: FormData) => handleEdit(id, data)}
                sortField={sortField}
                sortOrder={sortOrder}
              />
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default BookBuilder;
