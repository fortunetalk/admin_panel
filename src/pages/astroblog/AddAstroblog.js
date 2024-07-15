import React, { useState, useEffect } from "react";
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
import { activeBlogCategory } from "../../redux/Actions/blogCategoryActions.js";
import { addBlog } from "../../redux/Actions/blogActions.js";

export const AddAstroblog = ({activeBlogCategoryData, addBlog}) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const navigate = useNavigate();

  const [error, setError] = useState({
    title: "",
    image: "",
    status: "",
    created_by: "",
    description: "",
    blogCategoryId: "",
  });

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [created_by, setcreated_by] = useState("");
  const [description, setdescription] = useState("");
  const [image, setimage] = useState(null);
  const [blogCategoryId, setBlogCategoryId] = useState("");

  useEffect(() => {
    if (!activeBlogCategoryData) {
      dispatch(activeBlogCategory());
    }
  }, [dispatch, activeBlogCategoryData]);


  const handleProfile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setimage({
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0],
      });
      // Add your logic for handling profile photo here
    }
  };
  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = () => {
    // Validate fields before submitting
    if (!title || !status || !created_by || !description) {
      setError({
        title: !title ? "title is required" : "",
        status: !status ? "Status is required" : "",
        created_by: !created_by ? "Create By is required" : "",
        description: !description ? "Short Bio is required" : "",
        // image: !image ? "Profile Photo is required" : "",
      });
      return;
    }
    addBlog({ title, status, created_by, description, image, blogCategoryId });
    navigate('/displayAstroblog')


    setError({
      title: "",
      image: "",
      status: "",
      created_by: "",
      description: "",
    });
    setTitle("");
    setStatus("");
    setcreated_by("");
    setdescription("");
    setimage(null);
  };

  const handleReset = () => {
    // Clear errors and reset form
    setError({
      title: "",
      image: "",
      status: "",
      created_by: "",
      description: "",
    });
    setTitle("");
    setStatus("");
    setcreated_by("");
    setdescription("");
    setimage(null);
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Astroblog</div>
              <div
                onClick={() => navigate("/displayAstroblog")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>
                  Display/AddAstroblog
                </div>
              </div>
            </div>
          </Grid>

          <Grid item lg={6} sm={12} md={12} xs={12}>
          <FormControl fullWidth>
      <InputLabel id="blog-category-select-label">Select Blog Category</InputLabel>
      <Select labelId="blog-category-select-label" id="blog-category-select" value={blogCategoryId}
                onChange={(e) => setBlogCategoryId(e.target.value)}>
        {activeBlogCategoryData?.map(category => (
          <MenuItem key={category._id} value={category._id}>
            {category.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
          </Grid>

          <Grid item lg={6} sm={12} md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="select-label">Select Status</InputLabel>
                <Select
                  labelId="select-label"
                  variant="outlined"
                  value={status}
                  onChange={handleOptionChange}
                  error={!!error.status}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="InActive">InActive</MenuItem>
                </Select>
                <div className={classes.errorstyles}>{error.status}</div>
              </FormControl>
            </Grid>

          <Grid item lg={6} sm={12} md={12} xs={12}>
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

          <Grid
            item
            lg={3}
            sm={3}
            md={3}
            xs={3}
            className={classes.uploadContainer}
          >
            <Grid
              component="label"
              onClick={() => {} /* Don't forget to handleProfile here */}
              className={classes.uploadImageButton}
            >
              {image ? (
                <img src={image.file} alt="Profile Preview" />
              ) : (
                "Upload Profile Icon"
              )}
              <input
                onChange={handleProfile}
                hidden
                accept="image/*"
                type="file"
              />
            </Grid>
            <div className={classes.errorstyles}>{error.image}</div>
          </Grid>


          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Created by"
              value={created_by}
              onChange={(e) => setcreated_by(e.target.value)}
              variant="outlined"
              fullWidth
              error={!!error.created_by}
              helperText={error.created_by}
            />
          </Grid>

          <Grid item lg={12} sm={12} md={12} xs={12}>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              label="Description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              variant="outlined"
              fullWidth
              error={!!error.description}
              helperText={error.description}
            />
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

const mapStateToProps = (state) => ({
  activeBlogCategoryData: state.blogCategory?.activeBlogCategoryData,
});

// const mapDispatchToProps = {
//   activeBlogCategory,
// };
const mapDispatchToProps = (dispatch) => ({
  addBlog: (category) => dispatch(addBlog(category)),
  activeBlogCategory
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAstroblog);