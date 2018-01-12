({
    doInit : function(component, event) {
        var action = component.get("c.findAll");
        action.setCallback(this, function(a) {
            component.set("v.app", a.getReturnValue());
        });
        $A.enqueueAction(action);
    },
    
    searchKeyChange: function(component, event) {
    var searchKey = event.getParam("searchKey");
    var action = component.get("c.findByName");
    action.setParams({
      "searchKey": searchKey
    });
    action.setCallback(this, function(a) {
        component.set("v.app", a.getReturnValue());
    });
    $A.enqueueAction(action);
        
	},
    
    expandSection : function(component, event, helper) {
        var appId = event.currentTarget.id; //component.get("v.Id");
       	//var sec = "section-"++appId;
        //var appSec = component.find(sec);
        //appSec.set(class,"slds-accordion__section");
        console.log(appId);
        //console.log(sec);
        //console.log(appSec);
        //helper.expand(component,event, appId, expanded);
	  },
    
    onCheck : function (component, event, helper) {
        console.log('event fired-start');
		var myEvent = $A.get("e.c:AddApp");
      	var myRemoveEvent = $A.get("e.c:RemoveApp");
        var AppName = event.currentTarget.id;
            //event.getSource().get("v.value");
        var check = event.currentTarget.checked;
            //event.getSource().get("v.checked");
        myRemoveEvent.setParams({"RemoveApp": AppName});
        myEvent.setParams({"addApp": AppName});
        myEvent.setParams({"checked": check});
        var checkbox = myEvent.getParam("checked");
        var appname = myEvent.getParam("addApp");
        console.log(appname);
        console.log(checkbox);
        if(checkbox === true){
            myEvent.fire();  
        }
        else{
            myRemoveEvent.fire();
        }
		console.log(myEvent);
    },
    
    ClearAppCheckBox : function (component, event, helper) {
        var appString = event.getParam("checkBoxAppId");
        console.log("ClearCheckBoxId:"+ appString);   
        // component.set("v.checkThis", false);
        var appListIds = event.getSource().get("v.appId");
        // console.log("Current v.app.id: "+appListIds);
        var AppToRemove;
        for (var i in appListIds){
        if(appListIds[i] == appString ){
            console.log("Match AppId in Loop: "+appListIds[i]);
            AppToRemove=appListIds[i];
      		};
    	};
        
       
       var com = component.getGlobalId(AppToRemove);
       console.log("Component globalId: "+com);
       var com2 = component.find(com); 
       console.log("Component find: "+com2);

         //.set("v.checkThis", false);
               
    }

})