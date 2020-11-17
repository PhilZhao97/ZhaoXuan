/*
 * @Date         : 2020-11-15 00:33:46
 * @Author       : kefeng
 * @LastEditors  : kefeng
 * @LastEditTime : 2020-11-17 20:53:25
 * @FilePath     : /ZhaoXuan/config/routes.js
 */
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

  // admin
  'GET /admin': 'DiningController.list',

  // search-view
  'GET /search': 'DiningController.latestTwo',
  'POST /dining/search': 'DiningController.search',




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
