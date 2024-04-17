import { useState } from "react";
import { IconButton, Typography, Grid, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from '@mui/icons-material/Info';
import DeleteModal from "../UI/DeleteModal/DeleteModal";
import BookDetailsModal from "../UI/BookDetailsModal/BookDetailsModal";

interface Props {
  id: number;
  title: string;
  author: string;
  description: string;
  date: string;
  onDelete: (id: number) => void;
}

const BookForm = ({
  title,
  author,
  description,
  date,
  id,
  onDelete,
}: Props) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(id);
    setDeleteModalOpen(false);
  };

  const handleDetailsClick = () => {
    setDetailsModalOpen(true);
  };

  const handleCloseModals = () => {
    setDeleteModalOpen(false);
    setDetailsModalOpen(false);
  };

  return (
    <Box
      component="div"
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      width="100%"
      border="1px solid #fff"
      borderRadius={8}
      marginBottom={2}
      className="block 1"
    >
      <Grid container spacing={2} margin={0} justifyContent="center" className="block 2">
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          width="100%"
          justifyContent="space-evenly"
          className="block 3"
        >
          <Box display="flex" justifyContent="space-around">
            <Typography variant="h5" mt={1}>
              {title}
            </Typography>

            <IconButton aria-label="details" onClick={handleDetailsClick}>
              <InfoIcon />
            </IconButton>

            <IconButton aria-label="delete" onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Grid>

      <DeleteModal
        open={deleteModalOpen}
        handleClose={handleCloseModals}
        handleDelete={handleDeleteConfirm}
      />

      <BookDetailsModal
        open={detailsModalOpen}
        handleClose={handleCloseModals}
        id={id}
        title={title}
        author={author}
        description={description}
        date={date}
      />
    </Box>
  );
};

export default BookForm;
