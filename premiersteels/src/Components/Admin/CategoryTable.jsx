import * as React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Button } from '@mui/material';
import useFetchCollection from '../Firebase/useFetchCollection';
import { db } from '../Firebase/config';
import { addDoc, deleteField, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore'; // Ensure you import the required functions from Firebase
import CategoryAlert from './CategoryAlert';
import LoginForm from './LoginForm';



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    border: '1px solid #ced4da',

    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
        width: '60vw',
        marginTop: "20px"
    },
    backgroundColor: "#ffffff",
    color: "black"
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


const columns = [
    { id: 'S.No', label: 'S.No', minWidth: 170 },
    { id: 'name', label: 'Name', minWidth: 100 },
    {
        id: 'price_per_meter',
        label: 'Price per meter',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'availability',
        label: 'Availabiliy',
        minWidth: 170,
        align: 'left',

    },
    {
        id: 'image',
        label: 'image',
        minWidth: 170,
        align: 'left',

    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 170,
        align: 'left',

    },
];
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#42b883",//theme.palette.common.black
        color: theme.palette.common.white,
    },
}));

//Function to add serial Number
const addSerialNumbers = (products) => {
    return products.map((product, index) => ({
        ...product
    }));
}




export default function ColumnGroupingTable() {
    const theme = useTheme();

    const { documents: categoryData } = useFetchCollection('Categories');
    const [error, setError] = React.useState(null);

    //Data
    const [options, setOptions] = React.useState([]);
    const [selectOption, setSelectedOption] = useState(options[0] || '');
    const [userTypingData, setUserTypingData] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = React.useState([]);


    //Update 
    const [editModeIndex, setEditModeIndex] = useState(-1);
    const [editedValues, setEditedValues] = useState({});

    //Create array of Options(Category)
    useEffect(() => {

        if (Array.isArray(categoryData) && categoryData.length > 0) {
            const uniqueCategoryTypes = [];
            categoryData.forEach(entry => {
                uniqueCategoryTypes.push(entry.id);
            });
            setOptions(uniqueCategoryTypes);
        }
    }, [categoryData]);


    // //Initial Table Data 
    // useEffect(() => {
    //     if (categoryData && categoryData.length > 0) {
    //         let extractedOptions = [];

    //         categoryData.forEach(category => {
    //             if (category.id === "Rough Category") {
    //                 Object.keys(category).forEach(key => {
    //                     if (key !== 'id') {
    //                         const diameterObject = {
    //                             categoryType: category.id,
    //                             diameter: key,
    //                             ...category[key]
    //                         };
    //                         extractedOptions.push(diameterObject);
    //                     }
    //                 });
    //             }
    //         });

    //         setProducts(extractedOptions);

    //     }

    // }, [categoryData]);


    //Updated Table based on Options
    useEffect(() => {
        updateProduct(categoryData, setProducts, selectOption);
    }, [categoryData, selectOption, setProducts]);

    //Function to update the table(need to move to hook file)
    const updateProduct = (categoryData, setProducts, selectOption) => {
        if (categoryData && categoryData.length > 0) {
            let extractedOptions = [];

            categoryData.forEach(category => {
                if (category.id === selectOption) {
                    Object.keys(category).forEach(key => {
                        if (key !== 'id') {
                            const diameterObject = {
                                categoryType: category.id,
                                ...category[key]
                            };
                            extractedOptions.push(diameterObject);
                        }
                    });
                }
            });

            setProducts(extractedOptions);
        }
    };




    //Search Bar
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const handleSearchChange = (event) => {
        setUserTypingData(event.target.value);
    };

    //?????????
    const renderValue = (selected) => {
        if (selected === '') {
            return 'Select Category';
        }
        return selected;
    };

    //Converting product to filterProducts
    React.useEffect(() => {
        // setFilteredProducts(addSerialNumbers(products));
        setFilteredProducts(products);
    }, [products, editModeIndex]);

    //Filter Based On SearhBar
    React.useEffect(() => {
        const filtered = products.filter(product => {
            const productName = (product.name || '').toLowerCase();
            const searchInput = (userTypingData || '').toLowerCase();
            const pricePerMeter = product.price_per_meter || 0;

            return productName.includes(searchInput) || pricePerMeter == searchInput;
        });
        if (filtered.length > 0) {
            setFilteredProducts(filtered);
            // setFilteredProducts(addSerialNumbers(filtered));
        }
        // else{
        //     setFilteredProducts([
        //         {
        //             serialNumber: "#",
        //             name: "No Data",
        //             price_per_meter: "#",
        //             availability: "#",
        //             image: "#"
        //         }
        //     ]);
        // }

    }, [products, userTypingData]);





    //Delete Field
    const deleteDocumentField = async (product) => {

        try {
            const categoryDocRef = doc(db, 'categories', product.categoryType);

            const delobj = doc(db, 'Categories', product.categoryType);


            await updateDoc(delobj, {
                [product.name]: deleteField()
            });
        } catch (err) {
            console.error('Error deleting field:', err);
            setError(err);
        }
    };

    //Handle Delete Button
    const handleDelete = (index) => {
        const product = filteredProducts[index];

        if (product && product.categoryType && product.name) {
            deleteDocumentField(product);
        } else {
            console.error('Product does not have categoryType or name:', product);
        }
    };




    //Update

    // Update the editedValues state to reflect the changes in input fields
    const handleInputChange = (columnId, value) => {

        setEditedValues(prevState => ({
            ...prevState,
            [columnId]: value
        }));
    };

    //Handle Update Button
    const handleUpdate = (index) => {
        console.log(filteredProducts);
        const productToEdit = { ...filteredProducts[index] };
        setEditedValues(productToEdit);
        setEditModeIndex(index);
    };




    //Handle Save Button 
    const handleSave = async (index) => {
        try {
            const updobj = doc(db, 'Categories', editedValues.categoryType);
            console.log(editedValues);
            console.log(filteredProducts[index]);
            const oldProduct = filteredProducts[index];
            console.log(oldProduct.name, editedValues.name);
            if (oldProduct.name !== editedValues.name) {
                await updateDoc(updobj, {
                    [oldProduct.name]: deleteField()
                });
            }
            await updateDoc(updobj, { [editedValues.name]: editedValues });

            setFilteredProducts(prevProducts =>
                prevProducts.map((product, idx) =>
                    idx === index ? editedValues : product
                )
            );
            setEditModeIndex(-1);
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };

    //Add Category
    const [catOpen, setCatOpen] = React.useState(false);
    const [newCat, setNewCat] = useState('');

    //Handle add category button
    const handleAddCat = async () => {

        if (!newCat.trim()) {
            console.error('Category name cannot be empty.');
            return;
        }

        try {
            const categoryDocRef = doc(db, 'Categories', newCat.trim());
            await setDoc(categoryDocRef, {});

            setNewCat(''); // Clear the input after successful addition
        } catch (error) {
            console.error('Error adding document:', error);
        }

        setCatOpen(false); // Close the dialog after adding the category
    };


    const addRow = async () => {
        // Retrieve the current document to determine the number of items
        const categoryDocRef = doc(db, "Categories", selectOption);
        const categoryDoc = await getDoc(categoryDocRef);
        const productCount = categoryDoc.exists() ? Object.keys(categoryDoc.data()).length : 0;


        const newFieldName = `item${productCount}`;
        const newRow = {
            id: Date.now(),
            name: newFieldName,
            price_per_meter: '99',
            availability: 'In Stock',
            image: '',
            categoryType: selectOption
        };



        // Construct the field name dynamically

        // Update the document with the new item
        await setDoc(categoryDocRef, {
            [newFieldName]: newRow
        }, { merge: true });

        console.log(`Added new row to category: ${selectOption}`);
    };

    // Sign Up Page
    const [userLogin, setUserLogin] = useState(false);

    return (
        <>
            {!userLogin ? (
                <LoginForm setUserLogin={setUserLogin} />
            ) : (
                <>
                    {catOpen && (
                        <CategoryAlert
                            catOpen={catOpen}
                            newCat={newCat}
                            setNewCat={setNewCat}
                            setCatOpen={setCatOpen}
                            handleAddCat={handleAddCat}
                        />
                    )}
                    <div className='Admin-Container'>
                        <div className='Admin-Heading' style={{ display: "flex", justifyContent: "center", "fontSize": "2.75rem", fontFamily: "cursive", margin: "20px" }}>
                            Product Managment
                        </div>
                        <div className='Admin-Button' style={{ margin: "30px" }}>
                            <Box sx={{ display: 'flex', flexDirection: "row", flexWrap: "wrap", justifyContent: 'space-between', alignItems: "center" }}>
                                <FormControl sx={{
                                    minWidth: '15rem',
                                    [theme.breakpoints.down('sm')]: {
                                        width: '60vw',
                                        marginTop: '20px',
                                    },
                                    backgroundColor: "#ffffff",
                                    border: "2px solid black",
                                    color: "black"
                                }}
                                >
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        displayEmpty
                                        value={selectOption}
                                        onChange={handleChange}
                                        renderValue={renderValue}
                                        input={<OutlinedInput />}
                                    >
                                        {options.map(option => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                        <MenuItem value="">
                                            <Button onClick={() => setCatOpen(true)}>
                                                Add Category
                                            </Button>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                                <Button onClick={addRow}>Add Row</Button>

                                <Search
                                    onChange={handleSearchChange}>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{ 'aria-label': 'search' }}
                                        value={userTypingData}
                                        onChange={handleSearchChange}
                                    />
                                </Search >
                            </Box>

                        </div>
                        <div className='Admin Body'>

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
                                            {filteredProducts.map((product, index) => (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                    {columns.map((column) => {
                                                        const value = product[column.id];

                                                        if (column.id === 'action') {
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {editModeIndex === index ? (
                                                                        <>
                                                                            <Button
                                                                                variant="contained"
                                                                                color="primary"
                                                                                onClick={() => handleSave(index)}
                                                                                style={{ marginRight: '8px' }}
                                                                            >
                                                                                Save
                                                                            </Button>
                                                                            <Button
                                                                                variant="contained"
                                                                                color="secondary"
                                                                                onClick={() => setEditModeIndex(-1)}
                                                                            >
                                                                                Cancel
                                                                            </Button>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Button
                                                                                variant="contained"
                                                                                color="primary"
                                                                                onClick={() => handleUpdate(index)}
                                                                                style={{ marginRight: '8px' }}
                                                                            >
                                                                                Update
                                                                            </Button>
                                                                            <Button
                                                                                variant="contained"
                                                                                color="secondary"
                                                                                onClick={() => handleDelete(index)}
                                                                            >
                                                                                Delete
                                                                            </Button>
                                                                        </>
                                                                    )}
                                                                </TableCell>
                                                            );
                                                        }

                                                        if (editModeIndex === index && column.id !== 'S.No') {
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    <input
                                                                        type="text"
                                                                        value={editedValues[column.id] || ''}
                                                                        onChange={(e) => handleInputChange(column.id, e.target.value)}
                                                                    />
                                                                </TableCell>
                                                            );
                                                        }

                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {column.id === 'image' ? (
                                                                    <img
                                                                        src={value}
                                                                        alt={`Image`}
                                                                        style={{ width: '100px', height: 'auto' }}
                                                                    />
                                                                ) : (
                                                                    value
                                                                )}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </Paper>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}