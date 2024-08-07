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
  Typography
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
  getProduct,
  updateProduct,
  updateProductStatus,
  deleteProduct,
} from "../../redux/Actions/productActions.js";
import {
  getProductCategory,
} from "../../redux/Actions/productCategoryActions.js";

const DisplayProduct = ({ productData, productCategoryData }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!productData) {
      dispatch(getProduct());
    }
    if (!productCategoryData) {
      dispatch(getProductCategory());
    }
  }, []);

  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState(false)
  const [productID, setproductID] = useState("");
  const [productCategory, setproductCategory] = useState("");
  const [error, setError] = useState({});
  const [status, setStatus] = useState("");
  const [image, setImage] = useState({ preview: "", data: "" });
  const [price, setPrice] =useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('')
  const [galleryImage, setGalleryImage] = useState([]);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [productCategoryTitle, setProductCategoryTitle] = useState('')

  function fillProductCategoryList() {
    return productCategoryData?.map((item) => {
      return <MenuItem value={item._id}>{item.title}</MenuItem>;
    });
  }


  const handleOpen = (rowData) => {
    setOpen(true);
    setproductID(rowData._id);
    setproductCategory(rowData.title);
    setProductCategoryTitle(rowData.productCategoryId)
    setImage({ preview: rowData.image });
    setStatus(rowData.status);
    setPrice(rowData.price);
    setDiscount(rowData.discount);
    setDescription(rowData.description);
    setShortDescription(rowData.shortDescription);
    setGalleryImage(rowData.galleryImage || []);

  };
  const handleView = (rowData) => {
    setViewProduct(true);
    setproductID(rowData._id);
    setproductCategory(rowData.title);
    setImage({ preview: rowData.image });
    setStatus(rowData.status);
    setPrice(rowData.price);
    setDiscount(rowData.discount);
    setDescription(rowData.description);
    setShortDescription(rowData.shortDescription);
    setGalleryImage(rowData.galleryImage || []);
  };

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const validation = () => {
    let isValid = true;
    if (!productCategory) {
      handleError("productCategory", "Please enter product name");
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
          updateProductStatus({
            productId: rowData._id,
            status: newStatus,
          })
        );
      }
    });
  };

  const handleGalleryUpload = (event) => {
    const files = Array.from(event.target.files);
    const updatedGalleryImages = files.map((file) => URL.createObjectURL(file));
  
    setGalleryImage((prevImages) => [...prevImages, ...updatedGalleryImages]);
    setGalleryFiles((prevFiles) => [...prevFiles, ...files]);
  };
  

  const handleSubmit = async () => {
    if (validation()) {
      const formData = new FormData();
      formData.append("productCategoryId", productCategoryTitle);
      formData.append("title", productCategory);
      formData.append("status", status);
      formData.append("image", file);
      formData.append("productId", productID);
      formData.append("description", description);
      formData.append("shortDescription", shortDescription);
      formData.append("price", price);
      formData.append("discount", discount);
      galleryFiles.forEach((imgFile) => {
        formData.append("galleryImage", imgFile);
      });

      dispatch(updateProduct(formData));
      handleClose();
    }
  };

  const handleClose = () => {
    setproductID("");
    setproductCategory("");
    setOpen(false);
    setViewProduct(false);
  };
  const handleReset = () => {
    setproductID("");
    setproductCategory("");
    setStatus("");
    setImage({ preview: "", data: "" });
    setPrice("");
    setDiscount("");
    setDescription("");
    setShortDescription("");
    setGalleryImage([]);
    setError({});
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

  const reverseData = Array.isArray(productData) ? productData.slice().reverse() : [];


  return (
    <div className={classes.container}>
      <div className={classes.box}>
        {displayTable()}
        {editModal()}
      </div>
    </div>
  );
  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Products"
            data={reverseData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) =>
                  Array.isArray(reverseData)
                    ? reverseData?.indexOf(rowData) + 1
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
              { title: "Price", field: "price" },
              { title: "Discount", field: "discount" },


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
                icon: "visibility",
                tooltip: "View Product",
                onClick: (event, rowData) => handleView(rowData),
              },
              {
                icon: "edit",
                tooltip: "Edit Product",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Product",
                onClick: (event, rowData) =>
                  dispatch(
                    deleteProduct({
                      productId: rowData?._id,
                      title: rowData?.title,
                    })
                  ),
              },
              {
                icon: () => (
                  <div className={classes.addButton}>
                    <AddCircleRounded />
                    <div className={classes.addButtontext}>
                      Create Product
                    </div>
                  </div>
                ),
                tooltip: "Add Product",
                isFreeAction: true,
                onClick: () =>
                  navigate("/fortune-store/create-product"),
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
              <div className={classes.heading}>Edit Product</div>
              <div onClick={handleClose} className={classes.closeButton}>
                <CloseRounded />
              </div>
            </div>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Product Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Skill"
                value={productCategoryTitle}
                onFocus={() => handleError("productCategoryTitle", null)}
                onChange={(e) => setProductCategoryTitle(e.target.value)}
                error={error.productCategoryTitle ? true : false}
              >
                <MenuItem disabled value={null}>
                  -Select Skill-
                </MenuItem>
                {fillProductCategoryList && fillProductCategoryList()}
              </Select>
            </FormControl>
            <div className={classes.errorstyles}>{error.productCategoryTitle}</div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Product Name"
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
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Price"
              error={error.price ? true : false}
              helperText={error.price}
              value={price}
              onFocus={() => handleError("price", null)}
              onChange={(event) => setPrice(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Discount"
              error={error.discount ? true : false}
              helperText={error.discount}
              value={discount}
              onFocus={() => handleError("discount", null)}
              onChange={(event) => setDiscount(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              label="Short Description"
              error={error.shortDescription ? true : false}
              helperText={error.shortDescription}
              value={shortDescription}
              onFocus={() => handleError("shortDescription", null)}
              onChange={(event) => setShortDescription(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              label="Description"
              error={error.description ? true : false}
              helperText={error.description}
              value={description}
              onFocus={() => handleError("description", null)}
              onChange={(event) => setDescription(event.target.value)}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
            />
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
              Upload Image
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

          <Grid
            item
            lg={8}
            sm={6}
            md={8}
            xs={6}
            className={classes.uploadContainer}
          >
            <Grid component="label" className={classes.uploadImageButton}>
              Change Gallery Image
              <input
                onChange={handleGalleryUpload}
                hidden
                accept="image/*"
                type="file"
                multiple
              />
            </Grid>
          </Grid>

          <Grid item lg={12} sm={12} md={12} xs={12}>
              <Typography variant="h6" component="label">
                Gallery Image
              </Typography>
              <Grid container direction="row" spacing={2} style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                {galleryImage.map((imgSrc, index) => (
                  <Grid item key={index} style={{ width: 'auto' }}>
                    <Avatar
                      src={imgSrc}
                      variant="square"
                      style={{ width: '100px', height: '100px' }}
                    />
                  </Grid>
                ))}
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
      );
    };
    const showViewForm = () => {
      return (
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>View Product</div>
              <div onClick={handleClose} className={classes.closeButton}>
                <CloseRounded />
              </div>
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Product Name"
              value={productCategory}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item lg={6} sm={6} md={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Select Status</InputLabel>
              <Select
                labelId="select-label"
                value={status}
                variant="outlined"
                error={!!error.status}
                InputProps={{
                  readOnly: true,
                }}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="InActive">InActive</MenuItem>
              </Select>
              <div className={classes.errorstyles}>{error.status}</div>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Price"
              value={price}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Discount"
              value={discount}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              label="Short Description"
              value={shortDescription}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item lg={12} sm={6} md={6} xs={6}>
            <TextField
              id="outlined-description-static"
              label="Description"
              multiline
              rows={4}
              fullWidth
              value={description}
              variant="outlined"
            />
          </Grid>

       
          <Grid item lg={12} sm={12} md={12} xs={12}>
              <label htmlFor="Image">Image</label>
              <Avatar
                color={Colors.primaryDark}
                src={image.preview}
                variant="square"
                style={{ width: '100%', height: '200px',objectFit:'cover', padding: 12 }}
              />
            </Grid>
            <Grid item lg={12} sm={12} md={12} xs={12}>
              <Typography variant="h6" component="label">
                Gallery Image
              </Typography>
              <Grid container direction="row" spacing={2} style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                {galleryImage.map((imgSrc, index) => (
                  <Grid item key={index} style={{ width: 'auto' }}>
                    <Avatar
                      src={imgSrc}
                      variant="square"
                      style={{ width: '100px', height: '100px' }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
        </Grid>
      );
    };

    return (
      <div>
        <Dialog open={open}>
          <DialogContent>{showEditForm()}</DialogContent>
        </Dialog>
        <Dialog open={viewProduct}>
          <DialogContent>{showViewForm()}</DialogContent>
        </Dialog>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  productData: state.product?.productData,
  productCategoryData: state.productCategory?.productCategoryData,
});

const mapDispatchToProps = {
  getProduct,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayProduct);
