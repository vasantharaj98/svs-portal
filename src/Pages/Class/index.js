import React, {useEffect} from 'react';
import {styled} from '@mui/material/styles';
import Table from '../../Components/Table/Table';
import Adddata from './Addbus';
import { Box, Typography, Autocomplete, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const columns = [
    { id: 'className', align: 'center', label: 'Class', minWidth: 100 },
    { id: 'sectionName',align: 'center', label: 'Section', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 100, align: 'center', actiontype:[{edit: true, delete: true}]}
  ];
const rows=[
  {
  "_id": "631c362affaff2b9aa378436",
  "className": "UKG",
  "sectionName": "A,B",
  }
]
  

  const Tablebox = styled('div')(({ theme }) => ({
    marginTop : 80,
    marginLeft : 80,
    padding: theme.spacing(0, 3),
  }));

const Bus = ({currentId, setCurrentid, vchange, setVchange}) => {

  const classes = useSelector((state)=> state.classs);

  console.log("classes", classes);
  
  useEffect( () => {
    if(classes.successMessage){
      toast(classes.Message,
        {position: toast.POSITION.BOTTOM_RIGHT})
    }
  },[classes]);

  return (
    <>
    <Tablebox>
    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap'}}>
        <Typography variant="h6" sx={{ fontWeight: '600'}} >Class</Typography>
        <Adddata currentId={currentId} setCurrentid={setCurrentid} button="Add Class"></Adddata>
    </Box>
    <Table setCurrentid={setCurrentid} columns={columns} rows={ classes?.data} />
    </Tablebox>
    </>

  )
}

export default Bus;