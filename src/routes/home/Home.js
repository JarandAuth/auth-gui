import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Button, Card, CardActions, CardContent, Container, List, ListItem, ListItemText, Typography} from "@material-ui/core";
import {logout} from "../../services/logoutService";
import {checkTokenData} from "../../services/tokenDataService";

function Home() {
    const history = useHistory();
    const {t} = useTranslation("common");

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
        checkTokenData().then(response => {
            if (response.email) {
                setData(response);
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
        return <Container maxWidth="sm">
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2">{t("home.welcome-prefix")} <b>{data.email}</b></Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="body1" component="p">{t("home.logged-in")}</Typography>
                </CardContent>
                <CardContent>
                    <List>
                        {data.scopes.map(scope => <ListItem key={scope}><ListItemText primary={scope} secondary={t([`home.scope.${scope}`, "home.scope.unknown"])}/></ListItem>)}
                    </List>
                </CardContent>
                <CardActions>
                    <Button variant="outlined" color="secondary" onClick={handleLogout}>{t("home.logout")}</Button>
                </CardActions>
            </Card>
        </Container>;
    } else {
        return <Typography variant="h6" align="center">{t("global.loading")}</Typography>;
    }
}

export default Home;
