import {statusStore,StatusActions} from './app.statusstore';

function doAjax(url,method,data, headers) {
	return new Promise(function(resolve,reject){
		var xr=new XMLHttpRequest();
		xr.onreadystatechange=function(){
			if(xr.readyState===4){
				if((xr.status>=200)&&(xr.status<300)){
					try{
						var obj=JSON.parse(xr.responseText);
						resolve(obj,xr);
					}
					catch(e){
						resolve(xr);
					}
				}
				else reject(xr);
			}
		}
		xr.open(method,url,true);
		if (headers) {
			for(var k in headers){
				xr.setRequestHeader(k,headers[k]);
			}
		}
		xr.send(data ? JSON.stringify(data) : null);
	});
}

export var StatusServiceHttp={
	azureLocs:["East US", "East US 2", "North Europe"],
	azureLocRegex:['(?!.*(East US 2)).*East US*', 'East US 2', 'North Europe'],
	interval: 600000,

	initDatadog(cb){
		if (!this.dataDogStatuses) {
			this.getDatadogStatus(cb);
			setInterval(this.getDatadogStatus.bind(this), this.interval);
		}
	},

	initAzure(cb){
		if (!this.azureStatuses) {
			this.getAzureStatus(cb);
			setInterval(this.getAzureStatus.bind(this), this.interval);
		}
	},

    getDatadogStatus(cb){
		var datadogHeaders={
			accept:'application/json',
			"content-type":'application/json'
		}

        doAjax("https://status.datadoghq.com/index.json", "get",null,datadogHeaders).then(data => {
            this.dataDogStatuses = [];
            var i = 0;

            for (let c of data.components) {
                if (c.name === "Alerting Engine"|| 
                    c.name === "Event Pipeline") {
                        this.dataDogStatuses.push({"name": c.name, "status": c.status, id:i});
                        i++;
                  }
            }
            statusStore.dispatch(StatusActions.gotNewDatadogStatus(this.dataDogStatuses));
        })
    },

    getAzureStatus(cb){
        doAjax("https://azurecomcdn.azureedge.net/en-us/status/feed/", "get",null,null).then(data => {
            this.azureStatuses = [];
			
			//var tempFeed = '<rss xmlns:a10="http://www.w3.org/2005/Atom" version="2.0"><channel xmlns:slash="http://purl.org/rss/1.0/modules/slash/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/"><title>Azure Status</title><link>https://azure.microsoft.com/en-us/status/</link><description>Azure Status</description><language>en-US</language><lastBuildDate>Mon, 12 Nov 2018 16:25:40 Z</lastBuildDate></channel><item><title>Virtual Machines/VM Scale Sets - East US 2</title><description>Summary of impact: Between 02:50 and 10:37 UTC on 27 Oct 2018, a subset of customers using Virtual Machines and/or Virtual Machine Scale Sets in East US 2 may have received failure notifications when performing service management operations - such as create, update, delete - for resources hosted in this region.Preliminary root cause: Engineers determined that some instances of a backend service responsible for interservice communication became unhealthy which in turn, caused requests between Storage and dependent resources to fail.Mitigation: Engineers performed a change to the backend service to achieve mitigation. Platform telemetry was then observed and service team engineers from affected services confirmed all requests completed successfully.Next steps: Engineers will continue to investigate to establish the full root cause to prevent future occurrences.</description>';

			const parser = new DOMParser();
			const rssFeed = parser.parseFromString(data.response, 'text/xml');
			//const rssFeed = parser.parseFromString(tempFeed, 'text/xml');
			const items = rssFeed.querySelectorAll("item");

			
			for (let j = 0; j < this.azureLocs.length; j++) {
				var virtualStatus = "OK";
				var cloudStatus = "OK";
				var functionStatus = "OK";
				var myLocation = this.azureLocs[j];
				var myRegex = new RegExp(this.azureLocRegex[j]);

				for (let i = 0; i < items.length; i++) {
					var itemTitle = items[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
					var itemDescription = items[i].getElementsByTagName("description")[0].childNodes[0].nodeValue;

					var isFoundInTitle = myRegex.test(itemDescription);
					var isFoundInDesc = myRegex.test(itemDescription);

					if (isFoundInTitle || isFoundInDesc) {
						var myStatusRegex = new RegExp("Virtual Machines");
						virtualStatus = (myStatusRegex.test(itemTitle) || myStatusRegex.test(itemDescription)) ? "NOK" : "OK";
						myStatusRegex = new RegExp("Cloud Cervices");
						cloudStatus = (myStatusRegex.test(itemTitle) || myStatusRegex.test(itemDescription)) ? "NOK" : "OK";
						myStatusRegex = new RegExp("Functions");
						functionStatus = (myStatusRegex.test(itemTitle) || myStatusRegex.test(itemDescription)) ? "NOK" : "OK";
					}
				}
				this.azureStatuses.push({"location": myLocation, "virtualStatus": virtualStatus,
				"cloudStatus": cloudStatus, "functionStatus": functionStatus, id:j});
			}

            statusStore.dispatch(StatusActions.gotNewAzureStatus(this.azureStatuses));
        })
    }
}
