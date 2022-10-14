import React, {useEffect} from 'react';
import {styled} from '@mui/material/styles';
import Table from '../../Components/Table/Table';
import Adddata from './Addbus';
import { Box, Typography, Autocomplete, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const columns = [
    { id: 'class', label: 'Class', minWidth: 170 },
    { id: 'section',align: 'center', label: 'Section', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 170, align: 'center', actiontype:[{edit: true, delete: true}]}
  ];
const rows=[
  {
  "_id": "631c362affaff2b9aa378436",
  "class": "UKG",
  "section": "A,B",
  },
  {
    "_id": "631c362affaff2b9aa378436",
    "class": "1ST",
    "section": "B1,G1",
    },
]
  const top100Films = ['2019', '2020'];
  

  const Tablebox = styled('div')(({ theme }) => ({
    marginTop : 80,
    marginLeft : 80,
    padding: theme.spacing(0, 3),
  }));

const Bus = ({currentId, setCurrentid}) => {

  const busfees = useSelector((state)=> state.busfees);

  console.log(busfees);
  
  useEffect( () => {
    if(busfees.successMessage){
      toast(busfees.Message);
    }
  },[busfees]);

  return (
    <>
    <Tablebox>
    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap'}}>
        <Typography variant="h5" sx={{ fontWeight: '600', marginBottom:2 }} >Class</Typography>
        <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: 300, marginBottom:2 }}
        renderInput={(params) => <TextField {...params} label="Select Year" />}
        />
        <Adddata currentId={currentId} setCurrentid={setCurrentid} button="Add Class"></Adddata>
    </Box>
    <Table setCurrentid={setCurrentid} columns={columns} rows={rows} />
    </Tablebox>
    </>

  )
}

export default Bus;