import React from 'react';

import {connect} from 'react-redux';
import {statusStore} from './app.statusstore';
import {StatusServiceHttp} from './app.statusservice';

const AzureRow=({location, virtualStatus, cloudStatus, functionStatus}) => <tr>
    <td>{location}</td>
    <td>Virtual Machines : <div style={ statusStyle(virtualStatus) }>OK</div></td>
    <td>Cloud Cervices : <div style={ statusStyle(cloudStatus) }>OK</div></td>
    <td>Functions : <div style={ statusStyle(functionStatus) }>OK</div></td>
</tr>

function statusStyle(status){
    var color=status === 'OK' ? 'green' : 'red';
    return  {color};
}

export class AzureStatus extends React.Component{

    componentDidMount(){
        this.unsubscibe=statusStore.subscribe(() => console.log(statusStore.getState()));
        StatusServiceHttp.initAzure();
      }
  
      componentWillUnmount(){
        this.unsubscibe();
      }

      render() {
        var {statuses} = this.props;
        var rows = statuses.map((s) => <AzureRow key={s.id} location={s.location} virtualStatus={s.virtualStatus} 
        cloudStatus={s.cloudStatus} functionStatus={s.functionStatus}  /> );
      return <div><table>
          <tbody>{rows}</tbody>
          </table></div>;
    }
}

const mapStateToProps = state => {
    return {
        statuses:state.azureStatuses
    }
}

export const ActualAzure=connect(mapStateToProps)(AzureStatus);