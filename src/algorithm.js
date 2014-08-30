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

var Algorithm = function () {
  this.init();
};

Algorithm.prototype.init = function (model) {
  if(typeof model !== 'undefined') {
    this.model = model;
  }
};

Algorithm.prototype.getSunset = function (date, lat, lon) {};
Algorithm.prototype.getMoonset = function (date, lat, lon) {};

Algorithm.prototype.getSunPosition = function (date, lat, lon) {};
Algorithm.prototype.getMoonPosition = function (date, lat, lon) {};

Algorithm.prototype.getBestTime = function (date, lat, lon) {};