/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    signup: (req, res) => {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        User.create({ name: name, email: email,password:password }).exec((err) => {
          if (err) {
            res.send(500, { 'err': err });
          }
          res.redirect('/');
        });
      },

    login: (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        User.findOne({ email: email,password:password}).exec((err, data) => {
          if (err) {
            // res.send(500, { 'err': err });
            console.log(err);
          }
          req.session.user = {
            email: data.email,
            id: data.id
          }; // saving some user's data into user's session
          req.session.user.expires = new Date(Date.now() + 3 * 24 * 3600 * 1000);
          res.redirect('/todo');
        });
      },

 

};

