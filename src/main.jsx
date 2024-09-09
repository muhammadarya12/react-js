import React from 'react';
import ReactDOM from 'react-dom';
import AnimeSearch from './anime';
import './app1.css'; // Impor CSS jika diperlukan
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <div className="app">
    <AnimeSearch />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
