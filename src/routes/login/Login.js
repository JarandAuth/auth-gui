import React from "react";
import {Container, Grid, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import LoginContainer from "../../components/login/LoginContainer";

function Login() {
    const {t} = useTranslation("common");

    return <Container maxWidth="sm">
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4" align="center">{t("login.title")}</Typography>
            </Grid>
            <Grid item xs={12}>
                <LoginContainer/>
            </Grid>
        </Grid>
    </Container>;
}

export default Login;
