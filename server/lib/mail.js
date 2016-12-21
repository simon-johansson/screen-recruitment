import nodemailer from 'nodemailer'
import sgTransport from 'nodemailer-sendgrid-transport'
import secrets from '../../secrets'
import config from '../../config'

const transporter = nodemailer.createTransport(sgTransport({
  auth: {
    api_key: secrets.keys.sendgrid
  }
}))

const sendMail = options => {
  const to = `simon.johansson@screeninteraction.com${config.env !== 'development' ? ', sara.aronsson@screeninteraction.com' : ''}`
  const mailOptions = {
    from: '"Recommendation" <recommendation@screeninteraction.com>', // sender address
    to: to, // list of receivers
    subject: '🦄 New recommendation 🦄', // Subject line
    text: '🦄', // plaintext body
    html: `
    <h1>Hello Sara!</h1>
    <h2>Here is a new recommendation: </h2>

    <p>Name of recommender: ${options.recommender || '[anonymous]'}</p>
    <p>Name of talent: ${options.name}</p>
    <p>I know this person from: ${options.howIKnow}</p>
    <p>Area of expertise: ${options.title}</p>
    <p>Phone number: ${options.phone}</p>
    <p>Email: ${options.email}</p>
    <p>LinkedIn address: ${options.linkedin}</p>
    <p>Why we should hire: ${options.freetext}</p>
    `
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return reject(error)
      else resolve(JSON.stringify(info))
    })
  })
}

export default sendMail
