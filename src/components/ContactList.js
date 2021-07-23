import {
  Box,
  Button,
  Container,
  Divider,
  Fab,
  Fade,
  Grid,
  makeStyles,
  Modal,
  TextField,
  Typography,
  useTheme,
  Zoom
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ContactListItem from "./ContactListItem";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export const ContactList = () => {
  const classes = useStyles();
  const [contacts, setContacts] = useState([]);
  const [open, setOpen] = useState(false);
  const [tempFirstName, setTempFirstName] = useState("");
  const [tempLastName, setTempLastName] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [tempId, setTempId] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const modalRef = useRef();

  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const handleOpen = (id) => {
    setTempId(id);
    editHandler(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenAdd = () => {
    setTempEmail("");
    setTempFirstName("");
    setTempLastName("");
    setTempId("");
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const editHandler = (id) => {
    const tempContact = contacts.find((contact) => contact.id === id);
    setTempEmail(tempContact.email);
    setTempFirstName(tempContact.first_name);
    setTempLastName(tempContact.last_name);
  };

  const deleteHandler = (id) => {
    const tempContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(tempContacts);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setContacts((contacts) =>
      contacts.map((contact) =>
        contact.id === tempId
          ? {
              ...contact,
              first_name: tempFirstName,
              last_name: tempLastName,
              email: tempEmail,
            }
          : contact
      )
    );
    setTempEmail("");
    setTempFirstName("");
    setTempLastName("");
    setTempId("");
    handleClose();
  };

  const submitAddContactHandler = (e) => {
    e.preventDefault();
    setContacts((contacts) => {
      return [
        ...contacts,
        {
          id: Math.floor(Math.random() * 100),
          first_name: tempFirstName,
          last_name: tempLastName,
          email: tempEmail,
          avatar:
            "https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png",
        },
      ];
    });
    setTempEmail("");
    setTempFirstName("");
    setTempLastName("");
    setTempId("");
    handleCloseAdd();
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios(`https://reqres.in/api/users`);
      setContacts(data.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        ref={modalRef}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Edit Profile</h2>
            <p id="transition-modal-description">
              You can edit any topic on your profile.
            </p>
            <form onSubmit={submitHandler} autoComplete="off">
              <div>
                <TextField
                  label="Firstname"
                  helperText="Edit Firstname"
                  fullWidth
                  autoComplete="off"
                  value={tempFirstName}
                  onChange={(e) => setTempFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <TextField
                  label="Lastname"
                  helperText="Edit Lastname"
                  fullWidth
                  autoComplete="off"
                  value={tempLastName}
                  onChange={(e) => setTempLastName(e.target.value)}
                  required
                />
              </div>
              <div>
                <TextField
                  label="Email"
                  helperText="Edit Email"
                  fullWidth
                  autoComplete="off"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  required
                />
              </div>

              <Grid>
                <Box marginTop={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: "10px" }}
                    type="submit"
                  >
                    Change
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </form>
          </div>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openAdd}
        ref={modalRef}
        onClose={handleCloseAdd}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openAdd}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Add Profile</h2>
            <p id="transition-modal-description">
              You can add a new profile on this project.
            </p>
            <form onSubmit={submitAddContactHandler} autoComplete="off">
              <div>
                <TextField
                  label="Firstname"
                  helperText="Edit Firstname"
                  fullWidth
                  autoComplete="off"
                  value={tempFirstName}
                  onChange={(e) => setTempFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <TextField
                  label="Lastname"
                  helperText="Edit Lastname"
                  fullWidth
                  autoComplete="off"
                  value={tempLastName}
                  onChange={(e) => setTempLastName(e.target.value)}
                  required
                />
              </div>
              <div>
                <TextField
                  label="Email"
                  helperText="Edit Email"
                  fullWidth
                  autoComplete="off"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  required
                />
              </div>

              <Grid>
                <Box marginTop={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: "10px" }}
                    type="submit"
                  >
                    Change
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleCloseAdd}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </form>
          </div>
        </Fade>
      </Modal>

      {contacts.length === 0 && (
        <Container maxWidth="lg">
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box width="100%" marginTop={5}>
              <Typography variant="h3" align="center">
                Arkus Practical Exercise
              </Typography>
              <Divider variant="fullWidth" />
            </Box>

            <Box width="100%" marginTop={5}>
              <Typography variant="h3" align="center">
                Loading...
              </Typography>
              <Divider variant="fullWidth" />
            </Box>
          </Grid>
        </Container>
      )}

      {contacts.length > 0 && (
        <Container maxWidth="lg">
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box width="100%" marginTop={5}>
              <Typography variant="h3" align="center">
                Arkus Practical Exercise
              </Typography>
              <Divider variant="fullWidth" />
            </Box>

            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              {contacts.map((contact) => (
                <ContactListItem
                  key={contact.id}
                  {...contact}
                  handleOpen={handleOpen}
                  deleteHandler={deleteHandler}
                />
              ))}
            </Grid>
          </Grid>

          <Zoom key="blue" in={1} timeout={transitionDuration} unmountOnExit>
            <Fab
              aria-label="Add"
              className={classes.fab}
              color="primary"
              onClick={handleOpenAdd}
            >
              <AddIcon />
            </Fab>
          </Zoom>
        </Container>
      )}
    </>
  );
};
