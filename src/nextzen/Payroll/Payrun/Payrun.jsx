import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Grid from '@mui/material/Grid';
import InfoIcon from '@mui/icons-material/Info';
import Paper from '@mui/material/Paper';
import { Route } from 'react-router';

function Payrun( {handleCreatePayrun} ) {
  const shapeStyles = {
    bgcolor: 'primary.main',
    width: 80,
    height: 40,
    padding: '10px',
    textAlign: 'center',
  };
  const shapeCircleStyles = { borderRadius: '50%' };
  const rectangle = <Box component="span" sx={shapeStyles} />;
  return (
    <Card sx={{ minWidth: 275, border: '2px solid #E7DADA', borderLeft: 'none' }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {/* Heading Text */}
          <Grid item xs={4}>
            <Typography style={{ color: '#000000', fontWeight: 700, fontSize: '21px' }}>
              Process Pay Run For Monthly
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography style={{ color: '#222222', fontWeight: 400 }}>
              01 OCT 2022 to 31 Oct 2018
            </Typography>
          </Grid>

          {/* Badge */}
          <Grid item xs={4} container justifyContent="flex-start">
            {/* <Box style={{backgroundColor:"#007AFF"}}>
            <Typography>
                    Ready
                </Typography>
            </Box> */}
            <Badge color="secondary">
              <Box component="span" sx={shapeStyles}>
                <Typography style={{ color: '#FFFFFF' }}>Ready</Typography>
              </Box>
            </Badge>
            {/* <Paper elevation={0} style={{ padding: '10px', width: '150px', textAlign: 'center' }}>
      <Typography variant="body1" color="textPrimary">
        Ready
      </Typography>
    </Paper> */}
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {/* Heading Text */}

          <Grid item xs={3}>
            <Grid container direction="column" spacing={2}>
              {/* Heading Text */}
              <Grid item>
                <Typography style={{ color: '#7D7878' }}>EMPLOYEE`S NET PAY</Typography>
              </Grid>
              <Grid item>
                <Typography style={{ color: '#000000' }}>YET TO PROCESS</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container direction="column" spacing={2}>
              {/* Heading Text */}
              <Grid item>
                <Typography style={{ color: '#7D7878' }}>PAYMENT DATE</Typography>
              </Grid>
              <Grid item>
                <Typography style={{ color: '#000000' }}>03 NOV 2022</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container direction="column" spacing={2}>
              {/* Heading Text */}
              <Grid item>
                <Typography style={{ color: '#7D7878' }}>NO.OF EMPLOYEES</Typography>
              </Grid>
              <Grid item>
                <Typography style={{ color: '#000000' }}>501</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Badge */}
          <Grid item xs={3} container justifyContent="flex-start">
            <Button
              style={{ backgroundColor: '#007AFF', color: 'white' }}
              onClick={handleCreatePayrun}
            >
              Create Pay Run
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      <CardContent style={{ display: 'flex' }}>
        <InfoIcon style={{ color: '#7D7878', marginRight: '7px' }} />
        <Typography style={{ color: '#7D7878' }}>
          You haven&apos;t processed this pay run and it&apos;s past the pay day
        </Typography>
      </CardContent>
    </Card>
  );
}
Payrun.propTypes = {
  handleCreatePayrun: PropTypes.func.isRequired,
};
export default Payrun;
