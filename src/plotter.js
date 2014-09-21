//--------------------- Copyright Block ----------------------
/*
Moonalizer.js

Copyright (C) 2014 moonalizer.com

Developer: Kadir Yücel
Company: Click Trend Media GmbH clicktrend-media.com
License: GNU LGPL v3.0

TERMS OF USE:
Permission is granted to use this code, with or
without modification, in any website or application
provided that credit is given to the original work
with a link back to moonalizer.com.

This program is distributed in the hope that it will
be useful, but WITHOUT ANY WARRANTY.

PLEASE DO NOT REMOVE THIS COPYRIGHT BLOCK.

*/ 

function Plotter (calculator, date, coords, hooks) {

  this.counter = 0;
  this.operations = coords.length;
  this.codes = {};

  this.resetCodes = function () {
    this.codes = {
      A: {},
      B: {},
      C: {},
      D: {},
      E: {},
      F: {}
    };
  };
  
  this.resetCodes();

  this.calculateAsync = function () {

    this.resetCodes();
    this.asyncStartTimer = new Date();
    this.counter = 0;
    window.setTimeout(this.doAsyncWork(), 0);

  };

  this.doAsyncWork = function () {

    if (this.counter >= this.operations) {

      this.asyncStopTimer = new Date() - this.asyncStartTimer;
      hooks.jobDone(this);

      return;
    }

    hooks.jobRunning(this);

    for (var i = 0; i < 10; i++) {
      if (this.counter >= this.operations)
        break;

      if (coords[this.counter]) {

        var latlon = coords[this.counter];

        var c = calculator.calculate(date, latlon.lat, latlon.lon);

        if (typeof coords[this.counter - 1] !== 'undefined' && latlon.lat !== coords[this.counter - 1].lat) {
          hooks.jobLatitudeDone(this);
        }
        
        if (c.code !== 'G' && typeof this.codes[c.code] !== 'undefined') {
          if (typeof this.codes[c.code][latlon.lat] === 'undefined') {
	this.codes[c.code][latlon.lat] = [];
          }

          this.codes[c.code][latlon.lat].push(latlon.lon);
        }
      }

      this.counter++;
    }

    window.setTimeout(this.doAsyncWork.bind(this), 0);
  };
}