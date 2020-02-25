import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Container from '../../components/container';
import {
  Loading,
  Owner,
  IssueList,
  FilterIssues,
  Pages,
  Loader
} from './styles';

import loadingGif from '../../assets/loading.gif';

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
    loading: true,
    loadingContent: false,
    filter: 'all',
    page: 1
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repo);
    const repoDetails = await api.get(`/repos/${repoName}`);

    await this.getDataGitHub();
    this.setState({
      repo: repoDetails.data,
      loading: false
    });
  }

  async getDataGitHub() {
    this.setState({
      loadingContent: true
    });
    const { match } = this.props;
    const { filter, page } = this.state;
    const repoName = decodeURIComponent(match.params.repo);

    const repoIssues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filter,
        per_page: 5,
        page
      }
    });

    this.setState({
      issues: repoIssues.data,
      loadingContent: false
    });
  }

  handlePageNext = async () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
    await this.getDataGitHub();
  };

  handlePagePrev = async () => {
    const { page } = this.state;
    this.setState({ page: page - 1 });
    await this.getDataGitHub();
  };

  handleFilter = async f => {
    const { filter } = this.state;
    if (filter === f) return false;
    this.setState({ filter: f, page: 1 });
    await this.getDataGitHub();
    return true;
  };

  render() {
    const { repo, issues, loading, filter, page, loadingContent } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }
    return (
      <Container minH={947}>
        <Owner>
          <Link to="/">Voltar</Link>
          <img src={repo.owner.avatar_url} alt={repo.owner.login} />
          <h1>{repo.name}</h1>
          <p>{repo.description}</p>
        </Owner>

        <FilterIssues selected={filter}>
          <button type="button" onClick={e => this.handleFilter('all', e)}>
            Todas
          </button>
          <button type="button" onClick={() => this.handleFilter('open')}>
            Abertas
          </button>
          <button type="button" onClick={() => this.handleFilter('closed')}>
            Fechadas
          </button>
        </FilterIssues>
        {loadingContent ? (
          <Loader src={loadingGif} alt="loading" />
        ) : (
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
        )}

        <Pages pageCount={page}>
          <button type="button" onClick={this.handlePagePrev}>
            Anterior
          </button>
          <span>{page}</span>
          <button type="button" onClick={this.handlePageNext}>
            Proxima
          </button>
        </Pages>
      </Container>
    );
  }
}
