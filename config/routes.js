/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */


module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // homepage
  '/': 'DiningController.firstPage',
  'GET /homepage': 'DiningController.firstPage',

  // add-view
  'GET /dining/add': { view: 'pages/dining' },

  // update
  'GET /dining/update': 'DiningController.update',
  'POST /dining/update/:id': 'DiningController.update',

  // add-api
  'POST /dining/create': 'DiningController.create',

  // delete
  'GET /dining/delete/:id': 'DiningController.delete',

  // detail
  'GET /dining/detail/:id': 'DiningController.read',

  // redeemed
  'GET /dining/redeemed/:id': 'DiningController.members',

  // admin
  'GET /admin': 'DiningController.list',

  // search-view
  'GET /search': 'DiningController.latestTwo',
  'POST /dining/search': 'DiningController.search',

  // login
  'GET /login': { view: 'pages/login' },
  'POST /login': 'UserController.login',
  'GET /signup': { view: 'pages/signup' },
  'POST /signup': 'UserController.signup',
  'GET /logout': 'UserController.logout',

  'GET /myredeem': 'RedeemController.myredeem',
  'GET /redeem/:id': 'RedeemController.redeem',


  'GET /person/create': 'PersonController.create',
  'POST /person/create': 'PersonController.create',



  // 'GET /': 'PersonController.list',
  'GET /person': 'PersonController.list',
  'GET /person/list': 'PersonController.list',
  'GET /person/json': 'PersonController.json',    
  'GET /person/read/:id': 'PersonController.read',
  'POST /person/delete/:id': 'PersonController.delete',

  'GET /person/update/:id': 'PersonController.update',
  'POST /person/update/:id': 'PersonController.update',
  

  'GET /person/search': 'PersonController.search',
  'GET /person/paginate': 'PersonController.paginate',

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
