import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { green } from '@mui/material/colors';

const columns = [
  { id: 'S.No', label: 'S.No', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 100 },
  // {
  //   id: 'price_per_meter',
  //   label: 'Price per meter',
  //   minWidth: 170,
  //   align: 'left',
  // },
  {
    id: 'availability',
    label: 'Availabiliy',
    minWidth: 170,
    align: 'left',

  },
  // {
  //   id: 'image',
  //   label: 'image',
  //   minWidth: 170,
  //   align: 'left',

  // },
];
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#42b883",//theme.palette.common.black
    color: theme.palette.common.white,
  },
}));



export default function ProductTable1({ products, userTypingData }) {
  const [filteredProducts, setFilteredProducts] = React.useState([]);

  React.useEffect(() => {
    setFilteredProducts(addSerialNumbers(products));
  }, [products]);

  React.useEffect(() => {
    const filtered = products.filter(product => {
      const productName = (product.name || '').toLowerCase();
      const searchInput = (userTypingData || '').toLowerCase();
      const pricePerMeter = product.price_per_meter || 0;

      return productName.includes(searchInput) || pricePerMeter == searchInput;
    });
    if (filtered.length > 0) {
      setFilteredProducts(addSerialNumbers(filtered));

    }
    else {
      const temp = [{
        "S.No": "#",
        name: "",
        "price_per_meter": "#",
        categoryType: "None",
        name: "No Data",
        availability: "#",
        image: "#"
      }]
      setFilteredProducts(temp)
    }
  }, [products, userTypingData]);

  const addSerialNumbers = (products) => {
    // Sort the products array based on the name property
    // const sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name));
    const sortedProducts = products.sort((a, b) => {
      // Extract numeric values near "mm" in the name property
      const numA = parseInt(a.name.match(/(\d+(\.\d+)?)\s*mm/i));
      const numB = parseInt(b.name.match(/(\d+(\.\d+)?)\s*mm/i));
      return numA - numB;
    });

    // Map over the sorted array and add the serial numbers
    return sortedProducts.map((product, index) => ({
      ...product,
      'S.No': index + 1
    }));
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', minHeight: "80vh" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ backgroundColor: "black", color: "white" }}>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredProducts
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];

                      let textColor = 'inherit'; // Default text color
                      if (column.id === 'availability') {
                        console.log(column);
                        // Check availability and set text color accordingly
                        if (value === 'In Stock') {
                          textColor = 'green';
                        }
                        else if (value == 'Not Available') {
                          textColor = 'red';
                        }
                        else {
                          textColor = 'inherit';
                        }

                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'image' ? (
                            <img src='https://firebasestorage.googleapis.com/v0/b/chatrayans.appspot.com/o/Steels%2Fhard.jpeg?alt=media&token=1768e733-f334-4bdd-b59e-bf15ce67af35' alt={`Image ${row.name}`} style={{ width: '100px', height: 'auto' }} />
                          ) : (
                            <span style={{ color: textColor }}>{value}</span>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

    </Paper>
  );
}