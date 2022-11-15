import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "../../Components/Table/Table";
import Adddata from "./Addstudent";
import Viewstudent from "./viewStudent";
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from 'formik';
import { getStudent } from "../../actions/student";

const columns = [
  {
    id: "action",
    label: "Action",
    minWidth: 200,
    align: "center",
    actiontype: [{ view: true, edit: true, delete: true }],
  },
  { id: "studentId", label: "Student Id", align: "center", minWidth: 100 },
  { id: "name", align: "center", label: "Student Name", minWidth: 100 },
];

const tabHeader = [
  { id: "mobileNumber", label: "Mobile Number" },
  { id: "adharNumber", label: "Aadhaar Number" },
  { id: "email", label: "Email" },
  { id: "dob", label: "DOB" },
  { id: "balance", label: "Balance" },
  { id: "previousUnregisteredYearBalance", label: "Un Balance" },
  { id: "studentCaste", label: "Student Caste" },
  { id: "studentReligion", label: "Student Religion" },
  { id: "feesToBePaid", label: "Fees To Be Paid" },
  { id: "totalFeesPaid", label: "Total Paid Fees" },
  { id: "address1" , label: "Address 1"},
  { id: "address2" , label: "Address 2"},
  { id: "fatherCaste" , label: "Father Caste"},
  { id: "fatherMobileNo" , label: "Father Mobile No"},
  { id: "fatherName" , label: "Father Name"},
  { id: "fatherOccupation" , label: "Father Occupation"},
  { id: "fatherReligion" , label: "Father Religion"},
  { id: "homeMobileNo" , label: "Home Mobile No"},
  { id: "motherCaste" , label: "Mother Caste"},
  { id: "motherMobileNo" , label: "Mother Mobile No"},
  { id: "motherName" , label: "Mother Name"},
  { id: "motherOccupation" , label: "Mother Occupation"},
  { id: "motherReligion" , label: "Mother Religion"},
];

const academicDetails = [
  { id: "academicBalance", label: "Academic Balance" },
  { id: "academicFeesToBePaid", label: "Academic Paid Fees" },
  { id: "academicTotalFeesPaid", label: "Academic Total Fees" },
  { id: "busNumber", label: "Bus Number" },
  { id: "busService", label: "Bus Service" },
  { id: "className", label: "Class Name" },
  { id: "sectionName", label: "Section Name" },
  { id: "discountName", label: "Discount Name" },
  { id: "directorDiscount", label: "Director Discount" },
  { id: "directorName", label: "Director Name" },
  { id: "routeName", label: "Route Name" },
  { id: "hasSpecialTrip", label: "Special Trip" },
];

const Tablebox = styled("div")(({ theme }) => ({
  marginTop: 80,
  marginLeft: 80,
  padding: theme.spacing(0, 3),
}));

