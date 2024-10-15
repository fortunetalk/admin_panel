import React from "react";
import { DragHandle } from "./DragHandle";
import styled from "styled-components";

const StyledStaticData = styled.td`
  background: white;
  &:first-of-type {
    min-width: 20ch;
  }
`;

const StyledStaticTableRow = styled.tr`
  box-shadow: rgb(0 0 0 / 10%) 0px 20px 25px -5px,
    rgb(0 0 0 / 30%) 0px 10px 10px -5px;
  outline: #3e1eb3 solid 1px;
  color: black;
  position: relative; /* Ensure positioning context */
  z-index: ${({ isDragging }) => (isDragging ? 10 : 'auto')}; /* Ensure row is on top while dragging */
  transition: background-color 0.2s ease; /* Smooth transition */
  background-color: ${({ isDragging }) => (isDragging ? 'rgba(127, 207, 250, 0.3)' : 'white')}; /* Change background while dragging */
`;

export const StaticTableRow = ({ row }) => {
  const { isDragging } = row; // Assuming row contains isDragging state

  return (
    <StyledStaticTableRow {...row.getRowProps()} isDragging={isDragging}>
      {row.cells.map((cell, i) => (
        <StyledStaticData {...cell.getCellProps()} key={cell.column.id}>
          {i === 0 && <DragHandle isDragging={isDragging} />}
          {cell.render("Cell")}
        </StyledStaticData>
      ))}
    </StyledStaticTableRow>
  );
};
