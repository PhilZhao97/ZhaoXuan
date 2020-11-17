/**
 * DiningController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

  create: async function (req, res) {

    debugger;

    if (req.method == "GET") return res.view('dining/create');

    var dining = await Dining.create(req.body).fetch();

    return res.ok()
  },

  json: async function (req, res) {

    var allDining = await Dining.find();

    return res.json(allDining);
  },

  list: async function (req, res) {

    var allDining = await Dining.find();

    return res.view('pages/admin', { allDining: allDining });
  },

  read: async function (req, res) {

    console.log(req.params);

    var thatDining = await Dining.findOne(req.params.id);

    if (!thatDining) return res.notFound();

    return res.view('pages/detail', { dining: thatDining });
  },

  delete: async function (req, res) {
    console.log(req.params)

    var deletedDining = await Dining.destroyOne(req.params.id);

    if (!deletedDining) return res.notFound();

    return res.ok();
  },

  update: async function (req, res) {

    if (req.method == "GET") {

      var thatDining = await Dining.findOne(req.params.id);

      if (!thatDining) return res.notFound();

      return res.view('pages/dining', { dining: thatDining, isEdit: true });

    } else {

      // save update

      var updatedDining = await Dining.updateOne(req.params.id).set(req.body);

      if (!updatedDining) return res.notFound();

      return res.ok();
    }
  },

  members: async function (req, res) {

    var redeems = await Redeem.find({
      dining_id: Number(req.params.id)
    });

    var members = redeems.map(item => {
      return {
        name: item.user_name,
        id: item.user_id
      }
    })

    return res.view('pages/members', { members });
  },

  search: async function (req, res) {

    console.log(req.body);

    var whereClause = {};

    if (req.body.region !== 'none') whereClause.region = req.body.region;

    var minCoin = parseInt(req.body.mincoin);
    var maxCoin = parseInt(req.body.maxcoin);

    if (isNaN(minCoin)) {
      minCoin = 0;
    }

    if (isNaN(maxCoin)) {
      maxCoin = 9999999;
    }

    whereClause.coins = {
      ">=": minCoin,
      "<=": maxCoin
    }

    if (req.body.deal_valid_till) {
      whereClause.deal_valid_till = {
        ">=": req.body.deal_valid_till
      };
    }

    console.log(whereClause);

    var dinings = await Dining.find({
      where: whereClause,
      sort: 'deal_valid_till'
    });

    console.log(dinings);

    return res.view('pages/search', { dinings: dinings });
  },

  paginate: async function (req, res) {

    var limit = Math.max(req.query.limit, 6) || 6;
    var offset = Math.max(req.query.offset, 0) || 0;

    var dinings = await Dining.find({
      limit: limit,
      skip: offset
    });

    var count = await Dining.count();

    return res.view('pages/homepage', { all: count, dinings: dinings });
  },

  latestTwo: async function (req, res) {
    var dinings = await Dining.find({
      limit: 2,
      skip: 0
    });
    return res.view('pages/search', { dinings });
  },

  firstPage: async function (req, res) {

    var limit = 10;
    var offset = 0;

    var dinings = await Dining.find({
      limit: limit,
      skip: offset
    });

    var count = await Dining.count();

    let data = {
      "HK Island": [],
      "Kowloon": [],
      "New Territories": []
    };
    dinings.forEach(dining => {
      if (dining.region === "HK Island") {
        data['HK Island'].push(dining);
      }
      else if (dining.region === "Kowloon") {
        data['Kowloon'].push(dining);
      }
      else if (dining.region === "New Territories") {
        data['New Territories'].push(dining);
      }
    });

    return res.view('pages/homepage', { all: count, data: data });
  },


};

