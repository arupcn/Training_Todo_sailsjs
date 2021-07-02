/**
 * TodoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
 const cron = require('node-cron');
const alert = require('alert')
const mailer = require('nodemailer');

let userId = '';
let emailId = '';


const transporter = mailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  ignoreTLS: false,
  secure: false,
  auth: {
      user: "arup111111das@gmail.com",
      pass: "Arup@123"
  }
});

cron.schedule('* * * * *',function(){
  console.log("Task is running every minute " + new Date());
  Todo.find({ user_id: userId }).exec((err, data) => {
    if (err) {
      console.log(err)
    }
    let currentTime = getTimeAMPMFormat(new Date);
    let todayDate = new Date().toISOString().slice(0, 10)
    for(i=0;i<data.length;i++){
      if(data[i].date == todayDate && data[i].time == currentTime){
        sendEmail(data[i].titles,data[i].body);
        alert(data[i].titles)
      }
    }
  });  
  
});

function sendEmail(titles,body){
  //sending the email
  transporter.sendMail({
      from: 'arup111111das@gmail.com',
      to: emailId,
      subject: titles,
      text: body
  })
      .then(_ => {console.log("Email sent on " + new Date())})
      .catch(error => {console.log(error)});
};

module.exports = {
  list: (req, res) => {
    userId = req.session.user.id
    emailId = req.session.user.email
    // schedular(req.session.user.id);
    Todo.find({ user_id: req.session.user.id }).exec((err, data) => {
      if (err) {
        res.send(500, { 'err': err });
      }
      res.view('todoList/todo', { data: data });
    });
  },

  add: (req, res) => {
    const titles = req.body.title;
    const body = req.body.task;
    const date = req.body.date;
    const time = req.body.time;
    const userId = req.session.user.id;
    // let date1 = new Date(date)
    // console.log(date1.toLocaleDateString().split('/').join('-') ,"============",time);
    Todo.create({ titles: titles, body: body,date:date,time:time,user_id : userId }).exec((err) => {
      if (err) {
        res.send(500, { 'err': err });
      }
      res.redirect('/todo');
    });
  },

  edit: (req, res) => {
    Todo.findOne({ id: req.params.id }).exec((err, data) => {
      if (err) {
        res.send(500, { 'err': err });
      }
      res.view('todoList/edit', { data: data });
    });
  },

  delete: (req, res) => {
    Todo.destroy({ id: req.params.id }).exec((err) => {
      if (err) {
        res.send(500, { 'err': err });
      }
      res.redirect('/todo');
    });
  },

  update: (req, res) => {
    const titles = req.body.title;
    const body = req.body.task;
    const date = req.body.date;
    const time = req.body.time;
    Todo.update({ _id: req.params.id }, { titles: titles, body: body,date:date,time:time }).exec((err) => {
      if (err) {
        res.send(500, { 'err': err });
      }
      res.redirect('/todo');
    });
  },

  logout: (req,res)=>{
    // delete req.session.user; // any of these works
    // req.session.destroy(); // any of these works
    // console.log("session====>",req.session);
    // res.redirect('/');
    userId = '';
    req.session.destroy(function(err) {
      setTimeout(function(){
        return res.redirect('/');
      }, 200); // redirect wait time 2.5 seconds
    });
  }

};


const getTimeAMPMFormat = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = hours < 10 ? '0' + hours : hours;
  // appending zero in the start if hours less than 10
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm;
};


