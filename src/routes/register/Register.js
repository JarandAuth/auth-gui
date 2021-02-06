import React from "react";
import {Container, Grid, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import RegisterContainer from "../../components/register/RegisterContainer";

function Register() {
    const {t} = useTranslation("common");

    return <Container maxWidth="sm">
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4" align="center">{t("register.title")}</Typography>
            </Grid>
            <Grid item xs={12}>
                <RegisterContainer/>
            </Grid>
        </Grid>
    </Container>;
}

export default Register;
