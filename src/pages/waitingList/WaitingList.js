import React from 'react';
import { Table } from './components/Table';
import { Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStyles } from "../../assets/styles.js";
import styled from 'styled-components';
import { CloseRounded } from "@mui/icons-material";

const StyledActionCell = styled.div`
  display: flex;
  color: black;
  justify-content: flex-end; /* Align actions to the right */
  gap: 0.5rem; /* Space between icons */
`;

const staticData = [
  {
    id: 'row-1',
    firstName: "John",
    lastName: "Doe",
    age: 28,
    visits: 15,
    status: "Single",
    progress: 75,
    actions: (
      <StyledActionCell>
        <IconButton onClick={() => handleEdit('row-1')}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete('row-1')}>
          <DeleteIcon />
        </IconButton>
      </StyledActionCell>
    ),
    subRows: []
  },
  {
    id: 'row-2',
    firstName: "Jane",
    lastName: "Smith",
    age: 34,
    visits: 22,
    status: "Married",
    progress: 60,
    actions: (
      <StyledActionCell>
        <IconButton onClick={() => handleEdit('row-2')}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete('row-2')}>
          <DeleteIcon />
        </IconButton>
      </StyledActionCell>
    ),
    subRows: []
  },
  {
    id: 'row-3',
    firstName: "Sam",
    lastName: "Brown",
    age: 42,
    visits: 30,
    status: "Single",
    progress: 85,
    actions: (
      <StyledActionCell>
        <IconButton onClick={() => handleEdit('row-3')}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete('row-3')}>
          <DeleteIcon />
        </IconButton>
      </StyledActionCell>
    ),
    subRows: []
  },
];

const handleEdit = (id) => {
  // Handle edit functionality here
  console.log(`Edit row with id: ${id}`);
};

const handleDelete = (id) => {
  // Handle delete functionality here
  console.log(`Delete row with id: ${id}`);
};

const WaitingList = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "  ",
        columns: [
          {
            Header: "S.NO",
            accessor: "age"
          },
          {
            Header: "Astrologer Name",
            accessor: "firstName"
          },
          {
            Header: "Image",
            accessor: "status"
          },
          {
            Header: "Profile Picture",
            accessor: "progress"
          },
          {
            Header: "Actions",
            accessor: "actions",
            Cell: ({ cell: { value } }) => <>{value}</>, // Use the cell value directly
          },
        ]
      }
    ],
    []
  );

  const [data, setData] = React.useState(staticData);
  const classes = useStyles();

  return (
    <Grid container spacing={0}>
      <Grid item lg={12} sm={12} md={12} xs={12}>
        <div className={classes.headingContainer}>
          <div className={classes.heading} style={{ color: 'black', marginBottom: '10px' }}>
            Waiting List Data
          </div>
          {/* <div onClick={handleClose} className={classes.closeButton}>
            <CloseRounded />
          </div> */}
        </div>
      </Grid>

      <Grid item lg={12} sm={12} md={12} xs={12}>
        <Table columns={columns} data={data} setData={setData} />
      </Grid>
    </Grid>
  );
};

export default WaitingList;
