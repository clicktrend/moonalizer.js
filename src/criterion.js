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

var Criterion = function(algorithm) {
  this.init(algorithm);
};

Criterion.prototype.init = function (algorithm) {
  this.algorithm = algorithm;
};

Criterion.prototype.setAlgorithm = function (algorithm) {
  this.algorithm = algorithm;
};

Criterion.prototype.getCode = function (values) {};

Criterion.prototype.calculate = function (date, lat, lon) {
  console.log("implement criterion");
};

Criterion.prototype.calculateAtBestTime = function (date, lat, lon) {
  this.date = moment.utc(this.algorithm.getBestTime(date, lat, lon));
  return this.calculate(lat, lon);
};

Criterion.prototype.calculateAtSunset = function (date, lat, lon) {
  this.date = moment.utc(this.algorithm.getSunset(date, lat, lon));
  return this.calculate(lat, lon);
};

Criterion.prototype.calculateAtSunBelowFiveDegree = function (date, lat, lon) {
  console.log("implement criterion");
};
