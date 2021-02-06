import React, {useEffect, useState} from "react";
import {checkTokenData} from "../../services/tokenDataService";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Typography} from "@material-ui/core";

function Home() {
    const history = useHistory();
    const {t} = useTranslation("common");

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

    if (!isLoading) {
        return <div>
            <Typography variant="h5" align="center">{t("home.logged-in-as")} <b>{email}</b></Typography>
        </div>;
    } else {
        return <Typography variant="h6" align="center">{t("global.loading")}</Typography>;
    }
}

export default Home;
