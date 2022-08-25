import React from 'react';
import { styled} from '@mui/material/styles';
import Schooltable from '../../Components/Table/index';
import Adddata from './Addbus';

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
  ];
  
  function createData(routename, busno, twowayfees, fullfees, specialtripfees) {
    const totalfees = twowayfees + fullfees + specialtripfees;
    return { routename, busno, twowayfees, fullfees, specialtripfees, totalfees };
  }
  
  const rows = [
    createData('India', 'IN', 1324171354.15, 3287263, 500),
    createData('China', 'CN', 1403500365, 9596961, 500),
    createData('Italy', 'IT', 60483973, 301340, 500)
  ];

  const Tablebox = styled('div')(({ theme }) => ({
    marginTop : 80,
    marginLeft : 60,
    padding: theme.spacing(0, 3),
  }));

const Bus = () => {
  return (
    <>
    <Tablebox>
    <Adddata button="Add Bus Fees"></Adddata>
    <Schooltable columns={columns} rows={rows} />
    </Tablebox>
    </>

  )
}

export default Bus;