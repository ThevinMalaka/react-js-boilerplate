import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import logger from 'redux-logger'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import reportWebVitals from './reportWebVitals';
import rootReducer from './utils/store/rootReducer';
import rootSaga from './utils/store/rootSaga';
import Home from './containers/Home';
import About from './containers/about/about';


const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware,logger),
);
sagaMiddleware.run(rootSaga);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "about",
    element: <About />
  },
]);

export default function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
