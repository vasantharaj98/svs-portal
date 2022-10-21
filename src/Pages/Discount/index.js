import React, {useEffect} from 'react';
import {styled} from '@mui/material/styles';
import Table from '../../Components/Table/Table';
import Adddata from './Adddiscount';
import { Box, Typography, Autocomplete, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const columns = [
    { id: 'discountName', label: 'Discount Name', minWidth: 170 },
    { id: 'busFees',align: 'center', label: 'Bus Fees', minWidth: 100 },
    { id: 'tuitionFees',align: 'center', label: 'Tution Fees', minWidth: 100 },
    { id: 'bookFees',align: 'center', label: 'Book Fees', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 170, align: 'center', actiontype:[{edit: true, delete: true}]}
  ];
  

  const Tablebox = styled('div')(({ theme }) => ({
    marginTop : 80,
    marginLeft : 80,
    padding: theme.spacing(0, 3),
  }));

const Bus = ({currentId, setCurrentid}) => {

  const discount = useSelector((state)=> state.discount);

  console.log("discount", discount);


  useEffect( () => {
    if(discount.successMessage){
      toast(discount.Message,
        {position: toast.POSITION.BOTTOM_RIGHT});
    }
  },[discount]);

  return (
    <>
    <Tablebox>
    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap'}}>
        <Typography variant="h5" sx={{ fontWeight: '600'}} >Fees Discount</Typography>
        <Adddata currentId={currentId} setCurrentid={setCurrentid} button="Add Discount"></Adddata>
    </Box>
    <Table setCurrentid={setCurrentid} columns={columns} rows={discount?.data} />
    </Tablebox>
    </>

  )
}

export default Bus;