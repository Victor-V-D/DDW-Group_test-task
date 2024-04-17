import { Modal, Box } from "@mui/material";
import EditBookForm from "@/components/BookForm/EditBookForm";
import IErrors from "@/interfaces/IErrors";

interface Props {
  open: boolean;
  handleClose: () => void;
  bookData: {
    id: number;
    title: string;
    author: string;
    description: string;
    date: string;
  };
  onSubmit: (id: number, data: FormData) => void;
  onCancel: () => void;
  errorFromForm: IErrors[];
}

const EditBookModal = (props: Props) => {
  const { open, handleClose, bookData, onSubmit, onCancel, errorFromForm } = props;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <EditBookForm id={bookData.id} onSubmit={onSubmit} onCancel={onCancel} errorFromForm={errorFromForm} bookData={bookData} />
      </Box>
    </Modal>
  );
};

export default EditBookModal;