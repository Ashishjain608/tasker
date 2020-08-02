import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import "./AddTaskModal.css";

const AddTaskModal = (props) => {
  const { visible, createTask, onDismiss } = props;
  const [prioValue, setPrioValue] = useState("medium");
  const onSubmit = (e) => {
    // debugger;
    e.preventDefault();
    const description = document.getElementById("description").value;
    // const priority = document.getElementById('priorityRadioGroup').value;
    const deadlineDate = new Date(
      document.getElementById("deadlineDate").value
    );
    createTask({
      description,
      priority: prioValue,
      deadlineDate: isNaN(deadlineDate) ? null : deadlineDate.getTime(),
    });
  };

  const handleRadioChange = (event) => {
    setPrioValue(event.target.value);
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
      <DialogContent dividers>
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
          <div className="form-item-div">
            <FormLabel required>Priority</FormLabel>
            <RadioGroup
              id="priorityRadioGroup"
              required
              row
              name="position"
              value={prioValue}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="high"
                control={<Radio color="secondary" />}
                label="High"
                labelPlacement="top"
              />
              <FormControlLabel
                value="medium"
                control={<Radio color="default" />}
                label="Medium"
                labelPlacement="top"
              />
              <FormControlLabel
                value="low"
                control={<Radio color="primary" />}
                label="Low"
                labelPlacement="top"
              />
            </RadioGroup>
          </div>

          <div className="form-item-div">
            <FormLabel>Deadline Date</FormLabel>
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
