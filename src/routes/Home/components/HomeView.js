import React from 'react'
import classes from './HomeView.scss'

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
    };
  }

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
      })
    }).then((res) => {
      this.setState({hasSent: true});
    });
  }

  render() {
    const { name, title, email, phone, linkedin, freetext } = this.state;

    return (
      <div>
        <section className={classes.firstSection}>
          <h2>The Grapevine</h2>

          <p className={classes.description}>Know someone that is looking to switch jobs or that you really would like to work with? Please fill in their details below and Sara will do her best to get them to Screen.</p>

          <form>
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
            <textarea rows="4" className={classes.textArea} placeholder="This person should work at screen because..." onChange={this.setFreetext.bind(this)} />
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
