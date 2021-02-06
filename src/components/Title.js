import {Container, Typography} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    title: {
        backgroundColor: "#ffeddd",
        paddingTop: 50,
        paddingBottom: 50,
        marginBottom: 10
    }
}));

const Title = ({title}) => {
    const classes = useStyles();

    return <div className={classes.title}>
        <Container>
            <Typography variant="h3" align="center">{title}</Typography>
        </Container>
    </div>;
};

export default Title;
