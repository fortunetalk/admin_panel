import React, { useEffect, useState } from "react";
import { useStyles } from "../../assets/styles.js";
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
  Button,
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
  deleteMultipleBlog
} from "../../redux/Actions/blogActions.js";

const DisplayAstroblog = ({
  appBlogData,
  getBlogs,
  updateBlog,
  deleteBlog,
  deleteMultipleBlog
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
    status: "",
    created_by: "",
    oldImage: "",
  });
  const [error, setError] = useState({});

  useEffect(() => {
    if (!appBlogData) {
      dispatch(getBlogs());
    }
  }, [dispatch, appBlogData]);

  const handleOpen = (rowData) => {
    setOpen(true);
    setBlogData({
      _id: rowData._id,
      title: rowData.title,
      description: rowData.description,
      image: { file: `/${rowData.image}`, bytes: "" },
      status: rowData.status,
      created_by: rowData.created_by,
      oldImage: rowData.image,
    });
  };

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const handleImageChange = (e) => {
    setBlogData({
      ...blogData,
      image: {
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0],
      },
    });
  };

  const handleUpdate = () => {
    const { _id, title, description, image, status, created_by } = blogData;

    if (title && description && image && status && created_by) {
      dispatch(
        updateBlog({
          id: _id,
          title: title,
          description: description,
          image: image,
          status: status,
          created_by: created_by,
        })
      );
      handleClose();
      //   window.location.reload();
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
      status: "",
      created_by: "",
      oldImage: "",
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
      [name]: value,
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

  const handleDeleteSelected = async () => {
    const idsToDelete = selectedRows.map((row) => row._id);
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
        dispatch(deleteMultipleBlog(idsToDelete));
        setSelectedRows([]);
        setIsAllSelected(false);
      }
    });
  };

  const displayTable = () => {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title={
              <>
                
                <Button variant="outlined" color="error" onClick={handleDeleteSelected} disabled={selectedRows.length === 0}>
                  Delete Selected
                </Button>
              </>
            }
            data={appBlogData || []}
            columns={[
              {
                title: (
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                ),
                render: (rowData) => (
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(rowData)}
                    onChange={() => {
                      const isSelected = selectedRows.includes(rowData);
                      if (isSelected) {
                        setSelectedRows(
                          selectedRows.filter((row) => row !== rowData)
                        );
                      } else {
                        setSelectedRows([...selectedRows, rowData]);
                      }
                    }}
                  />
                ),
                editable: "never",
              },
              {
                title: "S.No",
                editable: "never",
                render: (rowData) => appBlogData.indexOf(rowData) + 1,
              },
              {
                title: "Title",
                field: "title",
              },
              {
                title: "Description",
                field: "description",
              },
              {
                title: "Image",
                field: "image",
                render: (rowData) => (
                  <img
                    src={`/${rowData.image}`}
                    alt="Blog"
                    style={{ width: 50, borderRadius: "50%" }}
                  />
                ),
              },
              {
                title: "Status",
                field: "status",
                render: (rowData) =>
                  rowData.status === "InActive" ? "InActive" : "Active",
              },
              {
                title: "Created By",
                field: "created_by",
              },
              {
                title: "Created At",
                field: "createdAt",
                render: (rowData) =>
                  new Date(rowData.createdAt).toLocaleString(),
              },
            ]}
            options={{
              sorting: true,
              search: true,
              searchFieldAlignment: "right",
              filtering: true,
              paging: true,
              pageSize: 5,
              paginationType: "stepped",
              showFirstLastPageButtons: true,
              paginationPosition: "bottom",
              exportButton: false,
              addRowPosition: "first",
              actionsColumnIndex: -1,
              selection: false,
              showSelectAllCheckbox: false,
            }}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Blog",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Blog",
                onClick: (event, rowData) => handleDelete(rowData._id),
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
  };

  const editModal = () => {
    return (
      <Dialog open={open}>
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
            <Grid item lg={12} md={12} sm={12} xs={12}>
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
            <Grid item lg={12} md={12} sm={12} xs={12}>
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
            <Grid
              item
              lg={6}
              sm={6}
              md={6}
              xs={6}
              className={classes.uploadContainer}
            >
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
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status-select"
                  name="status"
                  value={blogData.status}
                  onChange={handleChange}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="InActive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <TextField
                label="Created By"
                name="created_by"
                value={blogData.created_by}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <div onClick={handleUpdate} className={classes.submitbutton}>
                Submit
              </div>
            </Grid>
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <div onClick={handleClose} className={classes.denyButton}>
                Reset
              </div>
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
});

const mapDispatchToProps = {
  getBlogs,
  updateBlog,
  deleteBlog,
  deleteMultipleBlog
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayAstroblog);
