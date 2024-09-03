import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        bgcolor: 'background.paper',
        p: 2,
        textAlign: 'center',
        boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
       <Typography variant="body2" sx={{ color: 'black', fontWeight: 'bold', fontSize: '1.2rem' }}>
        Developed By AstroVedha
      </Typography>
    </Box>
  );
};

export default Footer;
