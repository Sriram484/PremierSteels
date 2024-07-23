import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import './Footer.css'; // Make sure to create and import your CSS file

const Footer = () => {
  return (
    <div className='footer'>
      <div className='container'>
        <div className='footer-content'>
          <div className='Footer-Title'>
            Premier Steels & Co
          </div>
          <div className='Footer-Icons'>
            <ul>
              <li className='Instagram'><InstagramIcon /></li>
              <li className='Twitter'><TwitterIcon /></li>
              <li className='Facebook'><FacebookIcon /></li>
              <li className='LinkedIn'><LinkedInIcon /></li>
              <li className='Website'><LanguageIcon /></li>
            </ul>
          </div>
        </div>
        <div className='bottom'>
          <span className='line'></span>
          <p>2020 Execute, Inc. All rights reserved</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
