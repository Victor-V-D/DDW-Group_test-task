import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

interface Props {
    id: number;
    title: string;
    author: string;
    description: string;
    date: string;
    open: boolean;
    handleClose: () => void;
}

const BookDetailsModal = ({ open, handleClose, id, title, author, description, date }: Props) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Book Details</DialogTitle>
            <DialogContent>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="body1">Author: {author}</Typography>
                <Typography variant="body1">Description: {description}</Typography>
                <Typography variant="body1">Date: {date}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default BookDetailsModal;
