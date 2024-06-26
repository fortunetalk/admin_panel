import React, { useEffect, useState } from "react";
import { propStyles, useStyles } from "../../assets/styles.js";
import {
  Avatar,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { AddCircleRounded } from "@mui/icons-material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { connect } from "react-redux";
import * as LanguageActions from '../../redux/Actions/languageActions.js'

const DisplayLanguage = ({dispatch, languageData}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [languageId, setLanguageId] = useState();
  const [language, setLanguage] = useState();

  const [error, setError] = useState({});

  useEffect(function () {
    if(!languageData){
      dispatch(LanguageActions.getAllLanguage())
    }

  }, []);


  const handleOpen = (rowData) => {
    setOpen(true);
    setLanguageId(rowData._id);
    setLanguage(rowData.languageName);
  };

  const handleClose = () => {
    setLanguageId("");
    setLanguage("");
    setOpen(false);
  };

  const validation = () => {
    var isValid = true;
    if (!language) {
      handleError("language", "Please input language");
      isValid = false;
    }
    return isValid;
  };

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const handleSubmit = async () => {
    if (validation()) {
      const data = {
        langId: languageId,
        languageName: language,
      }
      dispatch(LanguageActions.updateLanguage(data))
      handleClose()
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        {languageData && displayTable()}
        {editModal()}
      </div>
    </div>
  );
  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Language"
            data={languageData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) => languageData.indexOf(rowData) + 1,
              },
              { title: "Language", field: "languageName" },
            ]}
            options={{...propStyles.tableStyles, filtering: false}}
            style={{ fontSize: "1.4rem" }}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Language",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Language",
                onClick: (event, rowData) => dispatch(LanguageActions.deleteLanguage({language: rowData?.languageName, langId: rowData?._id })),
              },
              {
                icon: () => (
                  <div className={classes.addButton}>
                    <AddCircleRounded />
                    <div className={classes.addButtontext}>Add New</div>
                  </div>
                ),
                tooltip: "Add Language",
                isFreeAction: true,
                onClick: () => navigate("/addLanguage"),
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
              <div className={classes.heading}>Edit language</div>
            </div>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              label="Enter Exprtise"
              error={error.language ? true : false}
              helperText={error.language}
              value={language}
              onFocus={() => handleError("language", null)}
              onChange={(event) => setLanguage(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleSubmit} className={classes.submitbutton}>
              Submit
            </div>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleClose} className={classes.denyButton}>
              Cancel
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

const mapStateToProps = state =>({
  languageData: state.language.languageData
})

const mapDispatchToProps = dispatch =>({dispatch})

export default connect(mapStateToProps, mapDispatchToProps)(DisplayLanguage);
