import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CategoryAlert({ rowOpen, setRowOpen, newRow, setNewRow, handleAddRow }) {
  const handleClose = () => {
    setRowOpen(false);
  };

  const handleChange = (e) => {
    setNewRow(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddRow();
  };

  return (
    <React.Fragment>
      <Dialog open={rowOpen} onClose={handleClose}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the New Row Content
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="category"
            label="Category"
            type="text"
            fullWidth
            variant="standard"
            value={newRow}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="category"
            label="Category"
            type="text"
            fullWidth
            variant="standard"
            value={newRow}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="category"
            label="Category"
            type="text"
            fullWidth
            variant="standard"
            value={newRow}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="category"
            label="Category"
            type="text"
            fullWidth
            variant="standard"
            value={newRow}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="category"
            label="Category"
            type="text"
            fullWidth
            variant="standard"
            value={newRow}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="category"
            label="Category"
            type="text"
            fullWidth
            variant="standard"
            value={newRow}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
