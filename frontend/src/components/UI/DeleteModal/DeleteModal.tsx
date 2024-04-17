import { RootState } from "@/store/store";
import { Dialog, DialogTitle, DialogActions, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

interface Props {
    open: boolean;
    handleClose: () => void;
    handleDelete: () => void;
}

const DeleteModal = ({ open, handleClose, handleDelete }: Props) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [error, setError] = useState<string | null>(null);

    const handleDeleteConfirm = () => {
        if (!user) {
            setError("You must be authorized to delete a book or be the creator of the selected book.");
            return;
        }
        handleDelete();
        handleClose();
    }

    const handleCloseModal = () => {
        setError(null);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleCloseModal}>
            <DialogTitle>Are you sure you want to delete this book?</DialogTitle>
            {error && (
                <Typography color="error" variant="body1" align="center" style={{ marginTop: 10 }}>
                    {error}
                </Typography>
            )}
            <DialogActions>
                <Button onClick={handleCloseModal}>Cancel</Button>
                <Button onClick={handleDeleteConfirm} color="error">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteModal;
