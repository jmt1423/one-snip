#!/usr/bin/env node
import React from 'react';
// import {render} from 'ink';
import App from './app.js';
import {withFullScreen} from 'fullscreen-ink';

withFullScreen(<App />).start();
