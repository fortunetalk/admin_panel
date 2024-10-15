// DisplayBlogCategory.js
import React, { useEffect, useState } from "react";
import { useStyles, propStyles } from '../../assets/styles.js'
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, CircularProgress } from "@mui/material";
import { AddCircleRounded } from '@mui/icons-material';
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import { connect, useDispatch } from "react-redux";
import { getBlogCategory, updateBlogCategory, deleteBlogCategory } from "../../redux/Actions/blogCategoryActions.js";

const DisplayBlogCategory = ({ appBlogCategoryData }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    _id: '',
    title: '',
    status: ''
  });

  useEffect(() => {
      dispatch(getBlogCategory());
  }, []);

  const handleOpen = (rowData) => {
    setOpen(true);
    setSelectedCategory({
      _id: rowData._id,
      title: rowData.title,
      status: rowData.status
    });
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory({
      _id: '',
      title: '',
      status: ''
    });
  };

  const handleUpdate = () => {
    if (selectedCategory.title && selectedCategory.status) {
      dispatch(updateBlogCategory({
        id: selectedCategory._id, 
        title: selectedCategory.title,
        status: selectedCategory.status
      }));
      handleClose();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields are required!',
      });
    }
  };

  const handleDelete = (blogCategoryId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBlogCategory(blogCategoryId)); // Dispatch action with id
      }
    });
  };
  

  return (
    <div className={classes.container}>
      {!appBlogCategoryData ? (
        <CircularProgress />
      ) : (
        <div className={classes.box}>
          {appBlogCategoryData && displayTable()}
          {editModal()}
        </div>
      )}
    </div>
  );

  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Blog Categories"
            data={appBlogCategoryData}
            columns={[
              {
                title: 'S.No',
                render: rowData => Array.isArray(appBlogCategoryData) ? appBlogCategoryData.indexOf(rowData) + 1 : 'N/A'
              },
              { title: 'Title', field: 'title' },
              { title: 'Status', field: 'status' },
            ]}
            options={{ ...propStyles.tableStyles, filtering: false }}
            actions={[
                {
                  icon: 'edit',
                  tooltip: 'Edit Category',
                  onClick: (event, rowData) => handleOpen(rowData)
                },
                {
                  icon: 'delete',
                  tooltip: 'Delete Category',
                  onClick: (event, rowData) => handleDelete(rowData._id)
                },
                {
                  icon: () => (
                    <div className={classes.addButton}>
                      <AddCircleRounded />
                      <div className={classes.addButtontext}>Add New</div>
                    </div>
                  ),
                  tooltip: 'Add Blog Category',
                  isFreeAction: true,
                  onClick: () => navigate("/addBlogCategory")
                }
              ]}
          />
        </Grid>
      </Grid>
    );
  }

  function editModal() {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item lg={12} sm={12} md={12} xs={12}>
              <div className={classes.headingContainer}>
                <div className={classes.heading}>
                  Edit Blog Category
                </div>
                <div onClick={handleClose} className={classes.closeButton}>
                  <CloseRounded />
                </div>
              </div>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                label="Title"
                value={selectedCategory.title}
                onChange={(e) => setSelectedCategory({ ...selectedCategory, title: e.target.value })}
                variant='outlined'
                fullWidth
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  value={selectedCategory.status}
                  onChange={(e) => setSelectedCategory({ ...selectedCategory, status: e.target.value })}
                  variant='outlined'
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="InActive">InActive</MenuItem>
                </Select>
              </FormControl>
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
  }
};

const mapStateToProps = (state) => ({
  appBlogCategoryData: state.blogCategory?.appBlogCategoryData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DisplayBlogCategory);
