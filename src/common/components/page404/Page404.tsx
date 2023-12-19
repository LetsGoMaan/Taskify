import React from 'react'
import notFound from 'assets/400.svg'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import {SuperButton} from "common/components/super-button/SuperButton";

export const Page404 = () => {
    const navigate = useNavigate()
    const goBack = () => navigate('/')

    return (
        <Grid
            container
            height={'100vh'}
            spacing={5}
            margin={'0 auto'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Grid item sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Grid item>
                    <Box component={'span'} sx={{ fontSize: '50px', fontWeight: '600' }}>
                        Oops!
                    </Box>
                </Grid>
                <Grid item>
                    <Typography>Sorry! Page not Found!</Typography>
                </Grid>
                <Grid item>
                    <SuperButton name={'Go back!'} callback={goBack} />
                </Grid>
            </Grid>
            <Grid item>
                <img src={notFound} alt='Page not found' />
            </Grid>
        </Grid>
    )
}
