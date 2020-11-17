/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

  myredeem: async function (req, res) {
    console.log(req.session.userId);

    var redeems = await Redeem.find({
        user_id: Number(req.session.userId)
    });

    console.log(redeems);

    return res.view('pages/redeemed', { redeems: redeems });
  },

  redeem: async function (req, res) {
    console.log(req.params);
    console.log(req.session.userId);
    console.log(req.user);

    var dining = await Dining.findOne(Number(req.params.id));

    if (dining) delete dining.id;

    var myRedeem = await Redeem.create({
        ...dining,
        user_id: Number(req.session.userId),
    });

    var updatedUser = await User.updateOne(req.session.userId).set({
      coins: Number(req.user.coins - dining.coins)
    });

    return res.redirect('/homepage');
  },

  signup: async function (req, res) {
      console.log(req.body);

      var otherUser = await User.findOne({
          name: req.body.name
      });

      if (otherUser) return res.view('pages/signup', { msg: 'username already exist.' });

      var user = await User.create(req.body).fetch();

      req.session.userId = user.id;

      return res.redirect('/homepage');
  },

  login: async function (req, res) {

      console.log(req.body);

      var user = await User.findOne({
          name: req.body.name
      });

      if (!user) return res.view('pages/login', { msg: 'user not exist.' });
      if (user.password !== req.body.password) res.view('pages/login', { msg: 'password not matched.' });

      req.session.userId = user.id;
      return res.redirect('/homepage');
  },

  logout: async function (req, res) {
      delete req.session.userId;

      return res.redirect('/login');
  },

  json: async function (req, res) {

      var everyones = await Person.find();

      return res.json(everyones);
  },
  list: async function (req, res) {

      var everyones = await Person.find();

      return res.view('person/list', { persons: everyones });
  },

  read: async function (req, res) {

      var thatPerson = await Person.findOne(req.params.id);

      if (!thatPerson) return res.notFound();

      return res.view('person/read', { person: thatPerson });
  },

  delete: async function (req, res) {

      var deletedPerson = await Person.destroyOne(req.params.id);

      if (!deletedPerson) return res.notFound();

      return res.ok();
  },

  update: async function (req, res) {

      if (req.method == "GET") {

          var thatPerson = await Person.findOne(req.params.id);

          if (!thatPerson) return res.notFound();

          return res.view('person/update', { person: thatPerson });

      } else {

          var updatedPerson = await Person.updateOne(req.params.id).set(req.body);

          if (!updatedPerson) return res.notFound();

          return res.ok();
      }
  },

  search: async function (req, res) {

      var whereClause = {};

      if (req.query.name) whereClause.name = { contains: req.query.name };

      var parsedAge = parseInt(req.query.age);
      if (!isNaN(parsedAge)) whereClause.age = parsedAge;

      var thosePersons = await Person.find({
          where: whereClause,
          sort: 'name'
      });

      return res.view('person/list', { persons: thosePersons });
  },

  paginate: async function (req, res) {

      var limit = Math.max(req.query.limit, 2) || 2;
      var offset = Math.max(req.query.offset, 0) || 0;

      var somePersons = await Person.find({
          limit: limit,
          skip: offset
      });

      var count = await Person.count();

      return res.view('person/paginate', { persons: somePersons, numOfRecords: count });
  },

};
