import React, {useEffect, useState} from "react";
import {checkTokenData} from "../../services/tokenDataService";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Button, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {logout} from "../../services/logoutService";

const useStyles = makeStyles(() => ({
    center: {
        textAlign: "center"
    }
}));

function Home() {
    const history = useHistory();
    const {t} = useTranslation("common");
    const classes = useStyles();

    const [isLoading, setLoading] = useState(true);
    const [email, setEmail] = useState();

    useEffect(() => {
        checkTokenData().then(response => {
            if (response.email) {
                setEmail(response.email);
                setLoading(false);
            } else {
                history.push("/login");
            }
        });
    }, [history]);

    const handleLogout = () => {
        logout().then(() => {
            window.location.reload();
        });
    };

    if (!isLoading) {
        return <Grid container spacing={3}>
            <Grid item xs={12} className={classes.center}>
                <Typography variant="h5">{t("home.logged-in-as")} <b>{email}</b></Typography>
            </Grid>
            <Grid item xs={12} className={classes.center}>
                <Button variant="contained" color="secondary" onClick={handleLogout}>{t("home.logout")}</Button>
            </Grid>
        </Grid>;
    } else {
        return <Typography variant="h6" align="center">{t("global.loading")}</Typography>;
    }
}

export default Home;
