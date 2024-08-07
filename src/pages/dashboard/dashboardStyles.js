import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  dashboard_container: {
    height: "100%",
    width: "100%",
    paddingLeft: "2rem",
    paddingRight: "2rem",
  },
  dashboard_inner_container: {
    height: "100%",
    width: "100%",
    padding: "1rem 2rem 1rem 2rem",
  },
  dashboard_card: {
    color: "black",
    padding: "2rem",
    boxShadow: "0px 0px 5px lightgrey",
    borderRadius: "10px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    height: "200px",
    width: "100%",
  },
  graph_card: {
    color: "black",
    padding: "4rem",
    boxShadow: "0px 0px 5px lightgrey",
    borderRadius: "10px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    height: "300px",
    width: "100%",
  },
}, {index: 1});
