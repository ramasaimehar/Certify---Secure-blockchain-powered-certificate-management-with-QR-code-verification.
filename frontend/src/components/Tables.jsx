import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress'; 
import axios from 'axios';
import './Table.css'; 

const Tables = () => {
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true); 
    try {
      const response = await axios.get('https://certificate-generation-verification.onrender.com/api/admin/certificates');
      setTable(response.data); 
    } catch (error) {
      setError('Error fetching data'); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []); 

  const uploadData = async (newData) => {
    try {
      await axios.post('http://localhost:5000/api/admin/upload', newData);
      fetchData(); 
    } catch (error) {
      console.error("Error uploading data", error); 
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'certificateId', headerName: 'Certificate ID', width: 200 },
    { field: 'studentName', headerName: 'Student Name', width: 200 },
    { field: 'Domain', headerName: 'Internship Domain', width: 200 },
    { field: 'startDate', headerName: 'Start Date', width: 150 },
    { field: 'endDate', headerName: 'End Date', width: 150 },
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
          <CircularProgress />
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
              backgroundColor: 'light-blue', 
            },
            '& .MuiDataGrid-cell': {
              fontSize: '20px',
              marginLeft: '50px',
              padding: '10px 2px', 
              color: 'white'
            },
            '& .MuiDataGrid-cell:hover': {
              transform: 'scale(1.05)', // Slightly increase size of the cell
              zIndex: 1, // Bring the cell to the front
              backgroundColor: '#f5f5f5', // Optional: Change cell background on hover
              transition: 'transform 0.2s ease, background-color 0.2s ease', // Smooth transition
            },
            '& .MuiDataGrid-columnHeaders': {
              display: 'flex',
              justifyContent: 'space-evenly',
              fontSize: '20px',
              paddingLeft: '50px',
            },
            '& .MuiDataGrid-footerContainer': {
              color: 'white', // Changes pagination text color to white
              backgroundColor: '#121212', // Optional: Dark background for pagination
            },
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              color: 'white', // Pagination label and displayed rows color
            },
           
            '& .MuiTablePagination-actions button': {
              color: 'white', // Pagination button colors
            },
            '& .MuiDataGrid-columnHeader:nth-child(3)': { marginLeft: 5 },
            '& .MuiDataGrid-columnHeader:nth-child(4)': { marginLeft: 6 },
            '& .MuiDataGrid-columnHeader:nth-child(5)': { marginLeft: 6 },
            '& .MuiDataGrid-columnHeader:nth-child(6)': { marginLeft: 4 },
            '& .MuiDataGrid-columnHeader:nth-child(7)': { marginLeft: 6 },
            '& .MuiDataGrid-columnHeader:nth-child(8)': { marginLeft: 6 },
          }}
        />
      )}
    </Box>
  );
};

export default Tables;
