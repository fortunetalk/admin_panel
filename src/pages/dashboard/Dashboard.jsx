

import React, { useState, useEffect, useRef } from "react";
import "../dashboard/dashboard.css";
import { connect } from "react-redux";
import { useStyles } from "../dashboard/dashboardStyles";
import { CircularProgress, Icon } from "@mui/material";
import Chart from "react-apexcharts";
import MaterialTable from "material-table";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from "@mui/material";
import DashboardCards from "../../Components/dashboardComponents/dashboardCards";
import { AstrologerCountIcon, CourseComponent, CustomerCountIcon, demoComponent, LiveComponent, TotalRechargeAmountIcon } from "../../Components/svgComponent";
import * as DashboardActions from "../../redux/Actions/dashboardActions";


const Dashboard = ({ dashboardData, dispatch }) => {
  const classes = useStyles();

  useEffect(() => {
    dispatch(DashboardActions.getDashboard());
  }, []);

  const [chartData, setChartData] = useState({
    options: {},
    series: [44, 55, 41, 17, 15],
    labels: ["A", "B", "C", "D", "E"],
  });

  const [data, setData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 44, 76, 95, 31, 88],
      },
    ],
  });

  const astrologers = ['Astro Sunita', 'Astro Sri', 'Astro Anita', 'Astro Santosh', 'Astro Sanjay', 'Astro Sunil', 'Astro Rajesh', 'Astro Gita', 'Astro Sanjay', 'Astro Sunil'];

  const [selectedOption, setSelectedOption] = useState('all-astrologers');

  const handleChangeAstrologersList = (event) => {
    setSelectedOption(event.target.value);
  };

  const filteredAstrologers = astrologers.filter((astrologer) => {
    if (selectedOption === 'all-astrologers') {
      return true;
    } else {
      return astrologer.includes(selectedOption); // Example filter logic
    }
  });

  const [formWidth, setFormWidth] = useState("auto");
  const formRef = useRef(null);

  const handleShowAstrologer = () => {
    setSelectedOption(prev => !prev); // This might need correction based on your logic
  };


  const cardData = [
    { title: 'Total Recharge Amount', value: `₹ ${dashboardData?.totalRechargeAmount.toFixed(2)}`, route: '/recharge', IconComponent: TotalRechargeAmountIcon },
    { title: 'Customer Count', value: dashboardData?.customerCount, route: '/customers', IconComponent: CustomerCountIcon },
    { title: 'Astrologer Count', value: dashboardData?.astrologerCount, route: '/astrologers', IconComponent: AstrologerCountIcon },
    { title: 'Total Course Count', value: dashboardData?.totalCourseCount, route: '/courses', IconComponent: CourseComponent },
    { title: 'Registered Live Courses', value: dashboardData?.totalRegisteredLiveCourse, route: '/live-courses', IconComponent: LiveComponent },
    { title: 'Registered Demo Courses', value: dashboardData?.totalRegisteredDemoCourse, route: '/demo-courses', IconComponent: demoComponent },
  ];


  // Dummy data for the MaterialTable
  const astrologerListData = [

    {
      _id: "1",
      astrologerName: "Astro Anita",
      userName: " Amrita",
      callDuration: "3 minutes",
      callType: "Video Call",
      totalCharge: "₹ 8,000",

    },
    {
      _id: "2",
      astrologerName: "Astro Sujeet",
      userName: " Kunal",
      callDuration: "15 minutes",
      callType: "Video Call",
      totalCharge: "₹ 60",

    },

  ];

  useEffect(() => {
    if (formRef.current) {
      const width = formRef.current.offsetWidth;
      setFormWidth(width);
    }
  }, []);

  return (
    <div className={classes.dashboard_container}>
      <div className={classes.dashboard_inner_container}>

        <Grid container spacing={2} style={{ margin: '20px 0px' }}>
          {cardData.map((card, index) => (
            <Grid item lg={4} sm={12} md={4} xs={12} key={index}>
              <DashboardCards
                title={card.title}
                value={card.value}
                route={card.route}
                IconComponent={card.IconComponent}
              />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12} style={{ padding: '5px 5px', borderRadius: '10px', boxShadow: '0px 8px 16px rgba(0.2, 0.2, 0.2, 0.3)', margin: '20px 10px' }}>

            <MaterialTable
              title="Top Astrologers"
              data={astrologerListData}
              columns={[
                {
                  title: "S.No",
                  editable: "never",
                  render: (rowData) => astrologerListData.indexOf(rowData) + 1,
                },
                {
                  title: "User Name",
                  field: "userName",
                },
                {
                  title: "Astrologers",
                  field: "astrologerName",
                },
                {
                  title: "Duration",
                  field: "callDuration",
                },
                {
                  title: " Call Type",
                  field: "callType",
                },
                {
                  title: "Total Charge",
                  field: "totalCharge",
                },

              ]}
              options={{ filtering: false, actionsColumnIndex: -1 }}
              style={{ fontSize: "1.4rem" }}
            />

          </Grid>
        </Grid>
      </div>
    </div>
  );
};


const mapStateToProps = (state) => ({
  dashboardData: state.dashboard.dashboardData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

