import React, { useEffect, useState } from "react";
import { propStyles, useStyles } from "../../assets/styles.js";
import {
  Avatar,
  Grid,
  TextField,
  Dialog,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from "@mui/material";
import { AddCircleRounded, CloseRounded } from "@mui/icons-material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { connect, useDispatch } from "react-redux";
import {
  getBlogs,
  updateBlog,
  deleteBlog,
  deleteMultipleBlog,
  updateBlogStatus
} from "../../redux/Actions/blogActions.js";
import { getBlogCategory } from "../../redux/Actions/blogCategoryActions.js";

const DisplayAstroblog = ({
  appBlogData,
  getBlogs,
  updateBlog,
  deleteBlog,
  deleteMultipleBlog,
  updateBlogStatus,
  appBlogCategoryData
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedRows, setSelectedRows] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const [blogData, setBlogData] = useState({
    _id: "",
    title: "",
    description: "",
    image: { file: "", bytes: "" },
    galleryImages: [],
    status: "",
    oldImage: "",
    categoryId: ""
  });
  const [error, setError] = useState({});

  useEffect(() => {
    if (!appBlogData) {
      dispatch(getBlogs());
    }
  }, [dispatch, appBlogData]);

  useEffect(() => {
    if (!appBlogCategoryData) {
      dispatch(getBlogCategory());
    }
  }, [dispatch, appBlogCategoryData]);

  useEffect(() => {
    console.log("Blog Categories Data:", appBlogCategoryData);
  }, [appBlogCategoryData]);


  const handleOpen = (rowData) => {
    setOpen(true);
    setBlogData({
      _id: rowData._id,
      title: rowData.title,
      description: rowData.description,
      image: { file: `/${rowData.image}`, bytes: "" },
      galleryImages: rowData.galleryImages || [],
      status: rowData.status,
      oldImage: rowData.image,
      categoryId: rowData.categoryId || ""
    });
  };

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setBlogData((prev) => ({
        ...prev,
        image: {
          file: URL.createObjectURL(file),
          bytes: file
        }
      }));
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    const newGalleryImages = files.map(file => ({
      file: URL.createObjectURL(file),
      bytes: file
    }));
    setBlogData((prev) => ({
      ...prev,
      galleryImages: [...prev.galleryImages, ...newGalleryImages]
    }));
  };

  const handleUpdate = () => {
    const { _id, title, description, image, status, galleryImages, categoryId } = blogData;

    if (title && description && image && status && categoryId) {
      const formData = new FormData();
      formData.append('id', _id);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('image', image.bytes);
      formData.append('status', status);
      formData.append('categoryId', categoryId);

      galleryImages.forEach((img) => {
        formData.append('galleryImages', img.bytes);
      });

      dispatch(updateBlog(formData));
      handleClose();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required!",
      });
    }
  };

  const handleClose = () => {
    setBlogData({
      _id: "",
      title: "",
      description: "",
      image: { file: "", bytes: "" },
      galleryImages: [],
      status: "",
      oldImage: "",
      categoryId: ""
    });
    setOpen(false);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBlog(id));
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedRows([]);
      setIsAllSelected(false);
    } else {
      setSelectedRows(appBlogData);
      setIsAllSelected(true);
    }
  };

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
        dispatch(updateBlogStatus({ blogId: rowData._id, status: newStatus }));
      }
    });
  };

  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Blog List"
            data={appBlogData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: rowData => Array.isArray(appBlogData) ? appBlogData.indexOf(rowData) + 1 : 'N/A'
              },
              { title: "Title", field: "title" },
              {
                title: "Image",
                field: "image",
                render: (rowData) => (
                  <Avatar
                    src={rowData.image}
                    style={{ width: 50, height: 50 }}
                    variant="rounded"
                  />
                ),
              },
              {
                title: "Status",
                field: "status",
                render: rowData => (
                  <div className={classes.statusButton}
                    style={{ backgroundColor: rowData.status === 'Active' ? '#90EE90' : '#FF7F7F ' }}
                    onClick={() => handleClickOpen(rowData)}>
                    {rowData.status}
                  </div>
                )
              },
            ]}
            options={propStyles.tableStyles}
            style={{ fontSize: "1.4rem" }}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Blog",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Blog",
                onClick: (event, rowData) => handleDelete(rowData?._id),
              },
              {
                icon: () => (
                  <div className={classes.addButton}>
                    <AddCircleRounded />
                    <div className={classes.addButtontext}>Add New</div>
                  </div>
                ),
                tooltip: "Add Blog",
                isFreeAction: true,
                onClick: () => navigate("/AddAstroblog"),
              },
            ]}
          />
        </Grid>
      </Grid>
    );
  }

  const editModal = () => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item lg={12} sm={12} md={12} xs={12}>
              <div className={classes.headingContainer}>
                <div className={classes.heading}>Edit Blog</div>
                <div onClick={handleClose} className={classes.closeButton}>
                  <CloseRounded />
                </div>
              </div>
            </Grid>
            <Grid item lg={6} sm={12} md={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="blog-category-select-label">Select Blog Category</InputLabel>
                <Select
                  labelId="blog-category-select-label"
                  id="blog-category-select"
                  name="categoryId"
                  value={blogData.categoryId}
                  onChange={handleChange}
                  error={!!error.categoryId}
                >
                  {appBlogCategoryData?.map(category => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.title}
                    </MenuItem>
                  ))}
                </Select>
                <div className={classes.errorstyles}>{error.categoryId}</div>
              </FormControl>
            </Grid>

            <Grid item lg={6} sm={12} md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="status-select-label">Select Status</InputLabel>
                <Select
                  labelId="status-select-label"
                  id="status-select"
                  name="status"
                  value={blogData.status}
                  onChange={handleChange}
                  error={!!error.status}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="InActive">InActive</MenuItem>
                </Select>
                <div className={classes.errorstyles}>{error.status}</div>
              </FormControl>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <TextField
                label="Title"
                name="title"
                error={!!error.title}
                helperText={error.title}
                value={blogData.title}
                onFocus={() => handleError("title", null)}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <TextField
                label="Description"
                name="description"
                error={!!error.description}
                helperText={error.description}
                value={blogData.description}
                onFocus={() => handleError("description", null)}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item lg={6} sm={6} md={6} xs={6} className={classes.uploadContainer}>
              <Grid component="label" className={classes.uploadImageButton}>
                Upload Picture
                <input
                  onChange={handleImageChange}
                  hidden
                  accept="image/*"
                  type="file"
                />
              </Grid>
            </Grid>
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <Avatar
                src={blogData.image?.file}
                style={{ width: 56, height: 56 }}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Grid component="label" className={classes.uploadImageButton}>
                Upload Gallery Images
                <input
                  onChange={handleGalleryChange}
                  hidden
                  accept="image/*"
                  type="file"
                  multiple
                />
              </Grid>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Grid container spacing={1}>
                {blogData.galleryImages.map((img, index) => (
                  <Grid item lg={2} md={3} sm={4} xs={6} key={index}>
                    <Avatar
                      src={img.file}
                      style={{ width: 56, height: 56, margin: 4 }}
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
                variant="outlined"
                fullWidth
                error={!!error.description}
                helperText={error.description}
              />
            </Grid>

            <Grid item lg={12} sm={12} md={12} xs={12} container justifyContent="center" alignItems="center">
              <Button onClick={handleUpdate} variant="contained" color="primary" style={{ marginRight: "10px" }}>
                Submit
              </Button>
              <Button onClick={handleClose} variant="outlined" color="secondary">
                Reset
              </Button>
            </Grid>


          </Grid>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        {displayTable()}
        {editModal()}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  appBlogData: state.blog?.appBlogData,
  appBlogCategoryData: state.blog?.appBlogCategoryData
});

const mapDispatchToProps = (dispatch) => ({
  getBlogs: () => dispatch(getBlogs()),
  updateBlog: (formData) => dispatch(updateBlog(formData)),
  deleteBlog: (id) => dispatch(deleteBlog(id)),
  deleteMultipleBlog: (ids) => dispatch(deleteMultipleBlog(ids)),
  updateBlogStatus: (statusData) => dispatch(updateBlogStatus(statusData)),
  getBlogCategory: () => dispatch(getBlogCategory()),
});


export default connect(mapStateToProps, mapDispatchToProps)(DisplayAstroblog);
