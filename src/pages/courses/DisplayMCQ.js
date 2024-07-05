import React, { useCallback, useEffect, useState } from "react";
import { propStyles, useStyles } from "../../assets/styles.js";
import {  Grid, TextField, FormControl, InputLabel, MenuItem, Select, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { Colors } from "../../assets/styles.js";
import { AddCircleRounded } from "@mui/icons-material";
import logo_icon from "../../assets/images/logo_icon.png";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { connect } from "react-redux";
import * as MCQActions from "../../redux/Actions/mcqActions.js";
import { useParams } from "react-router-dom";

const DisplayMCQ = ({ dispatch, mcqData }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const {liveClassId} = useParams();

  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState("");
  const [mcqId, setMcqId] = useState("");
  const [choices, setChoices] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);
  const [error, setError] = useState("");

  useEffect(function () {
    dispatch(MCQActions.getMCQData());
  }, []);


  const handleOpen = (rowData) => {
    setOpen(true);
    setMcqId(rowData._id);
    setStatus(rowData.status);
    setQuestion(rowData?.question)
  };

  const handleChoiceChange = (index, field, value) => {
    const newChoices = [...choices];
    newChoices[index][field] = value;
    handleError("choices", "", index); // Clear error on change
    setChoices(newChoices);
  };

  const handleCorrectAnswerChange = (index) => {
    const newChoices = choices?.map((choice, i) => ({
      ...choice,
      isCorrect: i === index,
    }));
    setChoices(newChoices);
  };


  const handleError = (field, message) => {
    setError((prevError) => ({ ...prevError, [field]: message }));
  };

  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };

  const validation = () => {
    var isValid = true;
    if (!question) {
      handleError("question", "Please input Question");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      const formData = {
        question,
        status,
        choices,
        liveClassId,
      };
      dispatch(MCQActions.updateMCQ({ formData, mcqId }));
      setOpen(false);
    }
  };

  const handleClose = useCallback(() => {
    setMcqId("");
    setOpen(false);
  });

  const handleClickOpen = (rowData) => {

    Swal.fire({
      title: 'Are you sure to Change the Status?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const newStatus = rowData.status === 'Active' ? 'InActive' : 'Active';
        dispatch(MCQActions.updateMCQStatus({ mcqId: rowData._id, status: newStatus }));
      }
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        {mcqData && displayTable()}
        {editModal()}
      </div>
    </div>
  );
  function displayTable() {
    return (
        <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="MCQ'S"
            data={mcqData}
            columns={[
                {
                    title: "S.No",
                    editable: "never",
                    render: (rowData) =>
                      Array.isArray(mcqData)
                        ? mcqData.indexOf(rowData) + 1
                        : "N/A",
                  },
              { title: "Question", field: "question" },
              {
                title: "Correct Choice",
                render: (rowData) =>
                  rowData.choices.find((choice) => choice.isCorrect)?.text || "N/A",
              },

              {
                title: "Status",
                field: "status",
                render: rowData => (
                  <div
                    className={classes.statusButton}
                    style={{ backgroundColor: rowData.status === 'Active' ? '#90EE90' : '#FF7F7F' }}
                    onClick={() => handleClickOpen(rowData)}
                  >
                    {rowData.status}
                  </div>
                ),
              },
            ]}
            options={propStyles.tableStyles}
            style={{ fontSize: "1.4rem" }}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit MCQ",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete MCQ",
                onClick: (event, rowData) =>
                  dispatch(
                    MCQActions.deleteMCQ({
                      mcqId: rowData._id,
                      title: rowData.title,
                    })
                  ),
              },
              {
                icon: () => (
                  <div className={classes.addButton}>
                    <AddCircleRounded />
                    <div className={classes.addButtontext}>Add New</div>
                  </div>
                ),
                tooltip: "Add MCQ",
                isFreeAction: true,
                onClick: () => navigate(`/addMCQ/${liveClassId}`),
              },
            ]}
          />
        </Grid>
      </Grid>
    );
  }

  function editModal() {
    const showEditForm = () => {
        return (
          <Grid container spacing={2}>
            <Grid item lg={12} sm={12} md={12} xs={12}>
              <div className={classes.headingContainer}>
                <div className={classes.heading}>Edit MCQ</div>
                <div onClick={handleClose} className={classes.closeButton}>
                  <CloseRounded />
                </div>
              </div>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                label="Enter Question"
                error={!!error.question}
                helperText={error.question}
                value={question}
                onFocus={() => handleError("question", "")}
                onChange={(event) => setQuestion(event.target.value)}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item lg={6} sm={12} md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="select-label">Select Status</InputLabel>
                <Select
                  labelId="select-label"
                  value={status}
                  onChange={handleOptionChange}
                  variant="outlined"
                  error={!!error.status}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="InActive">InActive</MenuItem>
                </Select>
                <div className={classes.errorstyles}>{error.status}</div>
              </FormControl>
            </Grid>
            {/* {choices.map((choice, index) => (
              <Grid item lg={6} sm={12} md={6} xs={12} key={index}>
                <TextField
                  label={`Choice ${index + 1}`}
                  error={!!error.choices[index]}
                  helperText={error.choices[index]}
                  value={choice.text}
                  onChange={(event) => handleChoiceChange(index, "text", event.target.value)}
                  variant="outlined"
                  fullWidth
                />
                <RadioGroup
                  row
                  value={choice.isCorrect ? index : null}
                  onChange={() => handleCorrectAnswerChange(index)}
                >
                  <FormControlLabel
                    value={index}
                    control={<Radio checked={choice.isCorrect} />}
                    label="Correct Answer"
                  />
                </RadioGroup>
              </Grid>
            ))} */}
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <div onClick={handleSubmit} className={classes.submitbutton}>
                Submit
              </div>
            </Grid>
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <div onClick={handleClose} className={classes.denyButton}>
                Cancel
              </div>
            </Grid>
          </Grid>
        );
      };

    return (
      <div>
        <Dialog open={open}>
          <DialogContent>{showEditForm()}</DialogContent>
        </Dialog>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  mcqData: state.mcq.mcqData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DisplayMCQ);
