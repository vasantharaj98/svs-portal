import React from 'react';
import {styled} from '@mui/material/styles';
import Schooltable from '../../Components/Table/index';
import Adddata from './Addbus';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const columns = [
    { id: 'routename', label: 'Route Name', minWidth: 170 },
    { id: 'busno', label: 'Bus\u00a0No', minWidth: 100 },
    {
      id: 'twowayfees',
      label: 'Two Way Fees',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-IN'),
    },
    {
      id: 'fullfees',
      label: 'Full Fess',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-IN'),
    },
    {
      id: 'specialtripfees',
      label: 'Special Trip Fees',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-IN'),
    },
    {
      id: 'totalfees',
      label: 'Total Fess',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-IN'),
    },
    {
      id: 'action',
      label: 'Action',
      minWidth: 170,
      align: 'right',
    }
  ];

  const Tablebox = styled('div')(({ theme }) => ({
    marginTop : 80,
    marginLeft : 80,
    padding: theme.spacing(0, 3),
  }));

const Bus = ({currentId, setCurrentid}) => {

  const busfees = useSelector((state)=> state.busfees);
  // console.log(busfees);
  return (
    <>
    <Tablebox>
    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
        <Typography variant="h5" sx={{ fontWeight: '600' }} >Bus Fees</Typography>
        <Adddata currentId={currentId} setCurrentid={setCurrentid} button="Add Bus Fees"></Adddata>
    </Box>
    <Schooltable setCurrentid={setCurrentid} columns={columns} rows={busfees} />
    </Tablebox>
    </>

  )
}

export default Bus;