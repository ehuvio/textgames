import React from 'react';
import {Provider} from 'react-redux';

import {statusStore} from './app.statusstore'

import {BrowserRouter as Router} from 'react-router-dom';
import {Route,Link,Switch} from 'react-router-dom';

import {ActualDatadog} from './app.datadogstatus';
import {ActualAzure} from './app.azurestatus';

export default class ServerMain extends React.Component{

    componentDidMount(){
    }

    render(){
        return <Provider store={statusStore} ><Router><div>
            <header>
                <h1>Service Status Check</h1>
            </header>
            <nav>
                <Link to="/datadog">DataDog</Link>
                <Link to="/azure">Azure</Link>
            </nav>
            <main>
                <Switch>
                    <Route path='/datadog' component={ActualDatadog} />
                    <Route path='/azure' component={ActualAzure} />
                </Switch>
            </main>
            <footer>
                <br/>
                Copyright (c) Eetu Solutions Ltd
            </footer>
        </div></Router></Provider>
    }
}
