import React from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import './navbar.css';
import { deepOrange, deepPurple } from '@mui/material/colors';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



const Navbar=()=>{
    return (
        <>
        <div className="coo">
        <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Item>Home</Item>
        <Item>Status</Item>
        <Item>Profile</Item>
      </Stack>
        <Stack direction="row" spacing={2}>
       
        <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
      </Stack>
      </div>
      </>
    );
}
export default Navbar;