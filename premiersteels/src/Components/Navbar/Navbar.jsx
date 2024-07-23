import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { HashLink as Link } from 'react-router-hash-link';
import { BrowserRouter } from 'react-router-dom';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Products', 'Location', "Clients"];

function NavBar() {

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [appBarBg, setAppBarBg] = React.useState('transparent');

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setAppBarBg('black')
    }
    else {
      setAppBarBg('transparent')
    }
  };

  window.addEventListener('scroll', handleScroll)

  const scrollWithOffset = (el) => {
    const yOffset = -50; // Adjust the offset value based on your fixed header height
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: yCoordinate, behavior: 'smooth' });
  };




  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Premier Steels
      </Typography>
      <Divider />
      <List>
      {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText>
                <Link to={`#${item}`} smooth style={{ textDecoration: 'none', color: 'inherit' }} scroll={el => scrollWithOffset(el)}>
                  {item}
                </Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window.document.body;

  return (

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" position="fixed" sx={{ backgroundColor: appBarBg, boxShadow: 'none', borderBottom: 'none' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Premier Steels
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                <Link to={`#${item}`} smooth style={{ textDecoration: 'none', color: 'inherit' }} scroll={el => scrollWithOffset(el)}>
                  {item}
                </Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
 
  );
}



export default NavBar;
