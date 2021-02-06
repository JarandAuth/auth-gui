import React from "react";
import {Container, Grid, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import NewAppContainer from "../../../components/new-app/NewAppContainer";

function NewApp() {
    const {t} = useTranslation("common");

    return <Container maxWidth="sm">
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4" align="center">{t("new-app.title")}</Typography>
            </Grid>
            <Grid item xs={12}>
                <NewAppContainer/>
            </Grid>
        </Grid>
    </Container>;
}

export default NewApp;
