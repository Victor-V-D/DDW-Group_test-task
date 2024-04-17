import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

interface Props {
    open: boolean;
    handleClose: () => void;
    handleDelete: () => void;
}

const DeleteModal = ({ open, handleClose, handleDelete }: Props) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Are you sure you want to delete this book?</DialogTitle>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDelete} color="error">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteModal;
