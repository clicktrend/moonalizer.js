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

var createDiyanet = function (algorithm) {
  if (algorithm instanceof Algorithm) {
    return new Diyanet(new algorithm());
  } else {
    return new Diyanet(new SunCalcWrap());
  }
};

var createYallop = function (algorithm) {
  if (algorithm instanceof Algorithm) {
    return new Yallop(new algorithm());
  } else {
    return new Yallop(new SunCalcWrap());
  }
};

var CriterionFactory = {
  create: function (criterion, algorithm) {
    if (criterion === 'diyanet') {
      return createDiyanet(algorithm);
    } else if (criterion === 'yallop') {
      return createYallop(algorithm);
    } else {
      return createYallop(algorithm);
    }
  }
};