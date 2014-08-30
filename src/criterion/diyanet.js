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

var Diyanet = function(algorithm) {
  this.init(algorithm);
};

Diyanet.prototype = new Criterion();
Diyanet.prototype.constructor = Diyanet;

Diyanet.prototype.getCode = function (values) {
  var code = 'F';
  if(values.ARCL > 8 && values.ALT > 5) {
    code = 'A';
  }
  
  return code;
};

Diyanet.prototype.calculate = function (date, lat, lon) {

  var data = this.algorithm.getBestTime(date, lat, lon);
  
  date = data.date;
  
  var sunPos = this.algorithm.getSunPosition(date, lat, lon);
  var moonPos = this.algorithm.getMoonPosition(date, lat, lon);

  var sunAzimuth = 180 + rad2deg(sunPos.azimuth);
  var sunAltitude = rad2deg(sunPos.altitude);
  var moonAzimuth = 180 + rad2deg(moonPos.azimuth);
  var moonAltitude = rad2deg(moonPos.altitude);
  
  var DAZ = Math.abs(sunAzimuth - moonAzimuth);
  var ARCV = Math.abs(moonAltitude - sunAltitude);

  var ARCL = 0;
  if (ARCV > 22) {
    ARCL = Math.acos(Math.cos(DAZ) * Math.cos(ARCV));
  } else {
    ARCL = Math.sqrt((DAZ * DAZ) + (ARCV * ARCV));
  }
  
  return {
    date: date,
    sunset: data.sunset,
    moonset: data.moonset,
    LAG: data.LAG,
    code: this.getCode({ARCL: ARCL, ALT: moonAltitude}),
    ARCL: ARCL,
    ALT: moonAltitude
  };
};


