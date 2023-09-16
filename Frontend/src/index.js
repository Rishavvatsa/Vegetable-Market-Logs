import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import {store} from "./utils/index"

const routing = (
  <Router>
    <App />
  </Router>
);
const root = createRoot(document.getElementById("root"));
root.render(

  <Provider store={store}>
   
      {routing}
    
  </Provider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

