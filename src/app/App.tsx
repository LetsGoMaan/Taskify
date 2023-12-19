import React from 'react';
import {ButtonAppBar, ErrorSnackbar} from "common/components";
import {AppLoader, Main} from "app/components";


const App = () => {

    return (
        <>
            <ButtonAppBar/>
            <AppLoader/>
            <Main/>
            <ErrorSnackbar/>
        </>

    );
}
export default App;
