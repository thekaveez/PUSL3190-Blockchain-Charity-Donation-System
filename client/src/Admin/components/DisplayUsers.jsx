import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";


import { loader } from "../assets";

const DisplayUsers = ({ isLoading, campaigns, handleDelete }) => {

  const columns = [
    { id: "no", label: "No", minWidth: 170 },
    { id: "owner", label: "Address", minWidth: 170 },
    {
      id: "action",
      label: "Action",
      minWidth: 170,
      align: "right",
    },
  ];

//   const activeCampaigns = campaigns.filter(campaign => campaign.isActive);

  const renderRows = () => {
    if (!isLoading && campaigns.length > 0) {
        
      return campaigns.map((address, index) => (
        <TableRow hover role="checkbox" tabIndex={-1} key={uuidv4()}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{address.value}</TableCell>
          <TableCell align="right">
            <IconButton
              onClick={() => handleDelete(address.value)}
              aria-label="view"
              size="small"
              sx={{ color: "error.main" }}
            >
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ));
    } else {
      return [];
    }
  };

  const navigate = useNavigate();



  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (

      <div>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length}>
                      <div className="flex-row justify-center">
                        <img
                          src={loader}
                          alt="loader"
                          className="w-[100px] h-[100px] object-contain"
                          style={{ margin: "auto" }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  renderRows()
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={campaigns.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>

  );
};

export default DisplayUsers;
