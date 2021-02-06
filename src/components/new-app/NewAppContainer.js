import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {getAppName} from "../../services/appService";
import AuthorizeForm from "./authorize-form/AuthorizeForm";
import {checkTokenData} from "../../services/tokenDataService";

function NewAppContainer() {
    const {t} = useTranslation("common");
    const history = useHistory();
    const location = useLocation();

    const [isLoading, setLoading] = useState(true);
    const [app, setApp] = useState(null);

    useEffect(() => {
        checkTokenData().then(response => {
            if (!response.email) {
                const redirectTarget = encodeURIComponent(`${location.pathname}${location.search}`);
                history.push(`/login?redirect=${redirectTarget}`);
                return;
            }
            const urlParams = new URLSearchParams(location.search);
            const clientId = urlParams.get("client_id");
            const redirectUri = urlParams.get("redirect_uri");
            const scopeId = urlParams.get("scope");
            getAppName(clientId).then(response => {
                if (!response) {
                    history.push("/oauth-error?error=invalid-client-id");
                    return;
                }
                setApp({
                    clientId: clientId,
                    name: response.name,
                    redirectUri: redirectUri,
                    scopeId: scopeId
                });
                setLoading(false);
            });
        });
    }, [history, location]);

    if (!isLoading) {
        return <AuthorizeForm app={app}/>;
    } else {
        return <Typography variant="h6" align="center">{t("global.loading")}</Typography>;
    }
}

export default NewAppContainer;
