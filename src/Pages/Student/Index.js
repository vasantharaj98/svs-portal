import React, {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import Table from '../../Components/Table/Table';
import Adddata from './Addstudent';
import Viewstudent from './viewStudent';
import { Box, Typography, Autocomplete, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const columns = [
    { id: 'studentId', label: 'Student Id', minWidth: 170 },
    { id: 'studentName',align: 'center', label: 'Student Name', minWidth: 100 },
    { id: 'mobileNo',align: 'center', label: 'Mobile Number', minWidth: 100 },
    { id: 'aadhaarNo',align: 'center', label: 'Aadhaar Number', minWidth: 100 },
    { id: 'class',align: 'center', label: 'Class', minWidth: 100 },
    { id: 'section',align: 'center', label: 'Section', minWidth: 100 },
    { id: 'busRoute',align: 'center', label: 'Bus Route', minWidth: 100 },
    { id: 'busNo',align: 'center', label: 'Bus No', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 170, align: 'center', actiontype:[{view: true, edit: true, delete: true}]}
  ];
const rows=[
  {
  "_id": "631c362affaff2b9aa378436",
  "studentId": "1234",
  "studentName": "Vasanth",
  "mobileNo": "8765466546",
  "aadhaarNo": "8765466546",
  "class": "LKG",
  "section": "A,B",
  "busRoute": "Coimbatore",
  "busNo": "TN76N7655",
  },
  {
    "_id": "631c362affaff2b9aa378436",
    "studentId": "1234",
    "studentName": "Vasanth",
    "mobileNo": "8765466546",
    "aadhaarNo": "8765466546",
    "class": "LKG",
    "section": "A,B",
    "busRoute": "",
    "busNo": "",
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

  const[view, setView]=useState(false);

  console.log(busfees);
  
  useEffect( () => {
    if(busfees.successMessage){
      toast(busfees.Message);
    }
  },[busfees]);

  return (
    <>
    <Tablebox>
      {view ?
      <Viewstudent setView={setView}></Viewstudent>
      :
      <div>
      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap'}}>
        <Typography variant="h5" sx={{ fontWeight: '600', marginBottom:2 }} >Students</Typography>
        <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: 300, marginBottom:2 }}
        renderInput={(params) => <TextField {...params} label="Select Batch" />}
        />
        <Adddata currentId={currentId} setCurrentid={setCurrentid} button="Add Student"></Adddata>
    </Box>
    <Table setCurrentid={setCurrentid} columns={columns} rows={rows} setView={setView}/>
      </div>
}
    </Tablebox>
    </>

  )
}

export default Bus;