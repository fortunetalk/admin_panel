import styled from "styled-components";

const TableWrapper = styled.div`
  /* Wrapper for the table */
  overflow: hidden; /* Ensure that rounded corners are not clipped */
  border-radius: 10px; /* Rounded corners for the table */
  border: 1px solid #e0e0e0; /* Light gray border around the table */

  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: separate; /* Allows border-radius to work */
    border-spacing: 0; /* Remove spacing between cells */

    thead th {
      color: black;
      // border-bottom: 1px solid #e0e0e0; 
    }

    th, td {
      text-align: left;
      padding: 6px 20px; /* Padding of 1 pixel */
      word-break: break-word;
      color: black;
    }

    tbody tr:last-child td:first-child {
      border-bottom-left-radius: 10px; /* Bottom-left rounded corner */
    }

    tbody tr:last-child td:last-child {
      border-bottom-right-radius: 10px; /* Bottom-right rounded corner */
    }
  }
`;

export default TableWrapper;
