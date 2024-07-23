import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { InputLabel } from '@mui/material';
import "./Product-Buttons.css"

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


export default function ProductButton({ userTypingData, setUserTypingData, selectOption = "Rough Steel", setSelectedOption, options }) {
    const theme = useTheme();


    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const handleSearchChange = (event) => {
        setUserTypingData(event.target.value);
        console.log(event.target.value);
    };

    const renderValue = (selected) => {
        if (selected === '') {
            return 'Select Category';
        }
        return selected;
    };
    const [isVisible, setIsVisible] = React.useState(false);

    const handleClose = () => {
        setIsVisible(false);
    };
    const handleOpen = () => {
        setIsVisible(true);
    };

    return (
        <>
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
                            <MenuItem key={option} value={option} sx={{ display: "flex", justifyContent: "space-between",alignItems:"center" }}>
                                <div style={{minWidth:"190px"}}>
                                    {option}
                                </div>
                                <div className='container'>
                                    <div className='image-container' style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
                                        <div className='image'>
                                            <img src="https://firebasestorage.googleapis.com/v0/b/chatrayans.appspot.com/o/Steels%2Fhard.jpeg?alt=media&token=1768e733-f334-4bdd-b59e-bf15ce67af35"
                                                alt="" onClick={handleOpen} />
                                        </div>
                                    </div>


                                </div>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {isVisible && (
                    <div className='popup-image'>
                        <span onClick={handleClose} >&times;</span>
                        <img src="https://firebasestorage.googleapis.com/v0/b/chatrayans.appspot.com/o/Steels%2Fhard.jpeg?alt=media&token=1768e733-f334-4bdd-b59e-bf15ce67af35"
                            alt="" />
                    </div>)
                }

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
        </>

    );
}