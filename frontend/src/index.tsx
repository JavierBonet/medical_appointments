import React from 'react';
import ReactDom from 'react-dom';
import '../public/styles/general.scss';
import 'react-toastify/dist/ReactToastify.css';
import RootComponent from './RootComponent';

ReactDom.render(<RootComponent />, document.querySelector('#root'));
