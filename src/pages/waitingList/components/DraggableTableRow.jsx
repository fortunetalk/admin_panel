import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragHandle } from './DragHandle';
import styled from 'styled-components';

const DraggingRow = styled.td`
  background: rgba(127, 207, 250, 0.3);
  color: black; /* Ensure text color is black */
`;

const TableData = styled.td`
  background: white;
  color: black; /* Ensure text color is black */
  padding: 8px;
  border-bottom: 1px solid #ddd;
  text-align: left; /* Align text to the left */
`;

export const DraggableTableRow = ({ row }) => {
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    isDragging,
  } = useSortable({
    id: row.original.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
  };

  return (
    <tr ref={setNodeRef} style={style} {...row.getRowProps()}>
      {isDragging ? (
        <DraggingRow colSpan={row.cells.length}>&nbsp;</DraggingRow>
      ) : (
        row.cells.map((cell, i) => (
          <TableData {...cell.getCellProps()} key={cell.column.id}>
            {i === 0 && (
              <DragHandle {...attributes} {...listeners} />
            )}
            {cell.render('Cell')}
          </TableData>
        ))
      )}
    </tr>
  );
};
