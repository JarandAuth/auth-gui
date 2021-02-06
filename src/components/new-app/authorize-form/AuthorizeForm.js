import React from "react";
import {Button, Grid, List, ListItem, ListItemIcon, ListItemText, Typography} from "@material-ui/core";
import {KeyboardArrowRight} from "@material-ui/icons";
import {useTranslation} from "react-i18next";

function AuthorizeForm({app}) {
    const {t} = useTranslation("common");

    const handleAuthorize = () => {
        window.location.href = `/api/oauth/authorize?client_id=${app.clientId}&response_type=code&redirect_uri=${app.redirectUri}&scope=${app.scopeId}`;
    };

    const handleCancel = () => {
        window.location.href = app.redirectUri;
    };

    return <Grid container spacing={3}>
        <Grid item xs={12}>
            <Typography variant="body1">{t("new-app.desc")}</Typography>
        </Grid>
        <Grid item xs={12}>
            <List>
                <ListItem key={app.clientId}>
                    <ListItemIcon>
                        <KeyboardArrowRight/>
                    </ListItemIcon>
                    <ListItemText primary={app.name} secondary={`${t("new-app.permission")}: ${app.scopeId}`}/>
                </ListItem>
            </List>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" color="primary" fullWidth onClick={handleAuthorize}>
                        {t("new-app.authorize")}
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" color="secondary" fullWidth onClick={handleCancel}>
                        {t("new-app.cancel")}
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    </Grid>;
}

export default AuthorizeForm;
