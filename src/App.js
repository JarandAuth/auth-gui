import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./routes/home/Home";
import Title from "./components/Title";
import {useTranslation} from "react-i18next";
import Login from "./routes/login/Login";
import "./App.css";
import Register from "./routes/register/Register";
import Apps from "./routes/apps/Apps";
import NewApp from "./routes/apps/new/NewApp";
import OAuthError from "./routes/oauth-error/OAuthError";

function App() {
    const {t} = useTranslation("common");

    return <div>
        <Title title={t("title")}/>
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/login">
                    <Login/>
                </Route>
                <Route exact path="/register">
                    <Register/>
                </Route>
                <Route exact path="/apps">
                    <Apps/>
                </Route>
                <Route exact path="/apps/new">
                    <NewApp/>
                </Route>
                <Route exact path="/oauth-error">
                    <OAuthError/>
                </Route>
            </Switch>
        </Router>
    </div>;
}

export default App;
