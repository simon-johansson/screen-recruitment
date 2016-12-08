import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import secrets from '../../secrets';

const transporter = nodemailer.createTransport(sgTransport({
  auth: {
    api_key: secrets.keys.sendgrid
  }
}));

const sendMail = options => {
  // console.log(options);

  const mailOptions = {
    from: '"Signature" <recommendation@screeninteraction.com>', // sender address
    to: 'simon.johansson@screeninteraction.com, sara.aronsson@screeninteraction.com', // list of receivers
    subject: '🦄 New recommendation 🦄', // Subject line
    text: '🦄', // plaintext body
    html: `
    <h1>Hello Sara!</h1>
    <h2>Here is a new recommendation: </h2>

    <p>Name: ${options.name}</p>
    <p>I know this person from: ${options.howIKnow}</p>
    <p>Area of expertise: ${options.title}</p>
    <p>Phone number: ${options.phone}</p>
    <p>Email: ${options.email}</p>
    <p>LinkedIn address: ${options.linkedin}</p>
    <p>Why we should hire: ${options.freetext}</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) return console.log(error);
    console.log('Message sent');
    console.log(JSON.stringify(info));
  });
}

export default sendMail;
