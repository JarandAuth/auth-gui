import React from "react";
import {useHistory} from "react-router-dom";
import {Grid, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useTranslation} from "react-i18next";
import {registerUser} from "../../services/registerUserService";

function RegisterUser({onRegister}) {
    const {t} = useTranslation("common");
    const history = useHistory();

    const [credentials, setCredentials] = React.useState({email: "", password: "", confirmedPassword: ""});
    const [fieldErrors, setFieldErrors] = React.useState({});

    const handleCredentialsChange = event => {
        setCredentials({...credentials, [event.target.id]: event.target.value});
    };

    const handleSubmit = async event => {
        event.preventDefault();

        setFieldErrors({});

        const response = await registerUser(credentials);

        if (response.errors) {
            setFieldErrors({
                email: response.errors["email"],
                password: response.errors["password"],
                confirmedPassword: response.errors["confirmedPassword"]
            });
            return;
        }

        onRegister(response);
    };

    const handleLogin = () => {
        history.push("/login");
    };

    return <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField id="email" type="email" label={t("register.email")} variant="outlined" fullWidth={true}
                           value={credentials.email} onChange={handleCredentialsChange}
                           error={fieldErrors.email !== undefined}
                           helperText={t(fieldErrors.email)}/>
            </Grid>
            <Grid item xs={12}>
                <TextField id="password" type="password" label={t("register.password")} variant="outlined"
                           fullWidth={true}
                           value={credentials.password} onChange={handleCredentialsChange}
                           error={fieldErrors.password !== undefined}
                           helperText={t(fieldErrors.password)}/>
            </Grid>
            <Grid item xs={12}>
                <TextField id="confirmedPassword" type="password" label={t("register.confirm-password")}
                           variant="outlined" fullWidth={true}
                           value={credentials.confirmedPassword} onChange={handleCredentialsChange}
                           error={fieldErrors.confirmedPassword !== undefined}
                           helperText={t(fieldErrors.confirmedPassword)}/>
            </Grid>
            <Grid item xs={12}>
                <Button type="submit" color="primary" size="large" variant="contained" fullWidth={true}>
                    {t("register.register")}
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Button variant="outlined" color="primary" onClick={handleLogin}>{t("register.login")}</Button>
            </Grid>
        </Grid>
    </form>;
}

export default RegisterUser;
