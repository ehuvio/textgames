import React from 'react';

import {connect} from 'react-redux';
import {statusStore} from './app.statusstore';
import {StatusServiceHttp} from './app.statusservice';

function statusStyle(status){
    var color=status === 'operational' ? 'green' : 'red';
    return  {color};
}

const DatadogRow=({name, status}) => <tr>
    <td>{name}</td>
    <td style={ statusStyle(status) }>{status}</td>
</tr>

export class DatadogStatus extends React.Component{

    componentDidMount(){
      this.unsubscibe=statusStore.subscribe(() => console.log(statusStore.getState()));
      StatusServiceHttp.initDatadog();
    }

    componentWillUnmount(){
      this.unsubscibe();
    }

    render() {
        var {statuses} = this.props;
        var rows = statuses.map((s, i) => <DatadogRow key={s.id} name={s.name} status={s.status} /> )
        return <div><table>
            <tbody>{rows}</tbody>
            </table></div>;
    }
}

const mapStateToProps = state => {
    return {
        statuses:state.datadogStatuses
    }
}

export const ActualDatadog=connect(mapStateToProps)(DatadogStatus);