import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { styled } from "@mui/material/styles";
import { theme } from '../../Layouts/Themesetup/index';
import {Box, Button, Typography, Grid} from '@mui/material';
import {ArrowBackIos, AccountCircle} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Adddata from './Addpayment';
import { viewStudent, loading } from '../../actions/payment';
import { Link } from 'react-router-dom';


const Tablebox = styled("div")(({ theme }) => ({
  marginTop: 80,
  marginLeft: 80,
  padding: theme.spacing(0, 3),
}));

const ViewStudent = ({ year, setCurrentid, currentId}) => {


  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(viewStudent(currentId));
    dispatch(loading(true));
  },[])

  const payment = useSelector((state)=> state.payment);

  useEffect(()=>{
    if(payment.Message === "vasa"){
      dispatch(viewStudent(currentId));
    }
},[payment.Message === "vasa"])

  console.log("paymentpayment", payment.data);

  const splitKeyValue = obj => {
    if(payment?.data?.miniTable){
    const keys = Object.keys(obj);
    const res = [];
    for(let i = 0; i < keys.length; i++){
       res.push({
          'year': keys[i],
          'amount': obj[keys[i]]
       });
    };
    return res;
  }
 };

 const miniTable = splitKeyValue(payment?.data?.miniTable);

 console.log("minitable", miniTable?.map((e)=> e.year));

 const studentView = payment.data;

  const studentDetail = payment?.data?.studentDetailResponseDto;
  const parentDetail = payment?.data?.parentDetailResponseDto;
  const siblingDetail = payment?.data?.siblingsResponseDtoList;

  return (
    <>
      <ThemeProvider theme={theme}>
        <Tablebox>
        <Box>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to={"/"}>
            <Button
              onClick={() =>{ 
                setCurrentid(null);
              }}
              variant="contained"
              color="lightblack"
              style={{ height: "50px", boxShadow: "unset", minWidth: '30px' }}
            >
              <ArrowBackIos style={{ marginLeft: 5, color: "#000" }} />
            </Button>
            </Link>
            <Typography
              variant="h6"
              sx={{ width: "100%", textAlign: "center", fontWeight: 600 }}
            >
              View Details
            </Typography>
          </div>
          <div style={{ marginTop: 30 }}>
            <Grid container spacing={2}>
              <Grid item xs={2} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <div >
                    <AccountCircle sx={{ fontSize: 130 }} />
                </div>
              </Grid>
              <Grid item xs={2}>
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
                    {studentDetail?.studentId}
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
                    {studentDetail?.name}
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
                    {studentDetail?.dob}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={2}>
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
                    {studentDetail?.mobileNumber}
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
                    {studentDetail?.adharNumber}
                  </Typography>
                </div>
                <div style={{marginTop: 20}}>
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
                    {studentDetail?.email}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={2}>
              <div>
                  <Typography
                    variant="p"
                    color="secondary"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    Student Caste
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                  >
                    {studentDetail?.studentCaste}
                  </Typography>
                </div>
                <div style={{marginTop: 20}}>
                  <Typography
                    variant="p"
                    color="secondary"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    Student Religion
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                  >
                    {studentDetail?.studentReligion}
                  </Typography>
                </div>
                <div style={{marginTop: 20}}>
                  <Typography
                    variant="p"
                    color="secondary"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    Previous Year Balance
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                  >
                    {studentDetail?.previousUnregisteredYearBalance}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={2}>
              <div>
                  <Typography
                    variant="p"
                    color="secondary"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    Fees to be paid
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                  >
                    {studentDetail?.feesToBePaid}
                  </Typography>
                </div>
                <div style={{marginTop: 20}}>
                  <Typography
                    variant="p"
                    color="secondary"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    Total Fees Paid
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                  >
                    {studentDetail?.totalFeesPaid}
                  </Typography>
                </div>
                <div style={{marginTop: 20}}>
                  <Typography
                    variant="p"
                    color="secondary"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    Balance
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                  >
                    {studentDetail?.balance}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={2}>
                {miniTable?.map((e, index)=>(
                  <div key={index} style={{display:'flex'}}>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "center", fontSize: 17, fontWeight: 600 }}
                  >
                   {e.year} :
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                  >
                    {e.amount}
                  </Typography>
              </div>
                ))}
              </Grid>
            </Grid>
          </div>
          <div style={{ marginTop: 50 }}>
          <Typography
              variant="h6"
              sx={{ width: "100%", textAlign: "left", fontWeight: 600, marginBottom:"20px" }}
            >
              Parent Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <div>
                  <Typography
                    variant="p"
                    color="secondary"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    Father Name
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                  >
                    {parentDetail?.fatherName}
                  </Typography>
                </div>
                <div style={{marginTop: 20}}>
                  <Typography
                    variant="p"
                    color="secondary"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    Mother Name
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                  >
                    {parentDetail?.motherName}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={2}>
              <div>
                  <Typography
                    variant="p"
                    color="secondary"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    Father Mobile Number
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                  >
                    {parentDetail?.fatherMobileNo}
                  </Typography>
                </div>
                <div style={{marginTop: 20}}>
                  <Typography
                    variant="p"
                    color="secondary"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    Mother Mobile Number
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                  >
                    {parentDetail?.motherMobileNo}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={2}>
              <div>
                  <Typography
                    variant="p"
                    color="secondary"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    Father Occupation
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                  >
                    {parentDetail?.fatherOccupation}
                  </Typography>
                </div>
                <div style={{marginTop: 20}}>
                  <Typography
                    variant="p"
                    color="secondary"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    Mother Occupation
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                  >
                    {parentDetail?.motherOccupation}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={2}>
              <div>
                  <Typography
                    variant="p"
                    color="secondary"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    Father Caste
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                  >
                    {parentDetail?.fatherCaste}
                  </Typography>
                </div>
                <div style={{marginTop: 20}}>
                  <Typography
                    variant="p"
                    color="secondary"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    Mother Caste
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                  >
                    {parentDetail?.motherCaste}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={2}>
              <div>
                  <Typography
                    variant="p"
                    color="secondary"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    Father Religion
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                  >
                    {parentDetail?.fatherReligion}
                  </Typography>
                </div>
                <div style={{marginTop: 20}}>
                  <Typography
                    variant="p"
                    color="secondary"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    Mother Religion
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                  >
                    {parentDetail?.motherReligion}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={2}>
                <div>
                  <Typography
                    variant="p"
                    color="secondary"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    Address
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                  >
                    {parentDetail?.address1}
                    {parentDetail?.address2}
                  </Typography>
                </div>
              </Grid>
              {siblingDetail && 
              siblingDetail?.map((e, index)=>{
                <Grid key={index} item xs={2}>
                <div>
                  <Typography
                    variant="p"
                    color="secondary"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    {e?.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                  >
                    {e?.studentId}
                  </Typography>
                </div>
              </Grid>
              })
              }
            </Grid>
          </div>
          {studentView?.studentBatchResponseMap &&  Object.values(studentView?.studentBatchResponseMap).map((v)=>{
            console.log("v", v);
            return (
              <div
                style={{ marginTop: 50, background: "rgb(251 249 255)", padding: 15 }}
              >
                <Typography variant="h6">Batch: {v?.studentAcademicDetailResponseDto?.batchYear}</Typography>
                <Grid container style={{ marginTop: 2 }} spacing={2}>
                  <Grid item xs={2}>
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
                        {v?.studentAcademicDetailResponseDto?.className}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={2}>
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
                        {v?.studentAcademicDetailResponseDto?.sectionName}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <div>
                      <Typography
                        variant="p"
                        color="secondary"
                        sx={{ width: "100%", textAlign: "left" }}
                      >
                        Discount Name
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                      >
                        {v?.studentAcademicDetailResponseDto?.discountName}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <div>
                      <Typography
                        variant="p"
                        color="secondary"
                        sx={{ width: "100%", textAlign: "left" }}
                      >
                        Director Discount
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                      >
                        {v?.studentAcademicDetailResponseDto?.directorDiscount}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <div>
                      <Typography
                        variant="p"
                        color="secondary"
                        sx={{ width: "100%", textAlign: "left" }}
                      >
                        Director Name
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                      >
                        {v?.studentAcademicDetailResponseDto?.directorName}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <div>
                      <Typography
                        variant="p"
                        color="secondary"
                        sx={{ width: "100%", textAlign: "left" }}
                      >
                        Academic Balance
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                      >
                        {v?.studentAcademicDetailResponseDto?.academicBalance}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <div>
                      <Typography
                        variant="p"
                        color="secondary"
                        sx={{ width: "100%", textAlign: "left" }}
                      >
                        Fees To Be Paid
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                      >
                        {v?.studentAcademicDetailResponseDto?.academicFeesToBePaid}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <div>
                      <Typography
                        variant="p"
                        color="secondary"
                        sx={{ width: "100%", textAlign: "left" }}
                      >
                        Total Fees Paid
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ width: "100%", textAlign: "left", fontSize: 17, fontWeight: 600 }}
                      >
                        {v?.studentAcademicDetailResponseDto?.academicTotalFeesPaid}
                      </Typography>
                    </div>
                  </Grid>
                  {v?.studentAcademicDetailResponseDto?.busService && (
                    <>
                      <Grid item xs={2}>
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
                            {v?.studentAcademicDetailResponseDto?.routeName}
                          </Typography>
                        </div>
                      </Grid>
                      <Grid item xs={2}>
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
                            {v?.studentAcademicDetailResponseDto?.busNumber}
                          </Typography>
                        </div>
                      </Grid>
                      <Grid item xs={2}>
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
                            {v?.studentAcademicDetailResponseDto?.hasSpecialTrip}
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
        </Tablebox>
      </ThemeProvider>
    </>
  );
}

export default ViewStudent;
