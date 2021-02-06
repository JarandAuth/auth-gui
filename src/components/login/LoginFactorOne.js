import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import Alert from "@material-ui/lab/Alert";
import {useTranslation} from "react-i18next";
import {loginFactorOne} from "../../services/loginFactorOneService";
import {useHistory} from "react-router-dom";

function LoginFactorOne({onLogin}) {
    const history = useHistory();
    const {t} = useTranslation("common");

    const [credentials, setCredentials] = useState({email: "", password: ""});
    const [fieldErrors, setFieldErrors] = useState({});

    const handleCredentialsChange = event => {
        setCredentials({...credentials, [event.target.id]: event.target.value});
    };

    const handleSubmit = async event => {
        event.preventDefault();

        setFieldErrors({});

        const response = await loginFactorOne(credentials);

        if (response.errors) {
            setFieldErrors({
                email: response.errors["email"],
                password: response.errors["password"],
                global: response.errors["global"]
            });
            return;
        }

        onLogin(response.basicToken);
    };

    const handleRegister = () => {
        history.push("/register");
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField id="email" type="email" label={t("login.email")} variant="outlined" fullWidth={true}
                               value={credentials.email} onChange={handleCredentialsChange}
                               error={fieldErrors.email !== undefined} helperText={t(fieldErrors.email)}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField id="password" type="password" label={t("login.password")} variant="outlined"
                               fullWidth={true}
                               value={credentials.password} onChange={handleCredentialsChange}
                               error={fieldErrors.password !== undefined} helperText={t(fieldErrors.password)}/>
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" color="primary" size="large" variant="contained" fullWidth={true}>
                        {t("login.login")}
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Alert severity="error" className={!fieldErrors.global ? "Hide" : ""}>
                        {t(fieldErrors.global)}
                    </Alert>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="outlined" color="primary"
                            onClick={handleRegister}>{t("login.register-user")}</Button>
                </Grid>
            </Grid>
        </form>);
}

export default LoginFactorOne;
