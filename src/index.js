import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import {GlobalState} from './redux/GlobalState'

const globalState = [
    {
        "id": 1,
        "title": "Make a meal",
        "description": "lorem ipsum",
        "status": 0,
        "createdAt": "2019-11-15 18:00"
    }, {
        "id": 2,
        "title": "Dinner with family",
        "description": "lorem ipsum",
        "status": 0,
        "createdAt": "2019-11-16 18:00"
    }, {
        "id": 3,
        "title": "Watch scary movie",
        "description": "lorem ipsum",
        "status": 0,
        "createdAt": "2019-11-15 13:00"
    }, {
        "id": 4,
        "title": "Learn something new",
        "description": "lorem ipsum",
        "status": 1,
        "createdAt": "2019-11-15 08:00"
    }, {
        "id": 5,
        "title": "Make a phone call to mom",
        "description": "lorem ipsum",
        "status": 1,
        "createdAt": "2019-11-15 04:00"
    }
]

const rootReducer = (state = globalState, action) => {
    return state;
}

const storeRedux = createStore(rootReducer);

ReactDOM.render(
                <Provider store={storeRedux}>
                    <App /> 
                </Provider>,
                document.getElementById('root'));

serviceWorker.unregister();
