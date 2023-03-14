import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type Props = {
  head: string[];
  data?: object[];
}

// Takes a head array with column labels
// and a data array with objects filled into rows
// Head and data objects must have the same number of values—else the table will be janky
const BasicTable: React.FC<Props> = ({head, data}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {head.map(h => (
              <TableCell>{h}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              // key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {
                Object.values(row).map(value => (
                  <TableCell>{value}</TableCell>
                ))
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BasicTable;