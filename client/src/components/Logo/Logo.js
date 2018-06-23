import React, { Component } from 'react';
import "./Logo.css";

import Grid from '@material-ui/core/Grid';

const Logo = () => (
    <Grid container direction="row" alignItems="center" justify="center">
        <Grid item>
        <h1 id="speakIT">SpeakIT</h1>
        </Grid>
    </Grid>
)

export default Logo;