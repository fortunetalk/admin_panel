import React, { useState, useEffect } from "react";
import { useStyles, Colors } from "../../assets/styles.js";
import {
  Avatar,
  Grid,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Typography
} from "@mui/material";
import CloseRounded from "@mui/icons-material/CloseRounded";
import { useNavigate } from "react-router-dom";
import logo_icon from "../../assets/images/logo_icon.png";
import DvrIcon from "@mui/icons-material/Dvr";
import { connect } from "react-redux";
import * as ProductActions from "../../redux/Actions/productActions.js";
import {getProductCategory} from "../../redux/Actions/productCategoryActions.js";

const CreateProduct = ({ dispatch, productCategoryData }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  
  const [productCategory, setProductCategory] = useState("");
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [galleryImage, setGalleryImage] = useState([]);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [icon, setIcon] = useState({ file:'', bytes: null });
  const [productCategoryTitle, setProductCategoryTitle] = useState('')
  const [error, setError] = useState({});

  useEffect(() => {
    if (!productCategoryData) {
      dispatch(getProductCategory());
    }
  }, []);

  function fillProductCategoryList() {
    return productCategoryData?.map((item) => {
      return <MenuItem value={item._id}>{item.title}</MenuItem>;
    });
  }
  
  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };

  const handleIcon = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setIcon({
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0],
      });
      handleError("icon", null);
      setFile(e.target.files[0]);
    }
  };

  const handleGalleryUpload = (event) => {
    const files = Array.from(event.target.files);
    const updatedGalleryImages = files.map((file) => URL.createObjectURL(file));
  
    setGalleryImage((prevImages) => [...prevImages, ...updatedGalleryImages]);
    setGalleryFiles((prevFiles) => [...prevFiles, ...files]);
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
    if (!file) {
      handleError("icon", "Please upload an image");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      let formData = new FormData();
      formData.append("productCategoryId", productCategoryTitle);
      formData.append("title", productCategory);
      formData.append("image", file);
      formData.append("status", status);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("description", description);
      formData.append("shortDescription", shortDescription);
      galleryFiles.forEach((imgFile) => {
        formData.append("galleryImage", imgFile);
      });

      dispatch(ProductActions.addProduct(formData));
    }
  };

  const handleReset = () => {
    setProductCategory("");
    setStatus("");
    setPrice("");
    setDiscount("");
    setDescription("");
    setShortDescription("");
    setIcon({ file: logo_icon, bytes: null });
    setFile(null);
    setGalleryImage([]);
    setGalleryFiles([]);
    setError({});
  };


  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
          <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Product</div>
              <div
                onClick={() => navigate("/fortune-store/product")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display Products</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Product Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Product Category"
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
              onChange={(event) => setProductCategory(event.target.value)}
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
            lg={6}
            sm={6}
            md={6}
            xs={6}
            className={classes.uploadContainer}
          >
            <Grid component="label" className={classes.uploadImageButton}>
              Upload Gallery Image
              <input
                onChange={handleGalleryUpload}
                hidden
                accept="image/*"
                type="file"
                multiple
              />
            </Grid>
            <div className={classes.errorstyles}>{error.galleryImage}</div>
          </Grid>

          <Grid
            item
            lg={4}
            sm={6}
            md={4}
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
            <div className={classes.errorstyles}>{error.icon}</div>
          </Grid>
          <Grid item lg={2} sm={6} md={2} xs={6}>
            <Avatar
              color={Colors.primaryDark}
              src={icon.file}
              style={{ width: 56, height: 56 }}
            />
          </Grid>

        

          <Grid item lg={12} sm={12} md={12} xs={12}>
           {/* <Typography variant="h6" component="label">Gallery Image</Typography>  */}
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
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
    productCategoryData: state.productCategory?.productCategoryData,
  });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
