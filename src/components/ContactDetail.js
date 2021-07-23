import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { React } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    width: 300,
    [theme.breakpoints.down("md")]: {
      maxWidth: 350,
    },
  },
  media: {
    height: 540,
  },
}));

export const ContactDetail = ({ history, location }) => {
  console.log("ContactDetail-Location", location);
  const classes = useStyles();

  const { email, first_name, last_name, avatar } = location?.aboutProps;

  const goBackHandler = () => {
    history.goBack();
  };

  return (
    <>
      <Container maxWidth="lg">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid container justifyContent="center" alignItems="center">
            <Box width="100%">
              <Typography variant="h3" align="center">
                {first_name} {last_name}
              </Typography>
              <Divider variant="fullWidth" />
            </Box>
          </Grid>

          <Grid container justifyContent="center" alignItems="center">
            <Box marginTop={4} boxShadow={5}>
              <Card className={classes.root}>
                <CardContent>
                  <img src={avatar} alt={`${first_name}`} width="100%" />
                </CardContent>
              </Card>
            </Box>
          </Grid>

          <Box marginTop={4} width="100%">
            <Divider
              variant="fullWidth"
              style={{ marginTop: "10px", marginBottom: "15px" }}
            />
            <Typography variant="h5" align="center">
              Email: {email}
            </Typography>
          </Box>

          <Box
            justifyContent="center"
            alignItems="center"
            marginTop={2}
            marginX="auto"
          >
            <Button color="primary" variant="contained" onClick={goBackHandler}>
              Go Back
            </Button>
          </Box>
        </Grid>
      </Container>
    </>
  );
};
