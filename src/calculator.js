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
function Calculator (criterion) {

  this.criterion = criterion;

  this.calculate = function (date, lat, lon) {
    return this.criterion.calculate(moment.utc(date).hour(12).toDate(), lat, lon);
  };
  
  this.getCriterion = function () {
    return this.criterion;
  };
  
  this.getAlgorithm = function () {
    return this.criterion.getAlgorithm();
  };
}