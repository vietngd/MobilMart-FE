import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";
import Loading from "../Loading/LoadingComponent";

const TableComponent = (props) => {
  const {
    dataProp = [],
    columns = [],
    isLoading = false,
    maxHeight = 800,
    showPagination = true,
  } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Loading isLoading={isLoading}>
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: maxHeight,
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "6px",
              height: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#E5E7EB",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#C6C6C6",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#888",
            },
          }}
        >
          <Table sx={{ minWidth: 450 }} aria-label="data table" stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    align={column.align || "left"}
                    sx={{
                      backgroundColor: "#f4f4f4",
                      fontWeight: "bold",
                      padding: 2,
                    }}
                  >
                    {column.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataProp
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    sx={{
                      "&:hover": { backgroundColor: "#fafafa" },
                      cursor: "pointer",
                    }}
                    onClick={() => props.onRow && props.onRow(row)}
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={column.key}
                        align={column.align || "left"}
                        sx={{ padding: 2 }}
                      >
                        {column.render
                          ? column.render(row)
                          : row[column.dataIndex]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {showPagination && (
            <TablePagination
              rowsPerPageOptions={[10, 20, 50]}
              component="div"
              count={dataProp.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ borderTop: "1px solid #e0e0e0" }}
            />
          )}
        </TableContainer>
      </Loading>
    </div>
  );
};

export default TableComponent;
