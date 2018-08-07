import 'bootstrap';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import '../css/peld.css';
import '../css/resizer.css';
import React from "react";
import ReactDOM from "react-dom";
import FleetDisplay from "./fleetdisplay";
import FleetStats from "./fleetstats";
import Alert from "./alert";
import io from 'socket.io-client';
import SplitPane from "react-split-pane/index.js";
import Pane from "react-split-pane/lib/Pane.js";
import { Scrollbars } from 'react-custom-scrollbars';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
library.add(faStar)
library.add(faTimes)
library.add(faCaretDown)
library.add(faCaretRight)

var socket = io();

socket.on('reconnect', (attemptNumber) => {
  socket.emit('register_fleet_handler');
});

export { socket };

const content = (
  <SplitPane split="vertical">
    <Pane initialSize="25%" maxSize="49%">
      <Scrollbars autoHide={true} autoHideDuration={500} renderThumbVertical={props => <div {...props} className="custom-scroll-vertical"/>} >
        <FleetDisplay />
      </Scrollbars>
    </Pane>
    <Pane>other stuff here</Pane>
    <Pane initialSize="25%" maxSize="49%">
      <Scrollbars autoHide={true} autoHideDuration={500} renderThumbVertical={props => <div {...props} className="custom-scroll-vertical"/>} >
        <FleetStats />
      </Scrollbars>
    </Pane>
  </SplitPane>
);

ReactDOM.render(content, document.getElementById("content"));
ReactDOM.render(<Alert />, document.getElementById("error"))

import '../css/unhide.css';