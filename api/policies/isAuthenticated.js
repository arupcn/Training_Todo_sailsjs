
let Authorize = (req, res, next) => {
  if (req.session.user) {
      next();
    } else {
      res.status(401).send('Authrization failed! Please login');
    }
}  

module.exports = Authorize;