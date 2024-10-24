import React, { useEffect, useState } from "react";
import { useStyles, propStyles } from "../../assets/styles.js";
import {
  Avatar,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from "@mui/material";
import { AddCircleRounded } from "@mui/icons-material";
import MaterialTable from "material-table";
import { Colors } from "../../assets/styles.js";
import logo_icon from "../../assets/images/logo_icon.png";
import { getData, postData } from "../../utils/FetchNodeServices.js";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import { connect, useDispatch } from "react-redux";
import {
  getProductCategory,
  updateProductCategory,
  updateProductCategoryStatus,
  deleteProductCategory,
} from "../../redux/Actions/productCategoryActions.js";
import imageCompression from 'browser-image-compression';

const DisplayProductCategory = ({ productCategoryData }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!productCategoryData || productCategoryData.length === 0) {
      dispatch(getProductCategory());
    }
  }, [productCategoryData]);

  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [productCategory_id, setproductCategory_id] = useState("");
  const [productCategory, setproductCategory] = useState("");
  const [error, setError] = useState({});
  const [status, setStatus] = useState("");
  const [image, setImage] = useState({ preview: "", data: "" });
  const [file, setFile] = useState(null);

  const handleOpen = (rowData) => {
    setOpen(true);
    setproductCategory_id(rowData._id);
    setproductCategory(rowData.title);
    setImage({ preview: rowData.image });
    setStatus(rowData.status);
  };

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const validation = () => {
    let isValid = true;
    if (!productCategory) {
      handleError("productCategory", "Please enter product category");
      isValid = false;
    }
    if (!status) {
      handleError("status", "Please select status");
      isValid = false;
    }
    return isValid;
  };

  const handleClickOpen = (rowData) => {
    Swal.fire({
      title: "Are you sure to Change the Status?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const newStatus = rowData.status === "Active" ? "InActive" : "Active";
        dispatch(
          updateProductCategoryStatus({
            categoryId: rowData._id,
            status: newStatus,
          })
        );
      }
    });
  };

  const handleSubmit = async () => {
    if (validation()) {
      const formData = new FormData();
      formData.append("title", productCategory);
      formData.append("status", status);
      formData.append("image", file);
      formData.append("categoryId", productCategory_id);

      dispatch(updateProductCategory(formData));
      handleClose();
    }
  };

  const handleClose = () => {
    setproductCategory_id("");
    setproductCategory("");
    setOpen(false);
  };
  const handleReset = () => {
    setproductCategory_id("");
    setproductCategory("");
    setStatus("");
  };

  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };

  const handleIcon = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      });
      setFile(e.target.files[0])
      handleError("icon", null);
    }
  };

  return (
    <div className={classes.container}>
      {
        !productCategoryData ? <CircularProgress/> :
        <div className={classes.box}>
        {displayTable()}
        {editModal()}
      </div>
      }
    </div>
  );
  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Product Categories"
            data={productCategoryData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) =>
                  Array.isArray(productCategoryData)
                    ? productCategoryData?.indexOf(rowData) + 1
                    : "N/A",
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
                render: (rowData) => (
                  <div
                    className={classes.statusButton}
                    style={{
                      backgroundColor:
                        rowData.status === "Active" ? "#90EE90" : "#FF7F7F ",
                    }}
                    onClick={() => handleClickOpen(rowData)}
                  >
                    {rowData.status}
                  </div>
                ),
              },
            ]}
            options={{ ...propStyles.tableStyles, filtering: false }}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Product Category",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Product Category",
                onClick: (event, rowData) =>
                  dispatch(
                    deleteProductCategory({
                      categoryId: rowData?._id,
                      title: rowData?.title,
                    })
                  ),
              },
              {
                icon: () => (
                  <div className={classes.addButton}>
                    <AddCircleRounded />
                    <div className={classes.addButtontext}>
                      Create Product Category
                    </div>
                  </div>
                ),
                tooltip: "Add Product Category",
                isFreeAction: true,
                onClick: () =>
                  navigate("/fortune-store/create-product-category"),
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
              <div className={classes.heading}>Edit Product Category</div>
              <div onClick={handleClose} className={classes.closeButton}>
                <CloseRounded />
              </div>
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Enter Product Category"
              error={error.productCategory ? true : false}
              helperText={error.productCategory}
              value={productCategory}
              onFocus={() => handleError("productCategory", null)}
              onChange={(event) => setproductCategory(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} sm={6} md={12} xs={12}>
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

          <Grid
            item
            lg={8}
            sm={6}
            md={8}
            xs={6}
            className={classes.uploadContainer}
          >
            <Grid component="label" className={classes.uploadImageButton}>
              Upload Picture
              <input
                onChange={handleIcon}
                hidden
                accept="image/*"
                type="file"
              />
            </Grid>
          </Grid>
          <Grid item lg={4} sm={6} md={4} xs={6}>
            <Avatar
              color={Colors.primaryDark}
              src={image.preview || logo_icon}
              style={{ width: 56, height: 56 }}
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
  productCategoryData: state.productCategory?.productCategoryData,
});

const mapDispatchToProps = {
  getProductCategory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayProductCategory);
