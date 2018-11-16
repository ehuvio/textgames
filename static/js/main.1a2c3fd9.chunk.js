(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{22:function(t,e,n){t.exports=n(35)},27:function(t,e,n){},35:function(t,e,n){"use strict";n.r(e);var a=n(0),u=n.n(a),r=n(17),s=n.n(r),o=(n(27),n(5)),i=n(6),l=n(9),c=n(7),d=n(10),m=n(8),p=n(11),h={azureStatuses:[],datadogStatuses:[]};var f=Object(p.b)(function(t,e){return t?"GOT_NEW_DATADOG_STATUS"===e.type?Object.assign({},t,{datadogStatuses:e.data}):"GOT_NEW_AZURE_STATUS"===e.type?Object.assign({},t,{azureStatuses:e.data}):t:h}),E=function(t){return{type:"GOT_NEW_DATADOG_STATUS",data:t}},S=function(t){return{type:"GOT_NEW_AZURE_STATUS",data:t}},g=n(37),v=n(36),b=n(39),O=n(38);function y(t,e,n,a){return new Promise(function(u,r){var s=new XMLHttpRequest;if(s.onreadystatechange=function(){if(4===s.readyState)if(s.status>=200&&s.status<300)try{var t=JSON.parse(s.responseText);u(t,s)}catch(e){u(s)}else r(s)},s.open(e,t,!0),a)for(var o in a)s.setRequestHeader(o,a[o]);s.send(n?JSON.stringify(n):null)})}var j={azureLocs:["East US","East US 2","North Europe"],azureLocRegex:["(?!.*(East US 2)).*East US*","East US 2","North Europe"],interval:6e5,initDatadog:function(t){this.dataDogStatuses||(this.getDatadogStatus(t),setInterval(this.getDatadogStatus.bind(this),this.interval))},initAzure:function(t){this.azureStatuses||(this.getAzureStatus(t),setInterval(this.getAzureStatus.bind(this),this.interval))},getDatadogStatus:function(t){var e=this;y("https://status.datadoghq.com/index.json","get",null,{accept:"application/json","content-type":"application/json"}).then(function(t){e.dataDogStatuses=[];var n=0,a=!0,u=!1,r=void 0;try{for(var s,o=t.components[Symbol.iterator]();!(a=(s=o.next()).done);a=!0){var i=s.value;"Alerting Engine"!==i.name&&"Event Pipeline"!==i.name||(e.dataDogStatuses.push({name:i.name,status:i.status,id:n}),n++)}}catch(l){u=!0,r=l}finally{try{a||null==o.return||o.return()}finally{if(u)throw r}}f.dispatch(E(e.dataDogStatuses))})},getAzureStatus:function(t){var e=this;y("https://azurecomcdn.azureedge.net/en-us/status/feed/","get",null,null).then(function(t){e.azureStatuses=[];for(var n=(new DOMParser).parseFromString(t.response,"text/xml").querySelectorAll("item"),a=0;a<e.azureLocs.length;a++){for(var u="OK",r="OK",s="OK",o=e.azureLocs[a],i=new RegExp(e.azureLocRegex[a]),l=0;l<n.length;l++){var c=n[l].getElementsByTagName("title")[0].childNodes[0].nodeValue,d=n[l].getElementsByTagName("description")[0].childNodes[0].nodeValue,m=i.test(d),p=i.test(d);if(m||p){var h=new RegExp("Virtual Machines");u=h.test(c)||h.test(d)?"NOK":"OK",r=(h=new RegExp("Cloud Cervices")).test(c)||h.test(d)?"NOK":"OK",s=(h=new RegExp("Functions")).test(c)||h.test(d)?"NOK":"OK"}}e.azureStatuses.push({location:o,virtualStatus:u,cloudStatus:r,functionStatus:s,id:a})}f.dispatch(S(e.azureStatuses))})}};var z=function(t){var e=t.name,n=t.status;return u.a.createElement("tr",null,u.a.createElement("td",null,e),u.a.createElement("td",{style:function(t){return{color:"operational"===t?"green":"red"}}(n)},n))},w=function(t){function e(){return Object(o.a)(this,e),Object(l.a)(this,Object(c.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(i.a)(e,[{key:"componentDidMount",value:function(){this.unsubscibe=f.subscribe(function(){return console.log(f.getState())}),j.initDatadog()}},{key:"componentWillUnmount",value:function(){this.unsubscibe()}},{key:"render",value:function(){var t=this.props.statuses.map(function(t,e){return u.a.createElement(z,{key:t.id,name:t.name,status:t.status})});return u.a.createElement("div",null,u.a.createElement("table",null,u.a.createElement("tbody",null,t)))}}]),e}(u.a.Component),D=Object(m.b)(function(t){return{statuses:t.datadogStatuses}})(w),A=function(t){var e=t.location,n=t.virtualStatus,a=t.cloudStatus,r=t.functionStatus;return u.a.createElement("tr",null,u.a.createElement("td",null,e),u.a.createElement("td",null,"Virtual Machines : ",u.a.createElement("div",{style:T(n)},"OK")),u.a.createElement("td",null,"Cloud Cervices : ",u.a.createElement("div",{style:T(a)},"OK")),u.a.createElement("td",null,"Functions : ",u.a.createElement("div",{style:T(r)},"OK")))};function T(t){return{color:"OK"===t?"green":"red"}}var k=function(t){function e(){return Object(o.a)(this,e),Object(l.a)(this,Object(c.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(i.a)(e,[{key:"componentDidMount",value:function(){this.unsubscibe=f.subscribe(function(){return console.log(f.getState())}),j.initAzure()}},{key:"componentWillUnmount",value:function(){this.unsubscibe()}},{key:"render",value:function(){var t=this.props.statuses.map(function(t){return u.a.createElement(A,{key:t.id,location:t.location,virtualStatus:t.virtualStatus,cloudStatus:t.cloudStatus,functionStatus:t.functionStatus})});return u.a.createElement("div",null,u.a.createElement("table",null,u.a.createElement("tbody",null,t)))}}]),e}(u.a.Component),N=Object(m.b)(function(t){return{statuses:t.azureStatuses}})(k),K=function(t){function e(){return Object(o.a)(this,e),Object(l.a)(this,Object(c.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(i.a)(e,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return u.a.createElement(m.a,{store:f},u.a.createElement(g.a,null,u.a.createElement("div",null,u.a.createElement("header",null,u.a.createElement("h1",null,"Service Status Check")),u.a.createElement("nav",null,u.a.createElement(v.a,{to:"/datadog"},"DataDog"),u.a.createElement(v.a,{to:"/azure"},"Azure")),u.a.createElement("main",null,u.a.createElement(b.a,null,u.a.createElement(O.a,{path:"/datadog",component:D}),u.a.createElement(O.a,{path:"/azure",component:N}))),u.a.createElement("footer",null,u.a.createElement("br",null),"Copyright (c) Eetu Solutions Ltd"))))}}]),e}(u.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(u.a.createElement(K,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[22,2,1]]]);
//# sourceMappingURL=main.1a2c3fd9.chunk.js.map