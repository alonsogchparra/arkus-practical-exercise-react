import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import { Link, withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: 300,
      height: "100%",
    },
    maxWidth: 345,
    height: "100%",
  },
  media: {
    height: 150,
  },
}));

const ContactListItem = ({
  id,
  email,
  first_name,
  last_name,
  avatar,
  handleOpen,
  deleteHandler
}) => {
  const classes = useStyles();

  return (
    <div>
      <Grid item>
        <Box m={2} boxShadow={5}>
          <Card className={clsx(classes.root)} style={{ height: "100%" }}>
            <CardActionArea>
              <Link
                to={{
                  pathname: `/contact/${id}`,
                  aboutProps: {
                    email,
                    first_name,
                    last_name,
                    avatar,
                  },
                }}
              >
                <CardMedia
                  className={classes.media}
                  image={avatar}
                  title={first_name}
                />

                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {first_name} {last_name}
                  </Typography>
                  <Typography noWrap>{email}</Typography>
                </CardContent>
              </Link>
              <Divider />
            </CardActionArea>

            <CardActions style={{ paddingTop: "10px", paddingBottom: "10px" }}>
              <Grid container direction="row" justifyContent="space-around">
                <Button size="small" variant="contained" color="primary" onClick={() => handleOpen(id)}>
                  Edit
                </Button>
                <Button size="small" variant="contained" color="secondary" onClick={() => deleteHandler(id)}>
                  Delete
                </Button>
              </Grid>
            </CardActions>
          </Card>
        </Box>
      </Grid>
    </div>
  );
};

export default withRouter(ContactListItem);
