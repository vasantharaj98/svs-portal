import React, {useState, useEffect} from 'react';
import {styled} from '@mui/material/styles';
import Table from '../../Components/Table/Table';
import Adddata from './Addyear';
import { Box, Typography, Autocomplete, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const columns = [
    { id: 'batchYear', align: 'center', label: 'Route Name', minWidth: 170 },
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
  

  const Tablebox = styled('div')(({ theme }) => ({
    marginTop : 80,
    marginLeft : 80,
    padding: theme.spacing(0, 3),
  }));

const Bus = ({currentId, setCurrentid, vchange, setVchange}) => {

  const year = useSelector((state)=> state.year);

  console.log(year);

  useEffect( () => {
    if(year.successMessage){
      toast(year.Message,
        {position: toast.POSITION.BOTTOM_RIGHT})
    }
  },[year]);

  return (
    <>
    <Tablebox>
    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <Typography variant="h6" sx={{ fontWeight: '600' }} >Batch Year</Typography>
        <Adddata currentId={currentId} setCurrentid={setCurrentid} vchange={vchange} setVchange={setVchange} button="Add Batch Year"></Adddata>
    </Box>
    <Table setCurrentid={setCurrentid} columns={columns} rows={year.data} />
    </Tablebox>
    </>

  )
}

export default Bus;