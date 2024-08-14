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
  getPooja,
  updatePooja,
  updatePoojaStatus,
  deletePooja,
} from "../../redux/Actions/poojaActions.js";
import {
  getPoojaCategory,
} from "../../redux/Actions/poojaCategoryActions.js";

const DisplayPooja = ({ poojaData, poojaCategoryData }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!poojaData) {
      dispatch(getPooja());
    }
    if (!poojaCategoryData) {
      dispatch(getPoojaCategory());
    }
  }, []);

  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [viewpooja, setViewpooja] = useState(false)
  const [poojaID, setpoojaID] = useState("");
  const [poojaCategory, setpoojaCategory] = useState("");
  const [error, setError] = useState({});
  const [status, setStatus] = useState("");
  const [image, setImage] = useState({ preview: "", data: "" });
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('')
  const [file, setFile] = useState(null);
  const [poojaCategoryTitle, setpoojaCategoryTitle] = useState('')

  function fillpoojaCategoryList() {
    return poojaCategoryData?.map((item) => {
      return <MenuItem value={item._id}>{item.title}</MenuItem>;
    });
  }


  const handleOpen = (rowData) => {
    setOpen(true);
    setpoojaID(rowData._id);
    setpoojaCategory(rowData.title);
    setpoojaCategoryTitle(rowData.poojaCategoryId)
    setImage({ preview: rowData.image });
    setStatus(rowData.status);
    setDescription(rowData.description);
    setShortDescription(rowData.shortDescription);

  };
  const handleView = (rowData) => {
    setViewpooja(true);
    setpoojaID(rowData._id);
    setpoojaCategory(rowData.title);
    setImage({ preview: rowData.image });
    setStatus(rowData.status);
    setDescription(rowData.description);
    setShortDescription(rowData.shortDescription);
  };

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const validation = () => {
    let isValid = true;
    if (!poojaCategory) {
      handleError("poojaCategory", "Please enter pooja name");
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
          updatePoojaStatus({
            poojaId: rowData._id,
            status: newStatus,
          })
        );
      }
    });
  };


  const handleSubmit = async () => {
    if (validation()) {
      const formData = new FormData();
      formData.append("poojaCategoryId", poojaCategoryTitle);
      formData.append("title", poojaCategory);
      formData.append("status", status);
      formData.append("image", file);
      formData.append("poojaId", poojaID);
      formData.append("description", description);
      formData.append("shortDescription", shortDescription);
      
      dispatch(updatePooja(formData));
      handleClose();
    }
  };

  const handleClose = () => {
    setpoojaID("");
    setpoojaCategory("");
    setOpen(false);
    setViewpooja(false);
  };
  const handleReset = () => {
    setpoojaID("");
    setpoojaCategory("");
    setStatus("");
    setImage({ preview: "", data: "" });
    setDescription("");
    setShortDescription("");
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

  const reverseData = Array.isArray(poojaData) ? poojaData.slice().reverse() : [];


  return (
    <div className={classes.container}>
      {
        !poojaData ? <CircularProgress/> :
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
            title="Pooja's"
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
                tooltip: "View Pooja",
                onClick: (event, rowData) => handleView(rowData),
              },
              {
                icon: "edit",
                tooltip: "Edit Pooja",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Pooja",
                onClick: (event, rowData) =>
                  dispatch(
                    deletePooja({
                      poojaId: rowData?._id,
                      title: rowData?.title,
                    })
                  ),
              },
              {
                icon: () => (
                  <div className={classes.addButton}>
                    <AddCircleRounded />
                    <div className={classes.addButtontext}>
                      Create Pooja
                    </div>
                  </div>
                ),
                tooltip: "Add Pooja",
                isFreeAction: true,
                onClick: () =>
                  navigate("/fortune-store/create-pooja"),
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
              <div className={classes.heading}>Edit Pooja</div>
              <div onClick={handleClose} className={classes.closeButton}>
                <CloseRounded />
              </div>
            </div>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Pooja Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Skill"
                value={poojaCategoryTitle}
                onFocus={() => handleError("poojaCategoryTitle", null)}
                onChange={(e) => setpoojaCategoryTitle(e.target.value)}
                error={error.poojaCategoryTitle ? true : false}
              >
                <MenuItem disabled value={null}>
                  -Select Skill-
                </MenuItem>
                {fillpoojaCategoryList && fillpoojaCategoryList()}
              </Select>
            </FormControl>
            <div className={classes.errorstyles}>{error.poojaCategoryTitle}</div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="pooja Name"
              error={error.poojaCategory ? true : false}
              helperText={error.poojaCategory}
              value={poojaCategory}
              onFocus={() => handleError("poojaCategory", null)}
              onChange={(event) => setpoojaCategory(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} sm={6} md={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Status</InputLabel>
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
            <div className={classes.errorstyles}>{error.image}</div>
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
    const showViewForm = () => {
      return (
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>View pooja</div>
              <div onClick={handleClose} className={classes.closeButton}>
                <CloseRounded />
              </div>
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="pooja Name"
              value={poojaCategory}
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
           
        </Grid>
      );
    };

    return (
      <div>
        <Dialog open={open}>
          <DialogContent>{showEditForm()}</DialogContent>
        </Dialog>
        <Dialog open={viewpooja}>
          <DialogContent>{showViewForm()}</DialogContent>
        </Dialog>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  poojaData: state.pooja?.poojaData,
  poojaCategoryData: state.poojaCategory?.poojaCategoryData,
});

const mapDispatchToProps = {
  getPooja,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayPooja);
