import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress'; 
import axios from 'axios';
import "../Table.css";

const Admintable = () => {
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://certificate-generation-verification-83ig.vercel.app/api/adminroute/get_login');
      setTable(response.data);
      console.log(response.data);
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'username', headerName: 'username', width: 200 },
    { field: 'email', headerName: 'Email ID', width: 250 }
  ];

  return (
      <Box
        sx={{
          height: 1000,
          minWidth: '80%',
          borderRadius: '8px',
          border: "0px",
          overflow: 'auto',
        }}
      >
        {loading ? (
          <div className="loader">
            <CircularProgress color="primary" />
          </div>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <DataGrid
            rows={table.map((row, index) => ({ ...row, id: index }))}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 55,
                },
              },
            }}
            pageSizeOptions={[55]}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              '& .MuiDataGrid-row:hover': {
                // Add hover styles if needed
              },
              '& .MuiDataGrid-cell': {
                fontSize: '20px',
                marginLeft: '50px',
                padding: '10px 2px',
                color: 'white'
              },
              '& .MuiDataGrid-columnHeaders': {
                display: 'flex',
                justifyContent: 'space-evenly',
                fontSize: '20px',
                paddingLeft: '30px',
              },
              '& .MuiDataGrid-columnHeader': { 
                marginRight: 6 
              },
              '& .MuiDataGrid-footerContainer': {
                color: 'black', // Changes pagination text color to white
                backgroundColor: 'white', // Optional: Dark background for pagination
              },
              '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                // color: 'white', // Pagination label and displayed rows color
              },
              '& .MuiSvgIcon-root': {
                color: 'black', // Pagination arrows color
              },
              '& .MuiTablePagination-actions button': {
                color: 'black', // Pagination button colors
              },
            }}
          />
        )}
      </Box>
  );
};

export default Admintable;
