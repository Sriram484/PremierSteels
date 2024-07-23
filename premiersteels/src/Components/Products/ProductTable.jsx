import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import noData from '../../Assets/NoData.png';



function createData(id, Name, Price, Image) {
  return { id, Name, Price, Image };
}

const columns = [
  {
    width: 120,
    label: 'S.No',
    dataKey: 'S.No',
    numeric: true,
  },
  {
    width: 200,
    label: 'Name',
    dataKey: 'diameter',
  },
  {
    width: 120,
    label: 'Price per meter',
    dataKey: 'Price per meter',
    numeric: true,
  },
  {
    width: 120,
    label: 'Image',
    dataKey: 'Image',
    numeric: false,
  },
];



const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};


function fixedHeaderContent() {

  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align="left"
          style={{ width: column.width }}
          sx={{
            backgroundColor: '#72CC7D',
            color:"#ffffff"
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align="left"
     
        >
          {column.dataKey === 'Image' ? (
            row.diameter === 'No Data' ? (
              <img src={noData} alt="No Data" style={{ width: '50px', height: '50px' }} />
            ) : (
              <img src={row[column.dataKey]} alt={row.Name} style={{ width: '100px', height: '100px' }} />
            )
          ) : (
            row[column.dataKey]
          )}

        </TableCell>
      ))}
    </React.Fragment>
  );
}
function ProductTable({ products, userTypingData }) {
  const [filteredProducts, setFilteredProducts] = React.useState([]);

  React.useEffect(() => {
    setFilteredProducts(addSerialNumbers(products));
  }, [products]);

  React.useEffect(() => {
    const filtered = products.filter(product => {
      const productName = (product.diameter || '').toLowerCase(); 
      const searchInput = (userTypingData || '').toLowerCase();
      const pricePerMeter = product["price Per Meter"] || 0; // Default to 0 if pricePerMeter is undefined
  
      return productName.includes(searchInput) || pricePerMeter == searchInput;
    });
  if(filtered.length > 0)
  {
    setFilteredProducts(addSerialNumbers(filtered));
  }
  else{
    const temp = [{
      "S.No":"#",
      Image: "",
      "Price per meter":"#",
      categoryType: "None",
      diameter: "No Data"
    }]
    setFilteredProducts(temp)
  }
  }, [products, userTypingData]);

  const addSerialNumbers = (products) => {
    return products.map((product, index) => ({
      ...product,
      'S.No': index + 1
    }));
  };

  return (
    <Paper style={{ height: "70vh", width: '100%' }}>
      <TableVirtuoso
        data={filteredProducts}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}

export default ProductTable;