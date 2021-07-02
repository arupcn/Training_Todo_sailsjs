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

   '/': { view: 'todoList/login' },
   '/signup': { view: 'todoList/signup' },
  'GET /todo/list': 'TodoController.list',
  'GET /todo': 'TodoController.list',
  'POST /todo/add': 'TodoController.add',
  'GET /todo/edit/:id': 'TodoController.edit',
  'GET /todo/delete/:id': 'TodoController.delete',
  'POST /todo/update/:id': 'TodoController.update',
  'POST /user/signup': 'UserController.signup',
  'POST /user/login': 'UserController.login',
  'GET /user/logout': 'TodoController.logout',


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
