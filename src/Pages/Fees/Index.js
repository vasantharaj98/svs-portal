import React, {useEffect} from 'react';
import {styled} from '@mui/material/styles';
import Table from '../../Components/Table/Table';
import Adddata from './Addfees';
import { Box, Typography, Autocomplete, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const columns = [
  { id: 'className', align: 'center', label: 'Class Name', minWidth: 100 },
      { id: 'bookFees',align: 'center', label: 'Book Fees', minWidth: 100 },
      { id: 'term1',align: 'center', label: 'Term 1', minWidth: 100 },
      { id: 'term2',align: 'center', label: 'Term 2', minWidth: 100 },
      { id: 'term3',align: 'center', label: 'Term 3', minWidth: 100 },
      { id: 'totalFees',align: 'center', label: 'Total Fees', minWidth: 100 },
      { id: 'action', label: 'Action', minWidth: 100, align: 'center', actiontype:[{edit: true, delete: true}]}
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
        <Typography variant="h6" sx={{ fontWeight: '600'}} >Academic Fees</Typography>
        <Autocomplete
        size='small'
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: 150 }}
        value={top100Films ? year : null}
        onChange={(event, value) => {
          setYear(value) ;
          setVchange(!vchange);
        }}
        renderInput={(params) => <TextField size='small' {...params} label="Select Batch" />}
        />
        <Adddata currentId={currentId} year={year} setCurrentid={setCurrentid} button="Add Academic Fees"></Adddata>
    </Box>
    <Table setCurrentid={setCurrentid} columns={columns} rows={Fees.fees} />
    </Tablebox>
    </>

  )
}

export default Bus;