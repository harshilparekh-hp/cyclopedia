import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './layout/Header';
import CycleOPediaClassPage from './cycleopediaclasspage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
      <Header></Header>
      <div className='row text-black'>
        <div className='col-6'>
          <span className='h1 text-warning text-center'>Class Component</span>
          <CycleOPediaClassPage></CycleOPediaClassPage>
        </div>
      </div>
    </div>
);