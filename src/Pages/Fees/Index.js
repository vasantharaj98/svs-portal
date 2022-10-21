import React, {useEffect} from 'react';
import {styled} from '@mui/material/styles';
import Table from '../../Components/Table/Table';
import Adddata from './Addfees';
import { Box, Typography, Autocomplete, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const columns = [
  { id: 'className', label: 'Class Name', minWidth: 170 },
      { id: 'tuitionFees',align: 'center', label: 'Tution Fees', minWidth: 100 },
      { id: 'bookFees',align: 'center', label: 'Book Fees', minWidth: 100 },
      { id: 'totalFees',align: 'center', label: 'Total', minWidth: 100 },
      { id: 'action', label: 'Action', minWidth: 170, align: 'center', actiontype:[{edit: true, delete: true}]}
];
  

const Tablebox = styled('div')(({ theme }) => ({
    marginTop : 80,
    marginLeft : 80,
    padding: theme.spacing(0, 3),
  }));

const Bus = ({currentId, setCurrentid, vchange, setVchange, year, setYear}) => {

  const Fees = useSelector((state)=> state.fees);

  console.log("feesfeees", Fees);

  const batchYear = useSelector((state)=> state.year);

  const top100Films = batchYear?.data.map((ye)=>{
    return ye.batchYear;
 });
  
  useEffect( () => {
    if(Fees.successMessage){
      toast(Fees.Message,
        {position: toast.POSITION.BOTTOM_RIGHT});
    }
  },[Fees]);

  return (
    <>
    <Tablebox>
    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap'}}>
        <Typography variant="h5" sx={{ fontWeight: '600'}} >Academic Fees</Typography>
        <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: 300 }}
        value={top100Films ? year : null}
        onChange={(event, value) => {
          setYear(value) ;
          setVchange(!vchange);
        }}
        renderInput={(params) => <TextField {...params} label="Select Year" />}
        />
        <Adddata currentId={currentId} year={year} setCurrentid={setCurrentid} button="Add Academic Fees"></Adddata>
    </Box>
    <Table setCurrentid={setCurrentid} columns={columns} rows={Fees.fees} />
    </Tablebox>
    </>

  )
}

export default Bus;