import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Table from '../../Components/Table/Table';
import { theme } from '../../Layouts/Themesetup/index';
import {Box, Button, Typography, Grid} from '@mui/material';
import {ArrowBackIos, AccountCircle} from '@mui/icons-material';


const columns = [
    { id: 'dateOfPayment', label: 'Date Of Payment', minWidth: 100 },
    { id: 'tutionFees',align: 'center', label: 'Tution Fees', minWidth: 100 },
    { id: 'bookFees',align: 'center', label: 'Book Fees', minWidth: 100 },

  ];
const rows=[
  {
  "_id": "631c362affaff2b9aa378436",
  "dateOfPayment": "21-03-2018",
  "tutionFees": "20000",
  "bookFees": "20000",
  },
  {
    "_id": "631c362affaff2b9aa378436",
    "dateOfPayment": "21-03-2018",
    "tutionFees": "20000",
    "bookFees": "20000",
    },
]

const viewStudent = ({setView}) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              onClick={() => setView(false)}
              variant="contained"
              color="lightblack"
              style={{ height: "60px", boxShadow: "unset" }}
            >
              <ArrowBackIos style={{ marginLeft: 5, color: "#000" }} />
            </Button>
            <Typography
              variant="h5"
              sx={{ width: "100%", textAlign: "center" }}
            >
              View Details
            </Typography>
          </div>
          <div style={{ marginTop: 50 }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <AccountCircle sx={{ fontSize: 150 }} />
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
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    AX763536
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
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    Akaash S
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
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    +91 83655436354
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
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    4554 4455 4455 5444
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
                    Address
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    4/87, Peelamedu, Kurukku Street, Coimbatore - 641 013
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </div>
          <div style={{ marginTop: 50, background: '#f1f1f1', padding: 15 }}>
                <Typography variant="h6" >Batch: 2014 - 2015</Typography>
                <Grid container style={{ marginTop: 2 }} spacing={2}>
                <Grid item xs={3}>
                <div>
                  <Typography
                    variant="p"
                    color="secondary"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    Class
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    XII
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
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    A
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
                    Bus Route
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    Coimbatore
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
                    Bus No
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    TN91 AX1546
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <div style={{ marginTop: 15 }}>
            <Table columns={columns} rows={rows} />
            </div>
          </div>
          <div style={{ marginTop: 50, background: '#f1f1f1', padding: 15 }}>
                <Typography variant="h6" >Batch: 2014 - 2015</Typography>
                <Grid container style={{ marginTop: 2 }} spacing={2}>
                <Grid item xs={3}>
                <div>
                  <Typography
                    variant="p"
                    color="secondary"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    Class
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    XII
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
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    A
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
                    Bus Route
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    Coimbatore
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
                    Bus No
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "100%", textAlign: "left" }}
                  >
                    TN91 AX1546
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <div style={{ marginTop: 15 }}>
            <Table columns={columns} rows={rows} />
            </div>
          </div>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default viewStudent;
