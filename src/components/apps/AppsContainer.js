import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import AppsList from "./AppsList";
import {getConnectedApps} from "../../services/connectedAppService";
import {getAppName} from "../../services/appService";

function AppsContainer() {
    const {t} = useTranslation("common");
    const history = useHistory();

    const [isLoading, setLoading] = useState(true);
    const [apps, setApps] = useState(null);

    useEffect(() => {
        getConnectedApps().then(response => {
            if (!response) {
                history.push("/login");
                return;
            }
            Promise.all(response.map(async app => {
                const nameResponse = await getAppName(app.clientId);
                return {...app, name: nameResponse.name};
            })).then(appsWithName => {
                setApps(appsWithName);
                setLoading(false);
            });
        });
    }, [history]);

    if (!isLoading) {
        return <AppsList apps={apps}/>;
    } else {
        return <Typography variant="h6" align="center">{t("global.loading")}</Typography>;
    }
}

export default AppsContainer;
