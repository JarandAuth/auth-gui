import React from "react";
import {useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Grid, Typography} from "@material-ui/core";

function OAuthError() {
    const {t} = useTranslation("common");
    const location = useLocation();
    const error = new URLSearchParams(location.search).get("error");

    return <Grid container spacing={3}>
        <Grid item xs={12}>
            <Typography variant="h4" align="center">{t(`oauth-error.title`)}</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="body1" align="center">{t(`oauth-error.${error}`)}</Typography>
        </Grid>
    </Grid>;

}

export default OAuthError;
