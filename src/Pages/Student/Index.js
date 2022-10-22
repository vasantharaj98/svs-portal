import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "../../Components/Table/Table";
import Adddata from "./Addstudent";
import Viewstudent from "./ViewStudent";
import { Box, Typography, Autocomplete, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const columns = [
  { id: "studentId", label: "Student Id", minWidth: 100 },
  { id: "name", align: "center", label: "Student Name", minWidth: 100 },
  {
    id: "mobileNumber",
    align: "center",
    label: "Mobile Number",
    minWidth: 100,
  },
  {
    id: "adharNumber",
    align: "center",
    label: "Aadhaar Number",
    minWidth: 100,
  },
  { id: "email", align: "center", label: "Email", minWidth: 100 },
  { id: "dob", align: "center", label: "DOB", minWidth: 100 },
  { id: "className", align: "center", label: "Class Name", minWidth: 100 },
  { id: "sectionName", align: "center", label: "Section Name", minWidth: 100 },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "center",
    actiontype: [{ view: true, edit: true, delete: true }],
  },
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
            <Table
              setCurrentid={setCurrentid}
              columns={columns}
              rows={studentView}
              setView={setView}
            />
          </div>
        )}
      </Tablebox>
    </>
  );
};

export default Bus;
