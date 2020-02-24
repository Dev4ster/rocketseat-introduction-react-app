import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Container from '../../components/container';
import { Loading, Owner, IssueList } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repo: PropTypes.string
      })
    }).isRequired
  };

  state = {
    repo: {},
    issues: [],
    loading: true
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repo);

    const [repoDetails, repoIssues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5
        }
      })
    ]);

    this.setState({
      repo: repoDetails.data,
      issues: repoIssues.data,
      loading: false
    });
  }

  render() {
    const { repo, issues, loading } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Voltar</Link>
          <img src={repo.owner.avatar_url} alt={repo.owner.login} />
          <h1>{repo.name}</h1>
          <p>{repo.description}</p>
        </Owner>

        <IssueList>
          {issues.map(i => (
            <li key={String(i.id)}>
              <img src={i.user.avatar_url} alt={i.user.login} />
              <div>
                <strong>
                  <a
                    href={i.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {i.title}
                  </a>
                  {i.labels.map(l => (
                    <span key={String(l.id)}>{l.name}</span>
                  ))}
                </strong>
                <p>{i.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
