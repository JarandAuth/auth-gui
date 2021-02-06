import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import {Delete, KeyboardArrowRight} from "@material-ui/icons";
import {useTranslation} from "react-i18next";
import {List} from "@material-ui/core";

function AppsList({apps}) {
    const {t} = useTranslation("common");

    return <List>
        {apps.map(app => <ListItem key={app.clientId}>
            <ListItemIcon>
                <KeyboardArrowRight/>
            </ListItemIcon>
            <ListItemText
                primary={app.name}
                secondary={`${t("apps.authorized")} ${new Date(app.authorizedTime).toLocaleString()}`}
            />
            <ListItemSecondaryAction>
                <IconButton id={app.clientId} edge="end" aria-label="delete">
                    <Delete/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>)}
    </List>;
}

export default AppsList;
