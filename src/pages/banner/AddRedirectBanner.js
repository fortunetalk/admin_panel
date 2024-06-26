import React, { useState, useEffect } from "react";
import { useStyles } from "../../assets/styles.js";
import {
  Avatar,
  Grid,
  IconButton,
  TextField,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { Colors } from "../../assets/styles.js";
import { useNavigate } from "react-router-dom";
import logo_icon from "../../assets/images/logo_icon.png";
import { connect, useDispatch } from "react-redux";
import { getAllAstrologer } from "../../redux/Actions/astrologerActions.js";
import { getProductCategory } from "../../redux/Actions/productCategoryActions.js";
import { getPoojaCategory } from "../../redux/Actions/poojaCategoryActions.js";
import { addRedirectionBanner } from "../../redux/Actions/redirectBannerActions.js";

const AddRedirectBanner = ({
  astrologerListData,
  productCategoryData,
  poojaCategoryData,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [icon, setIcon] = useState({ file: logo_icon, bytes: "" });
  const [file, setFile] = useState(null);
  const [error, setError] = useState({});
  const [status, setStatus] = useState("");
  const [redirect, setRedirect] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [poojaCategory, setPoojaCategory] = useState("");
  const [astrologer, setAstrologer] = useState("");
  const [youtubeUrl, setyoutubeUrl] = useState("");

  function fillAstrologerList() {
    return astrologerListData?.map((item) => {
      return <MenuItem value={item._id}>{item.name}</MenuItem>;
    });
  }
  function fillProductCategoryList() {
    return productCategoryData?.map((item) => {
      return <MenuItem value={item._id}>{item.title}</MenuItem>;
    });
  }
  function fillPoojaCategoryList() {
    return poojaCategoryData?.map((item) => {
      return <MenuItem value={item._id}>{item.title}</MenuItem>;
    });
  }

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };
  const handleRedirectChange = (e) => {
    if (e.target.value == "pooja") {
      dispatch(getPoojaCategory());
    }
    if (e.target.value == "product") {
      dispatch(getProductCategory());
    }
    if (e.target.value == "astrologer") {
      dispatch(getAllAstrologer());
    }
    setRedirect(e.target.value);
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

  const validation = () => {
    var isValid = true;

    if (!redirect) {
      handleError("redirect", "Please Select Redirection");
      isValid = false;
    }
    if (!icon.bytes) {
      handleError("icon", "Please Select icon");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("status", status);
      formData.append("redirectionUrl", redirect);

      switch (redirect) {
        case "astrologer":
          formData.append("astrologerId", astrologer);
          break;
        case "pooja":
          formData.append("poojaId", poojaCategory);
          break;
        case "product":
          formData.append("productId", productCategory);
          break;
        case "youtube":
          formData.append("youtubeUrl", youtubeUrl);
          break;
        default:
          break;
      }

      dispatch(addRedirectionBanner(formData));
    }
  };

  const handleReset = () => {
    setIcon({ file: logo_icon, bytes: "" });
    setStatus("");
    setRedirect("");
    setFile(null);

  };
  // "call", "chat", "astrologer", "product", "pooja", "youtube"
  const redirectionOptions = [
    { value: "call", label: "Call" },
    { value: "chat", label: "Chat" },
    { value: "pooja", label: "Pooja Category" },
    { value: "product", label: "Product Category" },
    { value: "astrologer", label: "Astrologer " },
    { value: "youtube", label: "YouTube" },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Redirect Banner</div>
              <div
                onClick={() => navigate("/displayRedirectBanner")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>
                  Display Redirect Banner
                </div>
              </div>
            </div>
          </Grid>

          <Grid item lg={12} sm={12} md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Select Redirection</InputLabel>
              <Select
                labelId="select-label"
                value={redirect}
                onChange={handleRedirectChange}
                variant="outlined"
                error={!!error.redirect}
              >
                {redirectionOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <div className={classes.errorstyles}>{error.redirect}</div>
            </FormControl>

            {redirect === "product" && (
              <FormControl
                variant="outlined"
                fullWidth
                style={{ marginTop: "16px" }}
              >
                <InputLabel id="product-category-label">
                  Product Category
                </InputLabel>
                <Select
                  labelId="product-category-label"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  label="Product Category"
                >
                  {productCategoryData && fillProductCategoryList()}
                </Select>
              </FormControl>
            )}

            {redirect === "pooja" && (
              <FormControl
                variant="outlined"
                fullWidth
                style={{ marginTop: "16px" }}
              >
                <InputLabel id="pooja-category-label">
                  Pooja Category
                </InputLabel>
                <Select
                  labelId="pooja-category-label"
                  value={poojaCategory}
                  onChange={(e) => setPoojaCategory(e.target.value)}
                  label="Pooja Category"
                >
                  {poojaCategoryData && fillPoojaCategoryList()}
                </Select>
              </FormControl>
            )}

            {redirect === "astrologer" && (
              <FormControl
                variant="outlined"
                fullWidth
                style={{ marginTop: "16px" }}
              >
                <InputLabel id="astrologer-label">Astrologer</InputLabel>
                <Select
                  labelId="astrologer-label"
                  value={astrologer}
                  onChange={(e) => setAstrologer(e.target.value)}
                  label="Astrologer"
                >
                  {astrologerListData && fillAstrologerList()}
                </Select>
              </FormControl>
            )}

            {redirect === "youtube" && (
              <TextField
                variant="outlined"
                label="YouTube Link"
                value={youtubeUrl}
                onChange={(e) => setyoutubeUrl(e.target.value)}
                fullWidth
                style={{ marginTop: "16px" }}
              />
            )}
          </Grid>

          <Grid
            item
            lg={4}
            sm={4}
            md={4}
            xs={4}
            className={classes.uploadContainer}
          >
            <Grid
              component="label"
              onClick={handleIcon}
              className={classes.uploadImageButton}
            >
              Upload Picutre
              <input
                onChange={handleIcon}
                hidden
                accept="image/*"
                type="file"
              />
            </Grid>
            <div className={classes.errorstyles}>{error.icon}</div>
          </Grid>
          <Grid item lg={2} sm={2} md={2} xs={2}>
            <Avatar
              color={Colors.primaryDark}
              src={icon.file}
              style={{ width: 56, height: 56 }}
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
  astrologerListData: state.astrologer.astrologerListData,
  productCategoryData: state.productCategory.productCategoryData,
  poojaCategoryData: state.poojaCategory.poojaCategoryData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AddRedirectBanner);
