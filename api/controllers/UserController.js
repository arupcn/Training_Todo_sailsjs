/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    signup: (req, res) => {
      try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        User.create({ name: name, email: email,password:password }).exec((err) => {
          if (err) {
            console.log(err);
          }
          res.redirect('/');
        });
      } catch (error) {
        console.log(error)
      }
      },

    login: (req, res) => {
      try {
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
      } catch (error) {
        console.log(error)
      }
     
      },

 

};

