import React from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import {Controller, SubmitHandler} from "react-hook-form";
import {Navigate} from "react-router-dom";
import { useAppForm} from "common/hooks";
import { useAuth } from "./hooks";
import { LoginRequestData } from 'api';


export const Login = () => {
    const {handleSubmit, reset, errors, control, register} = useAppForm(["email", "password"])
    const {isLoggedIn, login} = useAuth()
    const onSubmit: SubmitHandler<LoginRequestData> = (data) => {
        login(data)
        reset()
    }

    if(isLoggedIn) {
        return <Navigate to={'/'} />
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl sx={{minWidth: '350px'}}>
                <FormLabel>
                    <p>Log in or registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'} rel={'noreferrer'}> here
                        </a>
                    </p>
                    <p>Use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <FormGroup>
                            <TextField {...register('email')}
                                       label="Email"
                                       margin="normal"
                                       error={!!errors.email}
                                       helperText={errors.email?.message}
                                       size={'small'}
                            />

                        <TextField {...register('password')}
                                   type="password"
                                   error={!!errors.password}
                                   helperText={errors.password?.message}
                                   label="Password"
                                   margin="normal"
                                   size={'small'}
                        />
                    <Controller
                        name={'rememberMe'}
                        control={control}
                        render={ ({field}) =>
                            <FormControlLabel {...field} label={'Remember me'} control={<Checkbox/>}/>}
                    />
                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                        Login
                    </Button>
                </FormGroup>
            </FormControl>
        </form>
    );
};

