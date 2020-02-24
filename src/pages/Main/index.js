import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import { Link } from 'react-router-dom';

import api from '../../services/api';
import Container from '../../components/container';
import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repos: [],
    loading: false
  };

  componentDidMount() {
    const repos = localStorage.getItem('repos');
    if (repos) {
      this.setState({ repos: [...JSON.parse(repos)] });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repos } = this.state;
    if (prevState.repos !== repos) {
      localStorage.setItem('repos', JSON.stringify(repos));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    const { newRepo, repos } = this.state;
    const response = await api.get(`/repos/${newRepo}`);
    if (response.status === 200) {
      const data = {
        name: response.data.full_name
      };

      this.setState({
        repos: [...repos, data],
        newRepo: '',
        loading: false
      });
    }
  };

  render() {
    const { newRepo, loading, repos } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar Repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading_api={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repos.map(repo => (
            <li key={repo.name}>
              <span>{repo.name}</span>
              <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
