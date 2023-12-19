import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {useAuth} from "features/auth/hooks/useAuth";
import {SuperButton} from "common/components";


export const ButtonAppBar = () => {
    const {isLoggedIn, logout} = useAuth()
    const onLogoutHandler =  () => {
        logout()
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{backgroundColor: '#423d3d'}}>
                <Toolbar sx={{justifyContent: 'flex-end'}}>
                    {isLoggedIn && <SuperButton name={'Logout'} callback={onLogoutHandler}/>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
