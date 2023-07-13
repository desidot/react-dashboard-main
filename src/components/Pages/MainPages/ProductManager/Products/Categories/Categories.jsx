import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Categories.css";
import ProductImage from "../../../../../../assets/products/spray-product.jpg";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  Pagination,
  Checkbox,
  Button,
  IconButton,
  Menu,
  FormControlLabel,
  styled,
  Switch,
} from "@mui/material";
import {
  MoreVertOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import FunctionPopup from "./FunctionPopup";
const Categories = () => {
  function createData(srNo, name, expdate, Supplier) {
    return { srNo, name, expdate, Supplier };
  }

  const rows = [
    createData(
      1,
      "Sample Product Description 180 caps",
      "Jul 13 2023",
      "Product Name Here"
    ),
    createData(
      2,
      "Sample Product Description 180 caps",
      "Jul 13 2023",
      "Product Name Here"
    ),
    createData(
      3,
      "Sample Product Description 180 caps",
      "Jul 13 2023",
      "Product Name Here"
    ),
  ];

  const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [openFunctionPopup, setOpenFunctionPopup] = useState(false);

  const handleOpenFunctionPopup = () => {
    setOpenFunctionPopup(true);
    handleMenuClose();
  };

  // const handleClosePopup = () => {
  //   setOpenFunctionPopup(false);
  // };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setPage(1);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  };

  const handleMenuOpen = (event, id) => {
    setOpenMenuId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setOpenMenuId(null);
    setAnchorEl(null);
  };

  const handleCheckboxChange = (event, srNo) => {
    const isChecked = event.target.checked;
    setSelectedRows((prevSelectedRows) => {
      if (isChecked) {
        return [...prevSelectedRows, srNo];
      } else {
        return prevSelectedRows.filter((row) => row !== srNo);
      }
    });
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(filteredRows.map((row) => row.srNo));
    } else {
      setSelectedRows([]);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  const filteredRows = rows.filter((row) => {
    const nameMatch = row.name.toLowerCase().includes(searchText.toLowerCase());
    const expdateMatch = row.expdate
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const supplierMatch = row.Supplier.toLowerCase().includes(
      searchText.toLowerCase()
    );
    return nameMatch || expdateMatch || supplierMatch;
  });

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedRows = filteredRows.slice(startIndex, endIndex);

  const pageCount = Math.ceil(filteredRows.length / rowsPerPage);

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">All Categories</h3>
          <div className="copy-button">
            <Link to="/testDashboard/ProductManager/Products/add-categories">
              <Button variant="contained">Add New</Button>
            </Link>
          </div>
        </div>
        <div className="main-body2">
          {/* Search and Nos */}
          <div className="searchAndNosBlogs">
            <div className="nos">
              Show <span className="spaces"></span>
              <Select
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                label="Rows per page"
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
              <span className="spaces"></span> entries
            </div>
            <div className="search-inventory">
              <div className="search-in-table">
                <OutlinedInput
                  sx={{
                    "& legend": { display: "none" },
                    "& fieldset": { top: 0 },
                  }}
                  value={searchText}
                  onChange={handleSearchChange}
                  id="outlined-adornment-weight"
                  endAdornment={
                    <InputAdornment position="start">Search...</InputAdornment>
                  }
                />
              </div>
            </div>
          </div>
          {/* Search and Nos END */}

          <TableContainer
            component={Paper}
            style={{ boxShadow: "gray" }}
            id="tableContainer"
          >
            {/* Table */}
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    <Checkbox
                      checked={selectedRows.length === displayedRows.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    Category Name
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    Category Code / HSN Code
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    Parent
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    Thumbnail
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    Banner
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    Status
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody align="center">
                {displayedRows.map((row) => (
                  <TableRow key={row.srNo}>
                    <TableCell align="center">
                      <Checkbox
                        checked={selectedRows.includes(row.srNo)}
                        onChange={(event) =>
                          handleCheckboxChange(event, row.srNo)
                        }
                      />
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.expdate}</TableCell>
                    <TableCell align="center">{row.Supplier}</TableCell>
                    <TableCell align="center">
                      <div className="blog-img">
                        <img src={ProductImage} alt="ProductImage" />
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div className="blog-img">
                        <img src={ProductImage} alt="ProductImage" />
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <FormControlLabel
                        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={(event) => handleMenuOpen(event, row.srNo)}
                        size="small"
                      >
                        <MoreVertOutlined />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={openMenuId === row.srNo}
                        onClose={handleMenuClose}
                        PaperProps={{
                          style: {
                            maxHeight: 120,
                          },
                        }}
                      >
                        <MenuItem onClick={handleMenuClose}>
                          <EditOutlined sx={{ marginRight: 1 }} />
                          Edit
                        </MenuItem>

                        <MenuItem onClick={handleOpenFunctionPopup}>
                          <ToggleOffOutlinedIcon sx={{ marginRight: 1 }} />
                          Function
                        </MenuItem>

                        <MenuItem onClick={handleMenuClose}>
                          <DeleteOutlined sx={{ marginRight: 1 }} />
                          Delete
                        </MenuItem>
                      </Menu>
                      {/* Function kPopup */}

                      {openFunctionPopup && (
                        <FunctionPopup
                          onSave={() => {
                            // Perform any necessary action with the staff note value
                            console.log();

                            // Hide the popup
                            setOpenFunctionPopup(false);
                          }}
                          onCancel={() => setOpenFunctionPopup(false)}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Table End */}

          {/* Pagination */}
          <div>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              className="pagination-style"
              style={{
                display: "flex",
                padding: "1rem",
                justifyContent: "right",
              }}
            />
          </div>
          {/* Pagination END */}
        </div>
      </div>
    </>
  );
};

export default Categories;
