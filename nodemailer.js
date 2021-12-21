const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mail = require("@sendgrid/mail");
const API="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";
const details = require("./details.json");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("The server started on port 3000 !!!!!!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome to FunOfHeuristic <br><br>😃👻😃👻😃👻😃👻😃</h1>"
  );
});
app.get("/sendmail", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome to FunOfHeuristic <br><br>😃👻😃👻😃👻😃👻😃</h1>"
  );
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendEmail(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});
app.post("/sendform", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendForm(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password
    }
  });

  let mailOptions = {
    from: '"Fun Of Heuristic"<radoradostin2000@gmail.com>', // sender address
    to: user.email, // list of receivers
    subject: "Wellcome to Fun Of Heuristic 👻", // Subject line
    html: `<h1>Hi ${user.name}</h1><br>
    <h4>Thanks for joining us</h4>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

async function sendEmail(user,callback){
  mail.setApiKey(API)
    const message ={
      to:"radoradostin2000@gmail.com",
      from:user.email,
      subject:`Hello mothataka ${user.name}`,
      text:`Hello there  ${user.name}`,
      html:`<h1> Hello there ${user.messagea} </h1> </br> <p> tuk shte e suobshtenieto </p>`
  }
  mail.send(message).then((response)=>console.log('email sent'))
.catch((error) => console.log(error.message));
  }
  async function sendForm(user,callback){
    mail.setApiKey(API)
    let inputName = user.name + " " + user.surname +" " + user.lastname
    let numm = user.cost
    let extramessage
    if(user.messagea){
      extramessage = `dopulnitelno suobshtenie ${user.message}`
    }
    else{
      extramessage =" "
    }
      const message ={
        to:"radoradostin2000@gmail.com",
        from:user.email,
        subject:`Hello  ${inputName}`,
        text:`Hello there  ${inputName} ${numm}`,
        html:`<h1> Hello there ${inputName}  </h1> </br>
         <p> iskame da bude dostaveno na adress: ${user.address}  </p> </br> 
         <p> na stoinost ${user.cost} </p> </br>
         <p> telefon za obratna vruzka ${user.phoneNumber} </p> </br>
         <p> email za obratna vruzka ${user.email} </p> </br>
          <p>dopulnitelno suobshtenie: ${user.messagea}</p>
         ` 
    }
    mail.send(message).then((response)=>console.log('email sent'))
  .catch((error) => console.log(error.message));
    }