import React from "react";
import {useTranslation} from "react-i18next";
import {Grid, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import {registerTotp} from "../../services/registerTotpService";

function RegisterTotp({registeredData, onRegister}) {
    const {t} = useTranslation("common");

    const [credentials, setCredentials] = React.useState({code: ""});
    const [fieldErrors, setFieldErrors] = React.useState({});

    const handleCredentialsChange = event => {
        setCredentials({...credentials, [event.target.id]: event.target.value});
    };

    const handleSubmit = async event => {
        event.preventDefault();

        setFieldErrors({});

        const response = await registerTotp(credentials, registeredData.registeredToken);
        if (response.errors) {
            setFieldErrors({
                global: response.errors["global"],
                code: response.errors["code"]
            });
        }

        onRegister();
    };

    return <form onSubmit={handleSubmit}>
        <Grid container spacing={3} alignContent="center">
            <Grid item xs={12}>
                <Typography variant="h5">1. {t("register.download-title")}</Typography>
                <Typography variant="body1">{t("register.download-desc")}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5">2. {t("register.qr-title")}</Typography>
                <Typography variant="body1">{t("register.qr-desc")}</Typography>
                <img src={registeredData.qrCodeUrl} alt={t("register.qr-image-alt")}/>
                <Typography variant="body1">
                    {t("register.secret-prefix")}<b>{registeredData.totpSecretKey}</b> {t("register.secret-suffix")}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5">3. {t("register.verify-title")}</Typography>
                <Typography variant="body1">{t("register.verify-desc")}</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField id="code" type="text" label={t("register.code")} variant="outlined" fullWidth={true}
                           value={credentials.code} onChange={handleCredentialsChange}
                           error={fieldErrors.code !== undefined} helperText={t(fieldErrors.code)}/>
            </Grid>
            <Grid item xs={12}>
                <Button type="submit" color="primary" size="large" variant="contained" fullWidth={true}>
                    {t("register.verify-code")}
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

export default RegisterTotp;
