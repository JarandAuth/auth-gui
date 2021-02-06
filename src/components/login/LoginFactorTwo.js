import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import Alert from "@material-ui/lab/Alert";
import {useTranslation} from "react-i18next";
import {loginFactorTwo} from "../../services/loginFactorTwoService";
import {Typography} from "@material-ui/core";

function LoginFactorTwo({basicToken, onLogin}) {
    const {t} = useTranslation("common");

    const [credentials, setCredentials] = useState({code: ""});
    const [fieldErrors, setFieldErrors] = useState({});

    const handleCredentialsChange = event => {
        setCredentials({...credentials, [event.target.id]: event.target.value});
    };

    const handleSubmit = async event => {
        event.preventDefault();

        setFieldErrors({});

        const response = await loginFactorTwo(credentials, basicToken);

        if (response.errors) {
            setFieldErrors({
                code: response.errors["code"],
                global: response.errors["global"]
            });
            return;
        }

        onLogin();
    };

    return <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="body1" align="center">{t("login.two-factor-desc")}</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField id="code" type="code" label={t("login.code")} variant="outlined" fullWidth={true}
                           value={credentials.code} onChange={handleCredentialsChange}
                           error={fieldErrors.code !== undefined} helperText={t(fieldErrors.code)}/>
            </Grid>
            <Grid item xs={12}>
                <Button type="submit" color="primary" size="large" variant="contained" fullWidth={true}>
                    {t("login.verify-code")}
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Alert severity="error" className={!fieldErrors.global ? "Hide" : ""}>
                    {t(fieldErrors.global)}
                </Alert>
            </Grid>
        </Grid>
    </form>;
}

export default LoginFactorTwo;
