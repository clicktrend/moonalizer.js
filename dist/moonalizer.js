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

Algorithm.prototype.getBestTime = function (date, lat, lon) {};;//--------------------- Copyright Block ----------------------
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
  var sunPos = this.model.getPosition(date, lat, lon);
  return {
    azimuth: 180 + rad2deg(sunPos.azimuth), 
    altitude: rad2deg(sunPos.altitude)
  };
};
SunCalcWrap.prototype.getMoonPosition = function (date, lat, lon) {
  var moonPos = this.model.getMoonPosition(date, lat, lon);
  return {
    azimuth: 180 + rad2deg(moonPos.azimuth), 
    altitude: rad2deg(moonPos.altitude),
    distance: moonPos.distance
  };
};
SunCalcWrap.prototype.getMoonPhase = function (date) {
  var illumination = this.model.getMoonIllumination(date);
  return illumination.phase;
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
};;//--------------------- Copyright Block ----------------------
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
};//--------------------- Copyright Block ----------------------
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

/*
Criterion.prototype.setAlgorithm = function (algorithm) {
  this.algorithm = algorithm;
};
*/

Criterion.prototype.getAlgorithm = function () {
  return this.algorithm;
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
;//--------------------- Copyright Block ----------------------
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


;//--------------------- Copyright Block ----------------------
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

;//--------------------- Copyright Block ----------------------
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


var CalculatorFactory = {
  create: function (criterion) {
    return new Calculator(CriterionFactory.create(criterion));
  }
};;//--------------------- Copyright Block ----------------------
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
};;//--------------------- Copyright Block ----------------------
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
};//--------------------- Copyright Block ----------------------
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

var rad2deg = function(rad) {return rad * 180 / Math.PI;};
var deg2rad = function(deg) {return deg * Math.PI / 180;};