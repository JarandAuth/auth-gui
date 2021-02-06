import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import LoginFactorOne from "./LoginFactorOne";
import LoginFactorTwo from "./LoginFactorTwo";
import {checkTokenData} from "../../services/tokenDataService";
import {Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";

function LoginContainer() {
    const history = useHistory();
    const location = useLocation();

    const {t} = useTranslation("common");

    const [isLoading, setLoading] = useState(true);
    const [basicToken, setBasicToken] = useState();
    const [redirect, setRedirect] = useState(null);

    useEffect(() => {
        checkTokenData().then(response => {
            if (response.email) {
                history.push("/");
            } else {
                const encodedRedirect = new URLSearchParams(location.search).get("redirect");
                if (encodedRedirect) {
                    setRedirect(decodeURIComponent(encodedRedirect));
                }
                setLoading(false);
            }
        });
    }, [history, location]);

    const handleLoginFactorOne = basicToken => setBasicToken(basicToken);

    const handleLoginFactorTwo = () => {
        if (redirect) {
            history.push(redirect);
        } else {
            history.push("/");
        }
    };

    if (!isLoading) {
        return <div>
            {!basicToken && <LoginFactorOne onLogin={handleLoginFactorOne}/>}
            {basicToken && <LoginFactorTwo basicToken={basicToken} onLogin={handleLoginFactorTwo}/>}
        </div>;
    } else {
        return <Typography variant="h6" align="center">{t("global.loading")}</Typography>;
    }
}

export default LoginContainer;
