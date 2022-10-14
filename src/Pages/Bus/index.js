import React, {useEffect} from 'react';
import {styled} from '@mui/material/styles';
import Table from '../../Components/Table/Table';
import Adddata from './Addbus';
import { Box, Typography, Autocomplete, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const columns = [
    { id: 'routename', label: 'Route Name', minWidth: 170 },
    { id: 'busno',align: 'center', label: 'Bus\u00a0No', minWidth: 100 },
    {
      id: 'twowayfees',
      label: 'Two Way Fees',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-IN'),
    },
    {
      id: 'fullfees',
      label: 'Full Fess',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-IN'),
    },
    {
      id: 'specialtripfees',
      label: 'Special Trip Fees',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-IN'),
    },
    {
      id: 'totalfees',
      label: 'Total Fess',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-IN'),
    },
    {
      id: 'action',
      label: 'Action',
      minWidth: 170,
      align: 'center',
      actiontype:[{
        edit: true, 
        delete: true
      }]
    }
  ];

  const top100Films = ['2019', '2020'];
  

  const Tablebox = styled('div')(({ theme }) => ({
    marginTop : 80,
    marginLeft : 80,
    padding: theme.spacing(0, 3),
  }));

const Bus = ({currentId, setCurrentid}) => {

  const busfees = useSelector((state)=> state.busfees);

  console.log("busfeesbusfees", busfees);
  
  useEffect( () => {
    if(busfees.successMessage){
      toast(busfees.Message);
    }
  },[busfees]);

  return (
    <>
    <Tablebox>
    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
        <Typography variant="h5" sx={{ fontWeight: '600' }} >Bus Fees</Typography>
        <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Select Year" />}
        />
        <Adddata currentId={currentId} setCurrentid={setCurrentid} button="Add Bus Fees"></Adddata>
    </Box>
    <Table setCurrentid={setCurrentid} columns={columns} rows={busfees.busfees} />
    </Tablebox>
    </>

  )
}

export default Bus;