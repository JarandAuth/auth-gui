import React from "react";
import {Container, Grid, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import AppsContainer from "../../components/apps/AppsContainer";

function Apps() {
    const {t} = useTranslation("common");

    return <Container maxWidth="sm">
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4" align="center">{t("apps.title")}</Typography>
            </Grid>
            <Grid item xs={12}>
                <AppsContainer/>
            </Grid>
        </Grid>
    </Container>;
}

export default Apps;
