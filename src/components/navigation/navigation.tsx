import React from "react";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

export default () => (
  <AppBar position="sticky" color="inherit">
    <Toolbar>
      <IconButton edge="start" color="default">
        <MenuIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
);
