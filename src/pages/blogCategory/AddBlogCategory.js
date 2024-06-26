// AddBlogCategory.js
import React, { useState } from "react";
import { useStyles } from "../../assets/styles.js";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { addBlogCategory, getBlogCategory } from "../../redux/Actions/blogCategoryActions.js";

const AddBlogCategory = ({ addBlogCategory }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();

  const [error, setError] = useState({
    title: "",
    status: "",
  });

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");

  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = () => {
    // Validate fields before submitting
    if (!title || !status) {
      setError({
        title: !title ? "title is required" : "",
        status: !status ? "Status is required" : "",
      });
      return;
    }

    addBlogCategory({ title, status });


    setError({
      title: "",
      status: "",
    });
    setTitle("");
    setStatus("");
    dispatch(getBlogCategory());
    navigate('/displayBlogCategory');
  };

  const handleReset = () => {
    setError({
      title: "",
      status: "",
    });
    setTitle("");
    setStatus("");
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Blog Category</div>
              <div
                onClick={() => navigate("/displayBlogCategory")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>
                  Display/AddBlogCategory
                </div>
              </div>
            </div>
          </Grid>

          <Grid container item lg={12} sm={12} md={12} xs={12} alignItems="center" spacing={2}>
            <Grid item lg={6} sm={12} md={6} xs={12}>
              <TextField
                label="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                variant="outlined"
                fullWidth
                error={!!error.title}
                helperText={error.title}
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
          </Grid>

          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleSubmit} className={classes.submitbutton}>
              Submit
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

const mapDispatchToProps = (dispatch) => ({
  addBlogCategory: (category) => dispatch(addBlogCategory(category)),
});

export default connect(null, mapDispatchToProps)(AddBlogCategory);
