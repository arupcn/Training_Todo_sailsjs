/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
 const alert = require('alert')
module.exports = {
    signup: (req, res) => {
      try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        // User.findOne({email:email}).exec((err,data)=>{
        //   if(err){
        //     console.log(err);
        //   }else if(data.email == email){
        //    alert("Email already exist ! ");
        //    res.redirect('/signup');
        //   }
        //   else{
        //     User.create({ name: name, email: email,password:password }).exec((err) => {
        //       if (err) {
        //         console.log(err);
        //       }
        //       res.redirect('/');
        //     });
        //   }
        // })


        User.create({ name: name, email: email,password:password }).exec((error) => {
          if (error) {
            if(error.code == 'E_UNIQUE')
            {
                alert("Email already exist ! ");
                res.redirect('/signup');
            }
        //     expect(error.Errors.email).to.exist;
 
        // expect(error.Errors.email[0].message).to.equal(User.validationMessages.email.email);
 
        // expect(error.Errors.email[1].message).to.equal(User.validationMessages.email.required);
        //     done();
            
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
        User.findOne({ email: email}).exec((err, data) => {
          if (err) {
            // res.send(500, { 'err': err });
           
            return;
          }
          
          if(data == undefined){
            alert("Email Not exist ! ");
            res.redirect('/');
            return;
          }else if(data.password == password){
            req.session.user = {
              email: data.email,
              id: data.id
            }; // saving some user's data into user's session
            req.session.user.expires = new Date(Date.now() + 3 * 24 * 3600 * 1000);
            res.redirect('/todo');
          }else if(data.password != password){
            alert("Incorrect passowrd ! ");
            res.redirect('/');
            return;
          }else{
            alert("Some other problem ! ");
            res.redirect('/');
            return;
          }
       
        });
      } catch (error) {
        console.log(error)
      }
     
      },

 

};

