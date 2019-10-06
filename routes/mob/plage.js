const express = require("express");
const router = express.Router();

const Plage = require("../../models/Plage");
const Buoy = require("../../models/Buoy");
const Rec = require("../../models/Rec");

// @route   Get api/plages
// @desc    Get All  plages
// @access  Public

router.get("/", async (req, res) => {
  try {
    const plages = await Plage.find().select("_id nom ville mainImage rates");
    p = [];
    plages.forEach(plage => {
      //plage = plage.toObject;
      const rates = plage.rates.map(rate => rate.rate);
      let rate = 2.5;
      rates.length !== 0
        ? (rate =
            rates.reduce((previous, current) => (current += previous), 0) /
            rates.length)
        : (rate = 2.5);
      plage = plage.toObject();
      //console.log(rate);
      delete plage.rates;
      plage.rate = rate;
      p.unshift(plage);
    });
    // const obj = plages.rates.map(rate=>rate.rate).reduce((previous, current) => current += previous)/palge.rates.length();

    res.json(p);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// @route   Get mob/plage/nearyou
// @desc    Get near ypu
// @access  Public

router.get("/nearyou/:lat/:lng/:dist", async (req, res) => {
  try {
    const lat = req.params.lat;
    const lng = req.params.lng;
    const dist = req.params.dist;

    const plages = await Plage.find().select(
      "_id nom ville mainImage rates lat lng  "
    );
    p = [];
    plages.forEach(plage => {
      //console.log(plage.lat)
      console.log(getDistanceFromLatLonInKm(lat, lng, plage.lat, plage.lng));
      //plage = plage.toObject;
      if (getDistanceFromLatLonInKm(lat, lng, plage.lat, plage.lng) < dist) {
        const rates = plage.rates.map(rate => rate.rate);
        let rate = 2.5;
        rates.length !== 0
          ? (rate =
              rates.reduce((previous, current) => (current += previous), 0) /
              rates.length)
          : (rate = 2.5);
        plage = plage.toObject();
        //console.log(rate);
        delete plage.rates;
        plage.rate = rate;
        p.unshift(plage);
      }
    });
    // const obj = plages.rates.map(rate=>rate.rate).reduce((previous, current) => current += previous)/palge.rates.length();

    res.json(p);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// @route   Get mob/plage/recommanded
// @desc    Get recommanded
// @access  Public

router.get("/recommanded/:idUser", async (req, res) => {
  try {
    const plages = await Rec.findOne({ id: req.params.idUser })
      .populate({
        path: "plages",
        select: "_id nom ville mainImage rates",
        options: { limit: 5 }
      })
      .select("_id nom ville mainImage rates");

    console.log(plages);
    if (!plages) {
      console.log(1)
      const pls = await Plage.find()
        .select("_id nom ville mainImage rates")
        .sort({ rate: -1 })
        .limit(5);
      p = [];
      pls.forEach(plage => {
        //plage = plage.toObject;
        const rates = plage.rates.map(rate => rate.rate);
        let rate = 2.5;
        rates.length !== 0
          ? (rate =
              rates.reduce((previous, current) => (current += previous), 0) /
              rates.length)
          : (rate = 2.5);
        plage = plage.toObject();
        //console.log(rate);
        delete plage.rates;
        plage.rate = rate;
        p.unshift(plage);
      });
      // const obj = plages.rates.map(rate=>rate.rate).reduce((previous, current) => current += previous)/palge.rates.length();

      res.json(p);
    } else {
      const nn = plages.plages.length;
      if (nn < 5) {
        const pls = await Plage.find({
          id: { $nin: plages.plages.map(p => p.id) }
        })
          .select("_id nom ville mainImage rates")
          .sort({ rate: -1 })
          .limit(5 - nn);
        plages.plages.unshift(...pls);
      }

      p = [];
      plages.plages.forEach(plage => {
        //plage = plage.toObject;
        const rates = plage.rates.map(rate => rate.rate);
        let rate = 2.5;
        rates.length !== 0
          ? (rate =
              rates.reduce((previous, current) => (current += previous), 0) /
              rates.length)
          : (rate = 2.5);
        plage = plage.toObject();
        //console.log(rate);
        delete plage.rates;
        plage.rate = rate;
        p.unshift(plage);
      });
      // const obj = plages.rates.map(rate=>rate.rate).reduce((previous, current) => current += previous)/palge.rates.length();

      res.json(p);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// @route   Get mob/plage/tag
// @desc    Get tag
// @access  Public

router.get("/tag/:tag", async (req, res) => {
  try {
    const plages = await Plage.find().select("_id nom ville mainImage rates");
    p = [];
    plages.forEach(plage => {
      //plage = plage.toObject;
      const rates = plage.rates.map(rate => rate.rate);
      let rate = 2.5;
      rates.length !== 0
        ? (rate =
            rates.reduce((previous, current) => (current += previous), 0) /
            rates.length)
        : (rate = 2.5);
      plage = plage.toObject();
      //console.log(rate);
      delete plage.rates;
      plage.rate = rate;
      p.unshift(plage);
    });
    // const obj = plages.rates.map(rate=>rate.rate).reduce((previous, current) => current += previous)/palge.rates.length();

    res.json(p);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// @route   Get mob/plage/location
// @desc    Get All  plages with location
// @access  Public

router.get("/location", async (req, res) => {
  try {
    const plages = await Plage.find().select("_id nom ville lat lng");
    res.json(plages);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

// @route   Get mob/plage/id/idUser
// @desc    Get plage with id
// @access  Public

router.get("/:id/:idUser", async (req, res) => {
  try {
    const user = await User.findById(req.params.idUser);
    if (!user) return res.status(404).json({ msg: "pas de user" });
    const plage = await Plage.findById(req.params.id);
    if (!plage) return res.status(404).json({ msg: "pas de plage" });

    const buoys = await Plage.findById(req.params.id)
      .populate({
        path: "buoys",
        populate: {
          path: "meteos",
          model: "meteo",
          options: { limit: 1, sort: { date: -1 } }
        }
      })
      .select("buoys");
    let meteo = {};
    if (buoys.buoys.filter(buoy => buoy.status === "ON_LIGNE").length === 1) {
      // console.log(1);
      meteo = buoys.buoys.shift().meteos.shift();
    } else if (
      buoys.buoys.filter(buoy => buoy.status === "ON_LIGNE").length > 1
    ) {
      const data = buoys.buoys
        .filter(buoy => buoy.status === "ON_LIGNE" && buoy.meteos.length > 0)
        .map(buoy => buoy.meteos.shift());
      // console.log(2);
      console.log(data);
      if (data.length > 0) {
        const obj = data[0];
        if (data.length > 1) {
          obj = Object.entries(
            data.slice(1).reduce((res, curr) => {
              return {
                temp: res.temp + curr.temp,
                humi: res.humi + curr.humi,
                press: res.press + curr.press,
                uv: res.uv + curr.uv,
                diVent: res.diVent,
                viVent: res.viVent + curr.viVent,
                ph: res.ph + curr.ph,
                tempEau: res.tempEau + curr.tempEau,
                date: res.date,
                flag: res.flag + curr.flag,
                cloudy: res.cloudy + curr.cloudy,
                crowded: res.crowded + curr.crowded
              };
            }, data[0])
          );
          obj.forEach(function(val) {
            typeof val[1] === "number"
              ? (meteo[val[0]] = val[1] / data.length)
              : (meteo[val[0]] = val[1]);
          });
        } else meteo = obj;
        //return res.json(meteo)
        console.log(obj);
      }
    }

    const rates = plage.rates.map(rate => rate.rate);
    let rate = 2.5;
    rates.length !== 0
      ? (rate =
          rates.reduce((previous, current) => (current += previous), 0) /
          rates.length)
      : (rate = 2.5);
    //console.log(rate);

    const Oplage = plage.toObject();

    Oplage.meteo = [
      randMeteo(meteo, 1),
      randMeteo(meteo, 2),
      randMeteo(meteo, 3),
      randMeteo(meteo, 4)
    ];

    Oplage.favoris = user.follows.filter(f => f.id === plage.id).length > 0;
    Oplage.prev = [meteo, meteo, meteo];
    delete Oplage.rates;
    Oplage.rate = rate;
    Oplage.acti = ["Swimming"];

    return res.json(Oplage);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});
const randMeteo = (meteo, i) => {
  const obj = {};
  if (i == 1) {
    obj.uv = meteo.uv;
    obj.salerite = meteo.salerite;
    obj._id = meteo._id;
    obj.temp = meteo.temp - 5;
    obj.humi = meteo.humi;
    obj.press = meteo.press;
    obj.diVent = meteo.diVent;
    obj.viVent = meteo.viVent;
    obj.ph = meteo.ph;
    obj.tempEau = meteo.tempEau;
    obj.flag = meteo.flag;
    obj.cloudy = meteo.cloudy;
    obj.crowded = meteo.crowded;
    obj.date = meteo.date;
    obj.__v = meteo.__v;
  } else if (i == 2) {
    obj.uv = meteo.uv;
    obj.salerite = meteo.salerite;
    obj._id = meteo._id;
    obj.temp = meteo.temp + 2;
    obj.humi = meteo.humi;
    obj.press = meteo.press;
    obj.diVent = meteo.diVent;
    obj.viVent = meteo.viVent;
    obj.ph = meteo.ph;
    obj.tempEau = meteo.tempEau;
    obj.flag = meteo.flag;
    obj.cloudy = meteo.cloudy;
    obj.crowded = meteo.crowded;
    obj.date = meteo.date;
    obj.__v = meteo.__v;
  } else if (i == 3) {
    obj.uv = meteo.uv;
    obj.salerite = meteo.salerite;
    obj._id = meteo._id;
    obj.temp = meteo.temp + 3;
    obj.humi = meteo.humi;
    obj.press = meteo.press;
    obj.diVent = meteo.diVent;
    obj.viVent = meteo.viVent;
    obj.ph = meteo.ph;
    obj.tempEau = meteo.tempEau;
    obj.flag = meteo.flag;
    obj.cloudy = meteo.cloudy;
    obj.crowded = meteo.crowded;
    obj.date = meteo.date;
    obj.__v = meteo.__v;
  } else {
    obj.uv = meteo.uv;
    obj.salerite = meteo.salerite;
    obj._id = meteo._id;
    obj.temp = meteo.temp - 4;
    obj.humi = meteo.humi;
    obj.press = meteo.press;
    obj.diVent = meteo.diVent;
    obj.viVent = meteo.viVent;
    obj.ph = meteo.ph;
    obj.tempEau = meteo.tempEau;
    obj.flag = meteo.flag;
    obj.cloudy = meteo.cloudy;
    obj.crowded = meteo.crowded;
    obj.date = meteo.date;
    obj.__v = meteo.__v;
  }
  return obj;
};

// @route   PUT mob/plage/rate
// @desc    add or update rate on plage
// @access  Private

router.put("/rate", async (req, res) => {
  try {
    const plage = await Plage.findById(req.body.idPlage);
    if (!plage) return res.status(404).json({ msg: "Plage not found" });
    //check plage have been alredy rated
    const ind=plage.rates.indexOf(rate => rate.user.toString() === req.body.idUser)
    if (
     ind!==-1
    ) {
      plage.rates[ind].rate=req.body.rate
      
    } else {
      plage.rates.unshift({ user: req.body.idUser, rate: req.body.rate });
    }
    await plage.save();

    res.json(plage);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

module.exports = router;
