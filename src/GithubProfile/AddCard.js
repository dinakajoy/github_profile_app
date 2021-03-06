import React from 'react';
import './GithubProfile.css';

class AddCard extends React.Component {
  state = {
    username: ''
  };

  saveToLocalStorage = async(data) => {
    localStorage.setItem(data.id, JSON.stringify(data));
  }

  handleSubmit = async(event) => {
    event.preventDefault();
    const resp = await fetch(`https://api.github.com/users/${this.state.username}`);
    const json = await resp.json();
    if(json.message === "Not Found") {
      alert('Sorry, User Was Not Found &#128532;')
    } else {
      await this.saveToLocalStorage(json);
      this.props.onSubmit(json);
      this.setState({ username: '' });
    }
  }

  render() {
      return (
        <form onSubmit={this.handleSubmit} className="container">
          <input type="text" value={this.state.username} onChange={event=>this.setState({ username: event.target.value })} className="username" placeholder="Enter Github Username" required />
          <button className="btn">Add Github User</button>
        </form>
      );
  }
}

export default AddCard;