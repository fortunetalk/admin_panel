import { makeStyles } from "@mui/styles";
import login_background from "./images/login_background.jpg";

export const Colors = {
  primaryDark: "#60278C",
  primaryLight: "#60278C",
  white: "#fff",
  whiteDark: "#F5F5F5",
  grayLight: "#ECEAEA",
  gray: "#A3A3A3",
  grayDark: "#666666",
  black: "#090A0A",
  white: "#FFFFFF",
  greenLight: "#46BC67",
  greenDark: "#34A853",
  greenDark2: "#0A882D",
  green_parrot: "#5DC709",
  red: "#FF0000",
  red_a: "#eb2f06",
  blueFacebook: "#1877F2",
  skyblue: "#46A6FF",
  bodyColor: "#EDF2F5",
  splash_background: "#FFEDCA",
  light_Pink: "#f7e7d7",
  dark_Pink: "#60278C",
  darkBlue: "#1B1B45",
};


export const useStyles = makeStyles({
  loginBox: {
    padding: "2rem 2rem 2rem 2rem",
    maxWidth: "30rem",
    borderRadius: 20,
    backgroundColor: "white",
  },
  loginheadingContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  login: {
    fontSize: "1.2rem",
    marginTop: 10,
  },

  loginheading: {
    fontSize: "2rem",
    fontFamily: "Philosopher",
  },

  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "auto",
    padding: 20,
    color: "#000",
  },
  box: {
    width: "100%",
    height: "auto",
    padding: 10,
    background: "#fff",
    boxShadow: "0px 0px 5px lightgrey",
    borderRadius: 15,
  },
  headingContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },
  heading: {
    fontSize: "2rem",
    fontFamily: "Philosopher",
  },
  addButton: {
    padding: "5px 10px",
    backgroundColor: Colors.primaryDark,
    borderRadius: 10,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    fontFamily: "Philosopher",
    fontSize: "1.2rem",
    cursor: "pointer",
  },
  addButtontext: {
    marginLeft: 5,
  },
  submitbutton: {
    background: Colors.primaryLight,
    width: "100%",
    padding: "0.5rem",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 10,
    color: Colors.white,
    fontFamily: "Philosopher",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  denyButton: {
    background: Colors.bodyColor,
    width: "100%",
    padding: "0.5rem",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 10,
    color: Colors.black,
    fontFamily: "Philosopher",
    fontSize: "1.5rem",
    cursor: "pointer",
  },

  closeButton: {
    color: Colors.primaryDark,
    cursor: "pointer",
    padding: 5,
    "&:hover": {
      backgroundColor: Colors.grayLight,
      borderRadius: 10,
    },
  },

  uploadContainer: {
    display: "flex",
    alignItems: "center",
  },
  uploadImageButton: {
    background: Colors.dark_Pink,
    width: "100%",
    padding: "0.5rem",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 10,
    color: Colors.white,
    fontFamily: "Philosopher",
    fontSize: "1.2rem",
    cursor: "pointer",
  },
  errorstyles: {
    color: "#d32f2f",
    fontSize: "0.8rem",
    fontFamily: "arial",
    lineHeight: 1.66,
    letterSpacing: "0.03333rem",
    textAlign: "left",
    marginTop: "3px",
    marginRight: "14px",
    marginBottom: 0,
    marginLeft: "14px",
  },
  chips:{
    margin: 10,
  },
  checkbox: {
    color: '#333',
    fontSize: "1.2rem",
    fontFamily: "Philosopher",
  },
  statusButton: {
    display: "inline-block",
    padding: "0.5rem 1rem",
    fontSize: "12px",
    color: "black",
    border: "none",
    borderRadius: "1rem", 
    cursor: "pointer",
    textAlign: "center",
    fontWeight:'600'

  },
  statusDropdown: {
    fontSize: "14px",
    padding: '0.5rem',
    borderRadius: '1rem',
    border: "none",
    cursor: 'pointer',
    color: "black",
    textAlign: "center",
    fontWeight:'600'
  },
  imagePreview: {
    width: '100px',
    height: '100px',
    padding:'4px',
    // borderRadius: theme.shape.borderRadius,
    objectFit: 'cover',
  },

});




export const propStyles = {
  tableStyles: {
    sorting: true,
    search: true,
    searchFieldAlignment: "right",
    filtering: false,
    paging: true,
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
    headerStyle: { fontSize: "1.2rem", fontWeight: 600 },
    tableLayout: "auto",
    // headerStyle: { width: 'auto' }
  },
};



   // options={{
                    //     sorting: true,
                    //     search: true,
                    //     searchFieldAlignment: "right",
                    //     filtering: true,
                    //     paging: true,
                    //     pageSize: 5,
                    //     paginationType: "stepped",
                    //     showFirstLastPageButtons: true,
                    //     paginationPosition: "bottom",
                    //     exportButton: false,
                    //     exportAllData: false,
                    //     exportFileName: "Category data",
                    //     addRowPosition: "first",
                    //     actionsColumnIndex: -1,
                    //     selection: false,
                    //     showSelectAllCheckbox: false,
                    // }}
