import React, { useState, useEffect } from "react";
import { useStyles } from "../../assets/styles.js";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Select, Avatar, CircularProgress, MenuItem, Grid, TextField } from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getBlogCategory } from "../../redux/Actions/blogCategoryActions.js";
import { addBlog } from "../../redux/Actions/blogActions.js";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const AddAstroblog = ({ appBlogCategoryData, addBlog, isLoading }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();

  const [error, setError] = useState({
    title: "",
    status: "",
    description: "",
    blogCategoryId: "",
    gallery: "",
  });

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState({ file: '', bytes: null });
  const [file, setFile] = useState(null);
  const [blogCategoryId, setBlogCategoryId] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    if (!appBlogCategoryData) {
      dispatch(getBlogCategory());
    }
  }, [dispatch, appBlogCategoryData]);

  const handleIcon = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setIcon({
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0],
      });
      setFile(e.target.files[0]);
    }
  };

  const handleGallery = (event) => {
    const files = Array.from(event.target.files);
    setGalleryImages(files);
  };

  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async () => {
    // Validate fields before submitting
    if (!title || !status || !description || !blogCategoryId) {
      setError({
        title: !title ? "Title is required" : "",
        status: !status ? "Status is required" : "",
        description: !description ? "Description is required" : "",
        blogCategoryId: !blogCategoryId ? "Category is required" : "",
        gallery: galleryImages.length === 0 ? "At least one gallery image is required" : "",
      });
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('status', status);
    formData.append('description', description);
    formData.append('blogCategoryId', blogCategoryId);

    if (file) {
      formData.append('image', file);
    }

    galleryImages.forEach((img, index) => {
      formData.append('galleryImage', img);
    });

    try {
      await addBlog(formData);
      handleReset();
    } catch (error) {
      console.error("Failed to submit blog", error.response?.data || error.message);
      setError({ ...error.response?.data, gallery: "Failed to upload gallery images" });
    }
  };

  const handleReset = () => {
    setError({
      title: "",
      status: "",
      description: "",
      gallery: "",
      blogCategoryId: "",
    });
    setTitle("");
    setStatus("");
    setDescription("");
    setIcon({ file: '', bytes: null });
    setFile(null);
    setGalleryImages([]);
    setBlogCategoryId("");
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Blog</div>
              <div
                onClick={() => navigate("/displayAstroblog")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>
                  Display/Add Blog
                </div>
              </div>
            </div>
          </Grid>

          <Grid item lg={6} sm={12} md={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="blog-category-select-label">Select Blog Category</InputLabel>
              <Select
                labelId="blog-category-select-label"
                id="blog-category-select"
                value={blogCategoryId}
                onChange={(e) => setBlogCategoryId(e.target.value)}
                error={!!error.blogCategoryId}
              >
                {appBlogCategoryData?.map(category => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.title}
                  </MenuItem>
                ))}
              </Select>
              <div className={classes.errorstyles}>{error.blogCategoryId}</div>
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
            lg={4}
            sm={6}
            md={6}
            xs={6}
            className={classes.uploadContainer}
          >
            <label className={classes.uploadImageButton}>
              Upload Picture
              <input
                onChange={handleIcon}
                hidden
                accept="image/*"
                type="file"
              />
            </label>
            <div className={classes.errorstyles}>{error.icon}</div>
          </Grid>
          <Grid item lg={2} sm={6} md={2} xs={6}>
            <Avatar src={icon.file} style={{ width: 56, height: 56 }} />
          </Grid>

          <Grid
            item
            lg={6}
            sm={12}
            md={12}
            xs={12}
            className={classes.uploadContainer}
          >
            <Grid component="label" className={classes.uploadImageButton}>
              Upload Gallery Images
              <input
                onChange={handleGallery}
                hidden
                accept="image/*"
                type="file"
                multiple
              />
            </Grid>
            <div className={classes.errorstyles}>{error.gallery}</div>
          </Grid>

          <Grid item lg={12} sm={12} md={12} xs={12}>
            <Grid
              container
              direction="row"
              spacing={2}
              style={{ overflowX: "auto", whiteSpace: "nowrap" }}
            >
              {galleryImages.map((img, index) => (
                <Grid item key={index} style={{ width: "auto" }}>
                  <Avatar
                    src={URL.createObjectURL(img)}
                    variant="square"
                    style={{ width: "100px", height: "100px" }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item lg={12} sm={12} md={12} xs={12}>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              placeholder="Enter description..."
            />
            <div className={classes.errorstyles}>{error.description}</div>
          </Grid>

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
  appBlogCategoryData: state.blogCategory?.appBlogCategoryData,
  isLoading: state.blog.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  addBlog: (formData) => dispatch(addBlog(formData)),
  getBlogCategory: () => dispatch(getBlogCategory()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAstroblog);
