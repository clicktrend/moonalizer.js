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

var SunCalcWrap = function() {
  this.init(SunCalc);
};

SunCalcWrap.prototype = new Algorithm();
SunCalcWrap.prototype.constructor = SunCalcWrap;

SunCalcWrap.prototype.getSunset = function (date, lat, lon) {
  var sunTimes = this.model.getTimes(date, lat, lon);
  return sunTimes.sunset;
};
SunCalcWrap.prototype.getMoonset = function (date, lat, lon) {
  var moonSet = this.model.getMoonTimes(date, lat, lon);
  return moonSet.set;
};

SunCalcWrap.prototype.getSunPosition = function (date, lat, lon) {
  return this.model.getPosition(date, lat, lon);
};
SunCalcWrap.prototype.getMoonPosition = function (date, lat, lon) {
  return this.model.getMoonPosition(date, lat, lon);
};

SunCalcWrap.prototype.getBestTime = function (date, lat, lon) {
  date = moment.utc(date);
  var dateNext = moment.utc(date).add('days', 1);

  // SUNCALC
  var sunSet = this.getSunset(date.toDate(), lat, lon);
  var moonSet = this.getMoonset(date.toDate(), lat, lon);
  var moonSetNext = this.getMoonset(dateNext.toDate(), lat, lon);

  if (!angular.isDefined(moonSet)) {
    moonSet = moonSetNext;
  }

  if (!moment.utc(sunSet).isSame(moment.utc(moonSet), 'days')) {
    moonSet = moonSetNext;
  }

  var LAG = moment.utc(moonSet).diff(moment.utc(sunSet), 'minutes', true);

  // TODO
  if (LAG < -1100) {
    moonSet = moonSetNext;
    LAG = moment.utc(moonSet).diff(moment.utc(sunSet), 'minutes', true);
  }

  return {
    date: moment.utc(sunSet).add('minutes', (4 / 9) * LAG).toDate(),
    sunset: sunSet,
    moonset: moonSet,
    lag: LAG
  };
};