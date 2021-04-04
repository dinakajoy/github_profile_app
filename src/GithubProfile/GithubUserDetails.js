import React from 'react';
import './GithubProfile.css';
import { Doughnut } from 'react-chartjs-2';

class GithubUserDetails extends React.Component {
  state = {
    card: [],
    repos: [],
    isLoading: false
  }

  loadCard = async() => {
    this.setState({ isLoading: true });
    try {
      const url = `https://api.github.com/users/${this.props.match.params.id}`;
      const resp = await fetch(url) ;
      const json = await resp.json();
      this.setState({ isLoading: false });
      return this.setState({card: json});
    } catch (error) {
      console.log(error.message);
      this.setState({ isLoading: false });
    }
  }

  loadRepos = async() => {
    this.setState({ isLoading: true });
    try {
      const resp = await fetch(`https://api.github.com/users/${this.props.match.params.id}/repos`);
      const json = await resp.json();
      this.setState({ isLoading: false });
      return this.setState({repos: json});
    } catch(error) {
      console.log(error.message);
      this.setState({ isLoading: false });
    }
  }

  async componentDidMount() {
    await this.loadCard();
    await this.loadRepos();
  }


  getDate = (date) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `Joined ${monthNames[new Date(date).getMonth()]} ${new Date(date).getDay()}, ${new Date(date).getFullYear()}`;
  }

  render() { 
    return (
      <>
        {!this.state.isLoading && <section className="container">
          <div className="section-a">
            <img src={this.state.card.avatar_url} alt={this.state.card.name} />
            <div className="detail">
              <h1>{this.state.card.name}</h1>
              <p>{this.state.card.bio}</p>
              <div className="sub-details">
                <div className="sub-details-left">
                  <i className="fa fa-map-marker"></i>
                  <span>{this.state.card.location}</span>
                </div>
                <div className="sub-details-right">
                  <i className="fa fa-calendar"></i>
                  <span>{this.getDate(this.state.card.created_at)}</span>
                </div>
              </div>
            </div>

            <Doughnut 
              data={{
                datasets: [{
                  data: [this.state.card.public_repos, this.state.card.following, this.state.card.followers, this.state.card.public_gists],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
                }],
                labels: [
                  'Repositories',
                  'Following',
                  'Followers',
                  'Public Gists'
                ],
              }}
            />
          </div>

          <div className="section-b">
            <h2>{this.state.card.name}'s Repositories </h2><br />
            <div className="repo-details">
              {this.state.repos.map(function(repo, index) {
                return <div className="repo_wrapper">
                  {repo.homepage !== '' && <a href={repo.homepage} target="_BLANK" rel="noopener noreferrer" className="link2"><h4><i class="fa fa-link"></i>{'  '}{repo.name}</h4></a>}
                  {repo.homepage === '' && <h4><i class="fa fa-code"></i>{'  '}{repo.name}</h4>}
                  <p>{repo.description}</p>
                  <br />
                  <div class="repo-group">
                    {repo.language !== '' && <span><i class="fa fa-circle"></i>{repo.language}</span>}
                    {repo.forks_count !== '' && <span><i class="fa fa-code-fork"></i>{repo.forks_count}</span>}
                    {repo.stargazers_count !== '' && <span><i class="fa fa-star"></i>{repo.stargazers_count}</span>}
                    {repo.size !== '' && <span><i class="fa fa-pie-chart"></i>{repo.size}kb</span>}
                  </div>
                </div>
              })}
            </div>
          </div>
        </section> }
        { this.state.isLoading && <h2 class="loading">Loading ... </h2>}
      </>
    );
  }
}

export default GithubUserDetails;