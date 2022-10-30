import React, {useState, useEffect} from 'react';
import {styled} from '@mui/material/styles';
import Table from '../../Components/Table/Table';
import Adddata from './Addbus';
import { Box, Typography, Autocomplete, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const columns = [
    { id: 'routeName', align: 'center', label: 'Route Name', minWidth: 100 },
    { id: 'busNumber',align: 'center', label: 'Bus\u00a0No', minWidth: 100 },
    {
      id: 'twoWayFees',
      label: 'Two Way Fees',
      minWidth: 100,
      align: 'center',
      format: (value) => value.toLocaleString('en-IN'),
    },
    {
      id: 'fullFees',
      label: 'Full Fess',
      minWidth: 100,
      align: 'center',
      format: (value) => value.toLocaleString('en-IN'),
    },
    {
      id: 'specialTrip',
      label: 'Special Trip Fees',
      minWidth: 100,
      align: 'center',
      format: (value) => value.toLocaleString('en-IN'),
    },
    {
      id: 'totalFees',
      label: 'Total Fess',
      minWidth: 100,
      align: 'center',
      format: (value) => value.toLocaleString('en-IN'),
    },
    {
      id: 'action',
      label: 'Action',
      minWidth: 100,
      align: 'center',
      actiontype:[{
        edit: true, 
        delete: true
      }]
    }
  ];
  

  const Tablebox = styled('div')(({ theme }) => ({
    marginTop : 80,
    marginLeft : 80,
    padding: theme.spacing(0, 3),
  }));

const Bus = ({currentId, setCurrentid, year, setYear, vchange, setVchange}) => {

  const busfees = useSelector((state)=> state.busfees);

  console.log("busfees", busfees);

  const batchYear = useSelector((state)=> state.year);

  const top100Films = batchYear?.data.map((ye)=>{
    return ye.batchYear;
 });
  
  useEffect( () => {
    if(busfees.successMessage){
      toast(busfees.Message,
        {position: toast.POSITION.BOTTOM_RIGHT})
    }
  },[busfees]);

  return (
    <>
    <Tablebox>
    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <Typography variant="h6" sx={{ fontWeight: '600' }} >Bus Fees</Typography>
        <Autocomplete
        disablePortal
        size='small'
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
        <Adddata currentId={currentId} year={year} setCurrentid={setCurrentid} button="Add Bus Fees"></Adddata>
    </Box>
    <Table setCurrentid={setCurrentid} columns={columns} rows={ busfees.busfees}  />
    </Tablebox>
    </>

  )
}

export default Bus;