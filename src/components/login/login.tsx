import React from "react";
import logo from "./ursa-logo.svg";
import bg from "./cyberpunk-bg.jpg";
import { useGlobalState } from "../../store/context";
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
} from "@material-ui/core";

type Props = {
  onConnect?: () => void;
  onCreate?: () => void;
};

export default ({ onConnect, onCreate }: Props) => {
  const [user, setUser] = useGlobalState("user");
  const [password, setPassword] = useGlobalState("password");
  const [visible] = useGlobalState("login");

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{
        minHeight: "93vh",
        backgroundImage: `linear-gradient(to bottom, rgba(30,30,69, .3), rgba(30,30,69, 1) ), url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <Grid item>
        <Card variant="elevation" style={{ minWidth: "350px" }}>
          <CardContent style={{ display: "flex", flexDirection: "column" }}>
            <img src={logo} />
            <Typography
              align="center"
              color="textPrimary"
              display="block"
              variant="h3"
            >
              URSAMU
            </Typography>
            <Typography
              align="center"
              color="textSecondary"
              display="block"
              variant="subtitle1"
              gutterBottom={true}
            >
              A Modern MUSH Server
            </Typography>

            <TextField variant="filled" label="Character" />
            <br />
            <TextField variant="filled" label="Password" type="password" />
          </CardContent>

          <CardActions>
            <Button onClick={onConnect}>Connect</Button>
            <Button onClick={onCreate}>Create</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};
