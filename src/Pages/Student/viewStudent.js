import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../Layouts/Themesetup/index';
import {Box, Button, Typography, Grid} from '@mui/material';
import {ArrowBackIos, AccountCircle} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Adddata from './Addpayment'

const ViewStudent = ({setView, year, setCurrentid, currentId}) => {

  const payment = useSelector((state)=> state.payment);

  console.log("paymentpayment", payment);

  const studentView = payment.data;


  return (
    <>
      <ThemeProvider theme={theme}>
        <Box>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              onClick={() =>{ 
                setView(false)
                setCurrentid(null);
              }}
              variant="contained"
              color="lightblack"
              style={{ height: "50px", boxShadow: "unset", minWidth: '30px' }}
            >
              <ArrowBackIos style={{ marginLeft: 5, color: "#000" }} />
            </Button>
            <Typography
              variant="h6"
              sx={{ width: "100%", textAlign: "center", fontWeight: 600 }}
            >
              View Details
            </Typography>
          </div>
          <div style={{ marginTop: 30 }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <AccountCircle sx={{ fontSize: 130 }} />
              </Grid>
              <Grid item xs={3}>
                <div>
                  <Typography
                    variant="p"
                    color="secondary"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    Student ID
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                  >
                    {studentView.studentId}
                  </Typography>
                </div>
                <div style={{marginTop: 20}}>
                  <Typography
                    variant="p"
                    color="secondary"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    Student Name
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                  >
                    {studentView.name}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={3}>
              <div>
                  <Typography
                    variant="p"
                    color="secondary"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    Mobile Number
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                  >
                    {studentView.mobileNumber}
                  </Typography>
                </div>
                <div style={{marginTop: 20}}>
                  <Typography
                    variant="p"
                    color="secondary"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    Aadhaar Number
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                  >
                    {studentView.adharNumber}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={3}>
              <div>
                  <Typography
                    variant="p"
                    color="secondary"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    Email ID
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                  >
                    {studentView.email}
                  </Typography>
                </div>
                <div style={{marginTop: 20}}>
                  <Typography
                    variant="p"
                    color="secondary"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    Date of Birth
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                  >
                    {studentView.dob}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </div>
          {Object.values(studentView.studentBatchResponseMap).map((v)=>{
            return (
              <div
                style={{ marginTop: 50, background: "rgb(251 249 255)", padding: 15 }}
              >
                <Typography variant="h6">Batch: {v.batch}</Typography>
                <Grid container style={{ marginTop: 2 }} spacing={2}>
                  <Grid item xs={3}>
                    <div>
                      <Typography
                        variant="p"
                        color="secondary"
                        sx={{ width: "100%", textAlign: "left" }}
                      >
                        Class Name
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ width: "100%", textAlign: "left",fontSize: 17, fontWeight: 600 }}
                      >
                        {v.className}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div>
                      <Typography
                        variant="p"
                        color="secondary"
                        sx={{ width: "100%", textAlign: "left" }}
                      >
                        Section
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                      >
                        {v.section}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div>
                      <Typography
                        variant="p"
                        color="secondary"
                        sx={{ width: "100%", textAlign: "left" }}
                      >
                        Discount Type
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                      >
                        {v.discountType}
                      </Typography>
                    </div>
                  </Grid>
                  {v.busService && (
                    <>
                      <Grid item xs={3}>
                        <div>
                          <Typography
                            variant="p"
                            color="secondary"
                            sx={{ width: "100%", textAlign: "left" }}
                          >
                            Route Name
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                          >
                            {v.routeName}
                          </Typography>
                        </div>
                      </Grid>
                      <Grid item xs={3}>
                        <div>
                          <Typography
                            variant="p"
                            color="secondary"
                            sx={{ width: "100%", textAlign: "left" }}
                          >
                            Bus Number
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                          >
                            {v.busNumber}
                          </Typography>
                        </div>
                      </Grid>
                      <Grid item xs={3}>
                        <div>
                          <Typography
                            variant="p"
                            color="secondary"
                            sx={{ width: "100%", textAlign: "left" }}
                          >
                            Special Trip
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                          >
                            {v.hasSpecialTrip}
                          </Typography>
                        </div>
                      </Grid>
                    </>
                  )}
                </Grid>
                {(v?.paymentInputOptions?.term1fees || v?.paymentInputOptions?.term2fees || v?.paymentInputOptions?.term3fees 
                || v?.paymentInputOptions?.tuitionFees|| v?.paymentInputOptions?.bookFees || v?.paymentInputOptions?.twoWayFees || v?.paymentInputOptions?.specialBusFees
                  ) ? <Adddata button="Add Payment" data={v?.paymentInputOptions} year={year} currentId={currentId}></Adddata> : null}
                <div style={{ marginTop: 15 }}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          {v?.tableHeaderList?.map((val) => (
                            <TableCell align="left">{val}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {v?.feesPaymentTableHistory.map((row) => (
                          <TableRow
                            key={row}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            {row.map((v) => (
                              <TableCell component="th" scope="row">
                                {v}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            );
          })}
        </Box>
      </ThemeProvider>
    </>
  );
}

export default ViewStudent;
