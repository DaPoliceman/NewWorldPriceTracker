import { Alert } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const AlertBar = ({errorMessage, openErrorMessage, setOpenErrorMessage}) => {
  return (
      <Box sx={{ width: '100%' }}>
        <Collapse in={openErrorMessage}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenErrorMessage();
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {errorMessage}
          </Alert>
        </Collapse>
      </Box>
    );
}

export default AlertBar
