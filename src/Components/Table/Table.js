import React, {useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { deleteBusfees, loading, toast } from '../../actions/busfees';



  const TableCusContainer = styled(TableContainer)(({ theme }) => ({
    maxHeight: 700,
    [theme.breakpoints.down('md')]: {
        maxHeight: 440,
      },
    
  }));

  const Button = styled ('button')(({theme})=> ({
      padding: 10,
      color: theme.primary,
      borderRadius: 8,
      border: 0,
  }));

const Schooltable = ({setCurrentid, columns, rows, setView}) => {
  
  const dispatch = useDispatch();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };  


return (
      <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableCusContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {columns.map((column)=>{
                return(
                  <TableCell component="th" align={column.align} scope="row">
                  {!row[column.id] == "" ? row[column.id] : "-"}
                  {column.id === "action"
                  && 
                  <>
                  {column?.actiontype.map((a)=>{
                    return(
                    <>
                    {a.view && <Button onClick={ ()=> setView(true)} sx={{background: '#3d07dc', marginRight: 2}}><VisibilityIcon sx={{color: '#fff'}}></VisibilityIcon></Button>}
                    {a.edit && <Button onClick={ ()=> setCurrentid(row._id)} sx={{background: '#3d07dc', marginRight: 2}}><EditIcon sx={{color: '#fff'}}></EditIcon></Button>}
                    {a.delete && <Button onClick={ () =>{ dispatch(deleteBusfees(row._id)); dispatch(loading(true)); dispatch(toast(false)) }} sx={{background: '#dc0707'}}><DeleteIcon sx={{color: '#fff'}}/></Button>}
                    </>
                    )
                  })}
                  </>
                  }
                </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableCusContainer>
      { rows.length >= 10 &&
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    }
    </Paper>
    </>
  )
}

export default Schooltable;