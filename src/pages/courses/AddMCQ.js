import React, { useCallback, useState } from "react";
import { useStyles } from "../../assets/styles.js";
import {
  Avatar,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { Colors } from "../../assets/styles.js";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import * as MCQActions from "../../redux/Actions/mcqActions.js";

const AddMCQ = ({ dispatch, isLoading }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { liveClassId } = useParams();

  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState("");
  const [choices, setChoices] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);
  const [error, setError] = useState({
    question: "",
    status: "",
    choices: ["", "", "", ""],
  });

  const handleError = (field, message, index = null) => {
    if (index !== null) {
      setError((prevError) => {
        const newErrors = [...prevError.choices];
        newErrors[index] = message;
        return { ...prevError, choices: newErrors };
      });
    } else {
      setError((prevError) => ({ ...prevError, [field]: message }));
    }
  };

  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };

  const handleChoiceChange = (index, field, value) => {
    const newChoices = [...choices];
    newChoices[index][field] = value;
    handleError("choices", "", index); // Clear error on change
    setChoices(newChoices);
  };

  const handleCorrectAnswerChange = (index) => {
    const newChoices = choices.map((choice, i) => ({
      ...choice,
      isCorrect: i === index,
    }));
    setChoices(newChoices);
  };

  const validation = () => {
    let isValid = true;

    if (!question) {
      handleError("question", "Please input question");
      isValid = false;
    }

    if (!status) {
      handleError("status", "Please select status");
      isValid = false;
    }

    choices.forEach((choice, index) => {
      if (!choice.text) {
        handleError("choices", "Please input choice", index);
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      const formData = {
        question: question,
        status: status,
        choices: choices,
        liveClassId: liveClassId,
      };

      dispatch(MCQActions.addMCQ(formData));
      handleReset();
    }
  };

  const handleReset = useCallback(() => {
    setQuestion("");
    setStatus("");
    setChoices([
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ]);
    setError({
      question: "",
      status: "",
      choices: ["", "", "", ""],
    });
  });

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add MCQ</div>
              <div
                onClick={() => navigate(`/mcqList/${liveClassId}`)}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display MCQ'S</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Enter Question"
              error={error.question ? true : false}
              helperText={error.question}
              value={question}
              onFocus={() => handleError("question", null)}
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

          {choices.map((choice, index) => (
            <Grid item lg={6} sm={12} md={6} xs={12} key={index}>
              <TextField
                label={`Choice ${index + 1}`}
                error={!!error.choices[index]}
                helperText={error.choices[index]}
                value={choice.text}
                onChange={(event) =>
                  handleChoiceChange(index, "text", event.target.value)
                }
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
          ))}

          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleSubmit} className={classes.submitbutton}>
              {isLoading ? <CircularProgress size={24} /> : "Submit"}
            </div>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleReset} className={classes.denyButton}>
              Reset
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.mcq.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AddMCQ);
