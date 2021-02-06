import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {checkTokenData} from "../../services/tokenDataService";
import {Typography} from "@material-ui/core";
import RegisterUser from "./RegisterUser";
import RegisterTotp from "./RegisterTotp";

function RegisterContainer() {
    const history = useHistory();
    const {t} = useTranslation("common");

    const [isLoading, setLoading] = useState(true);
    const [registeredData, setRegisteredData] = useState(null);

    useEffect(() => {
        checkTokenData().then(response => {
            if (response.email) {
                history.push("/");
            } else {
                setLoading(false);
            }
        });
    }, [history]);

    const handleRegisterUser = registeredData => setRegisteredData({
        registeredToken: registeredData.registeredToken,
        qrCodeUrl: registeredData.qrCodeUrl,
        totpSecretKey: registeredData.totpSecretKey
    });

    const handleRegisterTotp = () => history.push("/");

    if (!isLoading) {
        return <div>
            {!registeredData && <RegisterUser onRegister={handleRegisterUser}/>}
            {registeredData && <RegisterTotp registeredData={registeredData} onRegister={handleRegisterTotp}/>}
        </div>;
    } else {
        return <Typography variant="h6" align="center">{t("global.loading")}</Typography>;
    }
}

export default RegisterContainer;
