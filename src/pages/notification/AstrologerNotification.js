import React, { useEffect, useState } from "react";
import { useStyles } from "../../assets/styles.js";
import { Avatar, Grid } from "@mui/material";
import { AddCircleRounded } from "@mui/icons-material";
import MaterialTable from "material-table";
import { base_url, get_all_notifications } from "../../utils/Constants.js";
import { getData } from "../../utils/FetchNodeServices.js";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/loading/Loader.js";
import { connect } from "react-redux";
import * as NotificationActions from '../../redux/Actions/notificationActions.js'

const AstrologerNotification = ({ astrologerListData, astrologerNotificationData, dispatch }) => {
  console.log(astrologerNotificationData)
  const classes = useStyles();
  const navigate = useNavigate();
  const [notificationsData, setNotificationsData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    dispatch(NotificationActions.getAstrologerNotification())
  }, []);


  return (
    <div className={classes.container}>
      <div className={classes.box}>
        {astrologerNotificationData && displayTable()}
        <Loader isVisible={isLoading} />
      </div>
    </div>
  );

  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Astrologer Notifications"
            data={astrologerNotificationData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) => astrologerNotificationData.indexOf(rowData) + 1,
              },
              { title: "Title", field: "title" },
              { title: "Ddescription", field: "description" },
              {
                title: "Icon",
                field: "image",
                render: (rowData) => (
                  <Avatar
                    src={base_url + rowData.image}
                    style={{ width: 50, height: 50 }}
                    variant="square"
                  />
                ),
              },
            ]}
            options={{
              sorting: true,
              search: true,
              searchFieldAlignment: "right",
              filtering: true,
              paging: true,
              // pageSizeOptions: createArrayWithBreakdowns(editable?.length, 5),
              pageSize: 5,
              paginationType: "stepped",
              showFirstLastPageButtons: true,
              paginationPosition: "bottom",
              exportButton: false,
              exportAllData: false,
              exportFileName: "Category data",
              addRowPosition: "first",
              actionsColumnIndex: -1,
              selection: false,
              showSelectAllCheckbox: false,
            }}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Sub Skill",
                // onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: () => (
                  <div className={classes.addButton}>
                    <AddCircleRounded />
                    <div className={classes.addButtontext}>Add New</div>
                  </div>
                ),
                tooltip: "Add Skill",
                isFreeAction: true,
                onClick: () =>
                  navigate("/notifications", {
                    state: { type: "astrologer" },
                  }),
              },
            ]}
          />
        </Grid>
      </Grid>
    );
  }
};

const mapStateToProps = (state) => ({
  astrologerListData: state.astrologer.astrologerListData,
  astrologerNotificationData: state.notification.astrologerNotificationData
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AstrologerNotification);
