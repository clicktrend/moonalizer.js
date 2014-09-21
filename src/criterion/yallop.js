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

function Yallop (algorithm) {
  this.init(algorithm);
}

Yallop.prototype = new Criterion();
Yallop.prototype.constructor = Yallop;

Yallop.prototype.calculate = function (date, lat, lon) {

  var data = this.algorithm.getBestTime(date, lat, lon);
  
  date = data.date;
  
  var sunPos = this.algorithm.getSunPosition(date, lat, lon);
  //var sunAzimuth = 180 + rad2deg(sunPos.azimuth);
  //var sunAltitude = rad2deg(sunPos.altitude);

  var moonPos = this.algorithm.getMoonPosition(date, lat, lon);
  //var moonAzimuth = 180 + rad2deg(moonPos.azimuth);
  //var moonAltitude = rad2deg(moonPos.altitude);

  var DAZ = Math.abs(sunPos.azimuth - moonPos.azimuth);
  var ARCV = Math.abs(moonPos.altitude - sunPos.altitude);

  var ARCL = 0;
  if (ARCV > 22) {
    ARCL = Math.acos(Math.cos(DAZ) * Math.cos(ARCV));
  } else {
    ARCL = Math.sqrt((DAZ * DAZ) + (ARCV * ARCV));
  }
  
  var illumination = 0.5 * (1 - Math.cos(ARCL));
  
  var W = 11950 * illumination / moonPos.distance;

  var q = (ARCV - (11.8371 - (6.3226 * W) + (0.7319 * (W * W)) - (0.1018 * (W * W * W)))) / 10;

  var code = this.getCode(q);

  var values = {
    date: date,
    code: code,
    sunset: data.sunset,
    moonset: data.moonset,
    daz: DAZ,
    arcv: ARCV,
    arcl: ARCL,
    moon_azimuth: moonPos.azimuth,
    moon_altitude: moonPos.altitude,
    sun_azimuth: sunPos.azimuth,
    sun_altitude: sunPos.altitude
  };

  return values;
};

Yallop.prototype.getCode = function (q) {
  if (q > 0.216) {
    return 'A';
  } else if (0.216 >= q && q > -0.014) {
    return 'B';
  } else if (-0.014 >= q && q > -0.160) {
    return 'C';
  } else if (-0.160 >= q && q > -0.232) {
    return 'D';
  } else if (-0.232 >= q && q > -0.293) {
    return 'E';
  } else if (-0.293 >= q) {
    return 'F';
  } else {
    return 'G';
  }
};

