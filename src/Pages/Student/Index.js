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
    minWidth: 100,
    align: "center",
    actiontype: [{ view: true, edit: true, delete: true }],
  },
  { id: "studentId", label: "Student Id", align: "center", minWidth: 100 },
  { id: "name", align: "center", label: "Student Name", minWidth: 100 },
  // { id: "mobileNumber", align: "center", label: "Mobile Number", minWidth: 100, },
  // { id: "adharNumber", align: "center", label: "Aadhaar Number", minWidth: 100, },
  // { id: "email", align: "center", label: "Email", minWidth: 100 },
  // { id: "dob", align: "center", label: "DOB", minWidth: 100 },
  // { id: "className", align: "center", label: "Class Name", minWidth: 100 },
  // { id: "sectionName", align: "center", label: "Section Name", minWidth: 100 },
];

const tableHeader = [
  { id: "mobileNumber", label: "Mobile Number" },
  { id: "adharNumber", label: "Aadhaar Number" },
  { id: "email", label: "Email" },
  { id: "dob", label: "DOB" },
  { id: "className", label: "Class Name" },
  { id: "sectionName", label: "Section Name" },
  { id: "discountName", label: "Discount Name" },
  { id: "feesToBePaid", label: "Fees To Be Paid" },
  { id: "totalFeesPaid", label: "Total Paid Fees" },
];

const Tablebox = styled("div")(({ theme }) => ({
  marginTop: 80,
  marginLeft: 80,
  padding: theme.spacing(0, 3),
}));

const Bus = ({
  year,
  setYear,
  vchange,
  setVchange,
  currentId,
  setCurrentid,
}) => {
  const student = useSelector((state) => state.student);
  const className = useSelector((state)=> state.classs);
  const DisCount = useSelector((state)=> state.discount);
  const dispatch = useDispatch();

  const [view, setView] = useState(false);

  const studentView = student.data.map((v) => {
    return { ...v, dob: `${v.dob[2]}-${v.dob[1]}-${v.dob[0]}` };
  });

  const batchYear = useSelector((state) => state.year);

  const top100Films = batchYear?.data.map((ye) => {
    return ye.batchYear;
  });

  useEffect(() => {
    if (student.successMessage) {
      toast(student.Message, { position: toast.POSITION.BOTTOM_RIGHT });
    }
  }, [student]);

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

  const tabelCol = headvalue.filter((va) => va.id !== headerid);

  const tabelView = tagbar.filter((va) => va.id !== tablerow.id);
  const tableView2 = tableHeader.filter((va) => va.id === headerid);

  const [discount, setDiscount] = useState({disCount: ''});

  const handleChange1 = (e) =>{
      setDiscount({disCount: e.target.value})
  }

  useEffect(() => {
    setHeadvalue(tabelCol);
    setTagbar([...tagbar, tableView2[0]]);
    // setHeaderid(null);
  }, [headerid]);

  const handleClick = (e) => {
    setTablerow({
      id: e.target.name,
      label: e.target.value,
      align: "center",
      minWidth: 100,
      closeIcon: true,
    });
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
      formik.setFieldValue('batch', year)
  },[discount])

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
      // dispatch(postStudent(values));
      dispatch(getStudent(values));
      console.log("searchValue", values);
      setDiscount({disCount: ''});
      formik.resetForm();
      // dispatch(loading(true));
    },
  });

  return (
    <>
      <Tablebox>
        {view ? (
          <Viewstudent
            setView={setView}
            setCurrentid={setCurrentid}
            currentId={currentId}
            year={year}
          ></Viewstudent>
        ) : (
          <div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                flexWrap: "wrap",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "600" }}>
                Students
              </Typography>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                sx={{ width: 300 }}
                value={top100Films ? year : null}
                onChange={(event, value) => {
                  setYear(value);
                  setVchange(!vchange);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Select Year" />
                )}
              />
              <Adddata year={year} button="Add Student"></Adddata>
            </Box>
            <Box
             component="form"
             noValidate
             autoComplete="off"
             onSubmit={formik.handleSubmit}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                marginBottom: "20px",
                flexWrap: "wrap",
                gap: "15px",
              }}
            >
              <TextField sx={{maxWidth: '150px'}} type="number" id="outlined-basic" name="size" onChange={formik.handleChange} value={formik.values.size} label="Size" variant="outlined" />
              <TextField sx={{maxWidth: '150px'}} type="number" id="outlined-basic" name="page" onChange={formik.handleChange} value={formik.values.page} label="Page" variant="outlined" />
              <FormControl sx={{minWidth: '150px'}}>
                <InputLabel id="demo-simple-select-label">Paid</InputLabel>
                <Select
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
              <FormControl sx={{minWidth: '150px'}}>
                <InputLabel id="demo-simple-select-label">Class Name</InputLabel>
                <Select
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
                <InputLabel id="demo-simple-select-label">Section Name</InputLabel>
                <Select
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
              <TextField sx={{maxWidth: '150px'}} id="outlined-basic" name="studentName" onChange={formik.handleChange} value={formik.values.studentName} label="Student Name" variant="outlined" />
              <FormControl sx={{minWidth: '150px'}}>
                <InputLabel id="demo-simple-select-label">Discount Name</InputLabel>
                <Select
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
              <TextField sx={{maxWidth: '150px'}} id="outlined-basic" name="balance" onChange={formik.handleChange} value={formik.values.balance} label="Balance" variant="outlined" />
              <Button variant="contained" size="large" type="submit" sx={{color: '#fff'}}>
                Search
              </Button>
            </Box>
            <Box
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
            </Box>
            <Table
              setCurrentid={setCurrentid}
              columns={headvalue}
              rows={studentView}
              setHeaderid={setHeaderid}
              setView={setView}
            />
          </div>
        )}
      </Tablebox>
    </>
  );
};

export default Bus;
