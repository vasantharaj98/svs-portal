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
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { deleteBusfees, toast } from '../../actions/busfees';
import { viewStudent, loading } from '../../actions/payment';


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

const Schooltable = ({setCurrentid, columns, rows, setView, setHeaderid, tagbar, handleClick, page, setPage, rowsPerPage, setRowsPerPage, headvalue}) => {
  
  const dispatch = useDispatch();

    const handleView = (id) =>{
      dispatch(viewStudent(id, setView));
      dispatch(loading(true));
      setCurrentid(id);
    }
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };  

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick5 = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const checkval = headvalue.map((va)=> va);

return (
  <>
    <Paper sx={{ width: "100%", overflow: "hidden", marginBottom: 2 }}>
      <TableCusContainer sx={{ maxHeight: "100%" }}>
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
                  {/* {column.closeIcon && (
                    <HighlightOffIcon onClick={() => setHeaderid(column.id)} />
                  )} */}
                </TableCell>
              ))}
              {tagbar && (
                <TableCell align="right">
                  <MoreVertIcon onClick={handleClick5} />
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        padding: "10px",
                        flexWrap: "wrap",
                        gap: "10px",
                      }}
                    >
                      <FormGroup>
                        {tagbar.map((va)=>(
                          <FormControlLabel
                          control={<Checkbox name={va.id} value={va.label} checked={(checkval.filter((v)=>v.id === va.id))[0]?.id === va.id ? "checked":""} onClick={handleClick} />}
                          label={va.label}
                        />
                        ))}
                      </FormGroup>
                    </Box>
                  </Popover>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length == 0 && (
              <TableCell
                component="th"
                colSpan={columns.length}
                align="center"
                scope="row"
              >
                No data found
              </TableCell>
            )}
            {rows?.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {columns.map((column) => {
                  return (
                    <>
                      <TableCell
                        component="th"
                        align={column.align}
                        scope="row"
                      >
                        {row[column.id] == true ? (
                          "Yes"
                        ) : !row[column.id] == "" ? (
                          row[column.id]
                        ) : column.id === "action" ? (
                          <>
                            {column?.actiontype.map((a) => {
                              return (
                                <>
                                  {a.view && (
                                    <Button
                                      onClick={() => handleView(row.uniqueId)}
                                      sx={{
                                        background: "#3d07dc",
                                        marginRight: 2,
                                      }}
                                    >
                                      <VisibilityIcon
                                        sx={{ color: "#fff" }}
                                      ></VisibilityIcon>
                                    </Button>
                                  )}
                                  {a.edit && (
                                    <Button
                                      onClick={() => setCurrentid(row._id)}
                                      sx={{
                                        background: "#3d07dc",
                                        marginRight: 2,
                                      }}
                                    >
                                      <EditIcon
                                        sx={{ color: "#fff" }}
                                      ></EditIcon>
                                    </Button>
                                  )}
                                  {a.delete && (
                                    <Button
                                      onClick={() => {
                                        dispatch(deleteBusfees(row._id));
                                        dispatch(loading(true));
                                        dispatch(toast(false));
                                      }}
                                      sx={{ background: "#dc0707" }}
                                    >
                                      <DeleteIcon sx={{ color: "#fff" }} />
                                    </Button>
                                  )}
                                </>
                              );
                            })}
                          </>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    </>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableCusContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Paper>
  </>
);
}

export default Schooltable;