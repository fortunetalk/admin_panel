import React, { useState, useEffect } from "react";
import { useStyles } from "../../assets/styles.js";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {Select, Avatar, CircularProgress} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getBlogCategory } from "../../redux/Actions/blogCategoryActions.js";
import { addBlog } from "../../redux/Actions/blogActions.js";

export const AddAstroblog = ({appBlogCategoryData, addBlog, isLoading}) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const navigate = useNavigate();

  const [error, setError] = useState({
    title: "",
    status: "",
    created_by: "",
    description: "",
    blogCategoryId: "",
  });

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [created_by, setcreated_by] = useState("");
  const [description, setdescription] = useState("");
  const [icon, setIcon] = useState({ file: '', bytes: null });
  const [file, setFile] = useState(null);
  const [blogCategoryId, setBlogCategoryId] = useState("");

  const [galleryImage, setGalleryImage] = useState([]);
  const [galleryFiles, setGalleryFiles] = useState([]);

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
    const updatedGalleryImages = files.map((file) => URL.createObjectURL(file));

    // Reset the state before updating with new files
    setGalleryImage(updatedGalleryImages);
    setGalleryFiles(files);
  };

  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = () => {
    // Validate fields before submitting
    if (!title || !status || !created_by || !description || galleryFiles.length === 0) {
      setError({
        title: !title ? "Title is required" : "",
        status: !status ? "Status is required" : "",
        description: !description ? "Description is required" : "",
        gallery: galleryFiles.length === 0 ? "At least one gallery image is required" : "",
      });
      return;
    }
    
    const blogData = {
      title,
      status,
      created_by,
      description,
      blogCategoryId,
      galleryImage:galleryFiles,
      image: file
    };
    
    addBlog(blogData);
    // handleReset();
  };

  const handleReset = () => {
    setError({
      title: "",
      status: "",
      created_by: "",
      description: "",
    });
    setTitle("");
    setStatus("");
    setcreated_by("");
    setdescription("");
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
                  Display/AddBlog
                </div>
              </div>
            </div>
          </Grid>

          <Grid item lg={6} sm={12} md={12} xs={12}>
          <FormControl fullWidth>
      <InputLabel id="blog-category-select-label">Select Blog Category</InputLabel>
      <Select labelId="blog-category-select-label" id="blog-category-select" value={blogCategoryId}
                onChange={(e) => setBlogCategoryId(e.target.value)}>
        {appBlogCategoryData?.map(category => (
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

              <div className={classes.errorStyle}>{error.gallery}</div>
            </Grid>

            <Grid item lg={12} sm={12} md={12} xs={12}>
              {/* <Typography variant="h6" component="label">Gallery Image</Typography>  */}
              <Grid
                container
                direction="row"
                spacing={2}
                style={{ overflowX: "auto", whiteSpace: "nowrap" }}
              >
                {galleryImage.map((imgSrc, index) => (
                  <Grid item key={index} style={{ width: "auto" }}>
                    <Avatar
                      src={imgSrc}
                      variant="square"
                      style={{ width: "100px", height: "100px" }}
                    />
                  </Grid>
                ))}
              </Grid>
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
                {isLoading ? <CircularProgress size={24} /> : " Submit"}
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

// const mapDispatchToProps = {
//   activeBlogCategory,
// };
const mapDispatchToProps = (dispatch) => ({
  addBlog: (category) => dispatch(addBlog(category)),
  getBlogCategory
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAstroblog);