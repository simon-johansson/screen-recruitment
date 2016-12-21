import React from 'react'
import classes from './HomeView.scss'

import Select from 'react-select'
import 'react-select/dist/react-select.css'

class HomeView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      title: '',
      phone: '',
      email: '',
      linkedin: '',
      freetext: '',
      howIKnow: '',
      hasSent: false,
      recommender: '',
      people: []
    }
  }

  componentDidMount() {
    // console.log('mount');

    fetch('/people', {
      method: 'post',
      body: JSON.stringify({})
    })
    .then((res) => res.json())
    .then((people) => {
      this.setState({people: people.sort()})
    })
  }

  setRecommender(val) { this.setState({ recommender: val.label}); }
  setHowIKnow(ev) { this.setState({ howIKnow: ev.currentTarget.value}); }
  setName(ev) { this.setState({name: ev.target.value}); }
  setEmail(ev) { this.setState({email: ev.target.value}); }
  setTitle(ev) { this.setState({title: ev.target.value}); }
  setPhone(ev) { this.setState({phone: ev.target.value}); }
  setLinkedIn(ev) { this.setState({linkedin: ev.target.value}); }
  setFreetext(ev) { this.setState({freetext: ev.target.value}); }

  sendRecommendation() {
    fetch('/submit', {
      method: 'post',
      body: JSON.stringify({
        name: this.state.name,
        title: this.state.title,
        phone: this.state.phone,
        email: this.state.email,
        linkedin: this.state.linkedin,
        freetext: this.state.freetext,
        howIKnow: this.state.howIKnow,
        recommender: this.state.recommender
      })
    }).then((res) => {
      if (res.status !== 200) {
        console.log('Faild to send')
      } else {
        this.setState({hasSent: true})
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
    const { name, title, email, phone, linkedin, freetext } = this.state;
    // console.log(this.state.recommender);

    return (
      <div>
        <section className={classes.firstSection}>
          <h2>The Grapevine</h2>

          <p className={classes.description}>Know someone that is looking to switch jobs or that you really would like to work with? Please fill in their details below and Sara will do her best to get them to Screen.</p>

          <form className={classes.inputForm}>
            <p>My name is (you can be anonymous if you like):</p>
            <Select
              name="form-field-name"
              options={this.state.people}
              onChange={this.setRecommender.bind(this)}
              value={this.state.recommender}
              isLoading={!this.state.people.length}
              clearable={false}
              className={classes.recommender}
            />

            <p>I know this person from:</p>
            <input
              className={classes.radioButton}
              type="radio"
              name="howIKnow"
              onChange={this.setHowIKnow.bind(this)}
              checked={this.state.howIKnow === "studies"}
              value="studies"
            />
            <span className={classes.radioLables}>Studies</span>

            <input
              className={classes.radioButton}
              type="radio"
              name="howIKnow"
              onChange={this.setHowIKnow.bind(this)}
              checked={this.state.howIKnow === "work"}
              value="work"
            />
            <span className={classes.radioLables}>Work</span>

            <input
              className={classes.radioButton}
              type="radio"
              name="howIKnow"
              onChange={this.setHowIKnow.bind(this)}
              checked={this.state.howIKnow === "friend"}
              value="friend"
            />
            <span className={classes.radioLables}>Friend</span>


            <input className={classes.textInput} type="text" placeholder="Name" onInput={this.setName.bind(this)} />
            <input className={classes.textInput} type="text" placeholder="Area of expertise" onInput={this.setTitle.bind(this)} />
            <input className={classes.textInput} type="text" placeholder="Phone number" value={phone} onInput={this.setPhone.bind(this)} />
            <input className={classes.textInput} type="text" placeholder="Email" value={email} onInput={this.setEmail.bind(this)} />
            <input className={classes.textInput} type="text" placeholder="LinkedIn address" onInput={this.setLinkedIn.bind(this)} />
            <textarea rows="4" className={classes.textArea} placeholder="This person should work at Screen because..." onChange={this.setFreetext.bind(this)} />
            <button className={classes.button + ' btn btn-default'} type="button" onClick={this.sendRecommendation.bind(this)}>Send to Sara</button>
          </form>
        </section>

        <section className={classes.secondSection}>
          <img className={classes.image} src='/people.png' />
        </section>

        <div className={`${classes.thanks} ${this.state.hasSent ? '' : classes.hide}` }>
          <h1>Thanks!<br />You are awesome</h1>
          <img src="/giphy.gif" />
          <img src="/giphy.gif" />
          <img src="/giphy.gif" />
        </div>
      </div>
    )
  }
}

export default HomeView