const Bus = ({
  year,
  setYear,
  currentId,
  setCurrentid,
}) => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const student = useSelector((state) => state.student);
  const className = useSelector((state)=> state.classs);
  const DisCount = useSelector((state)=> state.discount);
  const dispatch = useDispatch();


  console.log("message", student);

  // const studentView = student?.data?.map((v) => {
  //   return { ...v, dob: `${v.dob[2]}-${v.dob[1]}-${v.dob[0]}` };
  // });

  const studentView = student?.data?.map((v) => {
    return { ...v.parentDetailResponseDto, ...v.studentAcademicDetailResponseDto, ...v.studentDetailResponseDto };
  });

  const batchYear = useSelector((state) => state.year);

  const top100Films = batchYear?.data.map((ye) => {
    return ye.batchYear;
  });

  useEffect(()=>{
      if(batchYear){
        top100Films.unshift("All");
      }
  },[top100Films])

  const [filtervalue, setFiltervalue] =  useState({ batch: year, size: 10, page: 0, paid:'all', className: null, sectionName:null, studentName:null, discountUuid:null, balance: 0});

  useEffect(()=>{
    if(student.Message === "vasa"){
      dispatch(getStudent(filtervalue));
    }
},[student.Message === "vasa"])

  useEffect(()=>{
    dispatch(getStudent(filtervalue));
    },[dispatch, filtervalue])

  console.log("filtervalue", filtervalue);

  useEffect(()=>{
      setFiltervalue({...filtervalue, size: rowsPerPage, page: page});
      formik.setFieldValue('page', page);
      formik.setFieldValue('size', rowsPerPage);
  },[page, rowsPerPage])

  useEffect(() => {
    if (student.successMessage) {
      toast(student.Message, { position: toast.POSITION.BOTTOM_RIGHT });
    }
  }, [student]);

  var  vasa = academicDetails.map((v)=>{return v});

  const [tableHeader, setTableHeader] = useState(tabHeader);

  useEffect(()=>{
      if(year !== "All"){
        setTableHeader([...tableHeader, ...vasa]);
      }
      else{
        setTableHeader(tabHeader);
      }
  },[year])

  const [headvalue, setHeadvalue] = useState(columns);
  const [tablerow, setTablerow] = useState({
    id: "",
    align: "",
    label: "",
    minWidth: 0,
    closeIcon: false,
  });

  const [tagbar, setTagbar] = useState(tableHeader);
  const [headerid, setHeaderid] = useState(null);

  useEffect(()=>{
      setTagbar(tableHeader);
  },[tableHeader])

  const tabelCol = headvalue.filter((va) => va.id !== headerid);

  const vvv = vasa.map((e)=>  e.id);

  useEffect(()=>{
    var head = headvalue;
      vasa.map((e, index)=>{
          const tabelCol2 = head.filter((va) => va.id !== vvv[index]);
          head = tabelCol2
          setHeadvalue(tabelCol2);
      })
  },[year])

  const tabelView = tagbar

  const [discount, setDiscount] = useState({disCount: ''});

  const handleChange1 = (e) =>{
      setDiscount({disCount: e.target.value})
  }

  useEffect(() => {
    setHeadvalue(tabelCol);
  }, [headerid]);

  const handleClick = (e) => {
    if(e.target.checked){
      setTablerow({
        id: e.target.name,
        label: e.target.value,
        align: "center",
        minWidth: 100,
        closeIcon: true,
      });
      setHeaderid(null);
    }
    else{
      setHeaderid(e.target.name);
    }
  };

  useEffect(() => {
    setTagbar(tabelView);
  }, [tablerow]);

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      setHeadvalue([...headvalue, tablerow]);
    }
  }, [tablerow]);

  const [key, setKey] = useState(null);

  const handleClick1 = (event, key) => {
    setKey(key);
    }

    const [key1, setKey1] = useState(null);

    const handleClick2 = (event, key) => {
      setKey1(key);
    }

    const discountuidd = key1!==null ? DisCount.data[key1].uniqueId : null;

    useEffect(()=>{
      formik.setFieldValue('discountUuid',  discountuidd);
  },[discount])

  useEffect(()=>{
    formik.setFieldValue('batch', year);
  },[year])

  const formik = useFormik({
    initialValues: {
      batch: '',
      size: 10,
      page: 0,
      paid:'all',
      className: null,
      sectionName:null,
      studentName:null,
      discountUuid:'',
      balance: 0
    },
    onSubmit: values => {
      setFiltervalue(values);
      // dispatch(postStudent(values));
      // dispatch(getStudent(values));
      console.log("searchValue", values);
      // setDiscount({disCount: ''});
      // formik.resetForm();
      // dispatch(loading(true));
    },
  });

  return (
    <>
      <Tablebox>
          <div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "7px",
                flexWrap: "wrap",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Students
              </Typography>
              <Adddata year={year} button="Add Student"></Adddata>
            </Box>
            <Typography variant="p" sx={{ fontWeight: "600" }}>
                Filters :
              </Typography>
            <Box
             component="form"
             noValidate
             autoComplete="off"
             onSubmit={formik.handleSubmit}
              sx={{
                background: "#fafafa",
                padding: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
                my: "10px",
                flexWrap: "wrap",
                gap: "15px",
              }}
            >
               <Autocomplete
                disablePortal
                size="small"
                id="combo-box-demo"
                options={top100Films}
                sx={{ minWidth: '150px' }}
                value={top100Films ? year : null}
                onChange={(event, value) => {
                  setYear(value);
                }}
                renderInput={(params) => (
                  <TextField size="small" {...params} label="Select Year" />
                )}
              />
              <FormControl sx={{minWidth: '150px'}}>
                <InputLabel size="small" id="demo-simple-select-label">Paid</InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.paid}
                  label="Paid"
                  name="paid"
                  onChange={formik.handleChange}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="nopaid">No Paid</MenuItem>
                </Select>
              </FormControl>
             {year !== 'All' &&
             <>
             <FormControl sx={{minWidth: '150px'}}>
                <InputLabel size="small" id="demo-simple-select-label">Class Name</InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.className}
                  label="Class Name"
                  name="className"
                  onChange={formik.handleChange}
                >
                  {className?.data.map((ye, key)=>{
                        return <MenuItem key={key} onClick={event => handleClick1(event, key)} value={ye.className}>{ye.className}</MenuItem>
                  })}
                </Select>
              </FormControl>
              <FormControl sx={{minWidth: '150px'}}>
                <InputLabel size="small" id="demo-simple-select-label">Section Name</InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.sectionName}
                  label="Section Name"
                  name="sectionName"
                  onChange={formik.handleChange}
                >
                  {key !== null ? className.data[key].sectionName.split(',') .map((v)=>{
                        return <MenuItem value={v}>{v}</MenuItem>
                      })
                      : null}
                </Select>
              </FormControl>
              <FormControl sx={{minWidth: '150px'}}>
                <InputLabel size="small" id="demo-simple-select-label">Discount Name</InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Discount Name"
                  value={discount.disCount}
                  onChange={handleChange1}
                >
                   { DisCount?.data.map((ye, key)=>{
                        return <MenuItem key={key} onClick={event => handleClick2(event, key)} value={ye.discountName}>{ye.discountName}</MenuItem>
                      })}
                </Select>
              </FormControl>
              </> 
              }
              <TextField size="small" sx={{maxWidth: '150px'}} id="outlined-basic" name="studentName" onChange={formik.handleChange} value={formik.values.studentName} label="Student Name" variant="outlined" />
              <TextField size="small" sx={{maxWidth: '150px'}} id="outlined-basic" name="balance" onChange={formik.handleChange} value={formik.values.balance} label="Balance" variant="outlined" />
              <Button variant="contained" size="large" type="submit" sx={{color: '#fff'}}>
                Search
              </Button>
            </Box>
            {/* <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                marginBottom: "20px",
                flexWrap: "wrap",
                gap: "15px",
              }}
            >
              {tagbar.map((va) => (
                <Button
                  variant="outlined"
                  name={va.id}
                  value={va.label}
                  onClick={handleClick}
                >
                  {va.label}
                </Button>
              ))}
            </Box> */}
            <Table
              setCurrentid={setCurrentid}
              columns={headvalue}
              rows={studentView}
              setHeaderid={setHeaderid}
              tagbar={tagbar}
              handleClick={handleClick}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              headvalue={headvalue}
            />
          </div>
      </Tablebox>
    </>
  );
};

export default Bus;
