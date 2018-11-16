import {createStore} from 'redux';

var initial={
    azureStatuses:[],
    datadogStatuses:[]
}

function statusReducer(prevState,action){
    if (!prevState) return initial;

    if (action.type==="GOT_NEW_DATADOG_STATUS")
        return Object.assign({},prevState,{datadogStatuses:action.data});

    if (action.type==="GOT_NEW_AZURE_STATUS")
        return Object.assign({},prevState,{azureStatuses:action.data});

    return prevState;
}

export var statusStore=createStore(statusReducer);

export var StatusActions={
    gotNewDatadogStatus(datadogStatuses){return {type:'GOT_NEW_DATADOG_STATUS',data:datadogStatuses}},
    gotNewAzureStatus(azureStatuses){return {type:'GOT_NEW_AZURE_STATUS',data:azureStatuses}}
}
