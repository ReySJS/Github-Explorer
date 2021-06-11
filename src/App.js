import React, { useState } from 'react';
import './styles/global.css'
// import githubExplorerImage from './assets/logo'

function App() {

  const [username, setUsername] = useState();
  const [repositories, setRepositories] = useState([])
  const [error, setError] = useState(false)
  async function handleSubmit() {

      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      const data = await response.json();

      setRepositories(data)
  }

  return (
    <>
      <header>
        <h1>Github Explorer</h1>
        <div>
          <input type="text" onChange={event => setUsername(event.target.value)} />
          <button onClick={handleSubmit}>Pesquisar</button>
        </div>
        {error && <p>Usuário não encontrado</p>}
      </header>
      <main>
        <h2>Repositórios</h2>
        <ul>
          {repositories.map(repository => (
            <li className="repository-item">
              <div>
                <strong>{repository.name}</strong>
                <span>{repository.language}</span>
              </div>
              <a href={repository.html_url}>Acessar repositório</a>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default App;
