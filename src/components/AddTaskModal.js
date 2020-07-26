import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
  MenuItem,
  FormLabel,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import "./AddTaskModal.css";

const AddTaskModal = (props) => {
  const { visible, createTask, onDismiss } = props;
  const onSubmit = (e) => {
    // debugger;
    e.preventDefault();
    const form = e.currentTarget;
    let formValues = {};
    for (let i = 0; i < 3; i++) {
      formValues[i === 1 ? "priority" : form[i].id] = form[i].value;
    }
    formValues.deadlineDate = formValues.deadlineDate ?  new Date(formValues.deadlineDate).getTime() : null;
    formValues.createdOn = new Date().getTime();
    console.log(formValues); //description, priority, createdOn, deadlineDate
    createTask(formValues);
  };

  return (
    <Dialog open={visible} onClose={onDismiss} fullWidth closeAfterTransition>
      <DialogTitle>
        Add Task
        <IconButton
          aria-label="close"
          className="modal-close-button"
          onClick={onDismiss}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers className="dialog-content">
        <form id="formId" onSubmit={onSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            required
          />
          <TextField
            required
            fullWidth
            select
            label="Priority"
            id="priority"
            helperText="Please select a priority"
          >
            <MenuItem value="high">High Priority</MenuItem>
            <MenuItem value="medium">Medium Priority</MenuItem>
            <MenuItem value="low">Low Priority</MenuItem>
          </TextField>
          <div className="deadline-div">
            <FormLabel>Deadline Date:</FormLabel>
            <TextField id="deadlineDate" type="date" margin="dense" />
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onDismiss} color="secondary">
          Cancel
        </Button>
        <Button type="submit" form="formId" variant="contained" color="primary">
          Create Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskModal;
