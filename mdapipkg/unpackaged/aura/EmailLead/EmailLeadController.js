({		    
    AddAppToEmail: function(component, event) {
	var appString = event.getParam("addApp");
    	console.log(appString);   
    var appListIds = component.get("v.appId");
        console.log(appListIds);
    var checked = event.getParam("checked");
    var exist=false;

    for (var i in appListIds){
        if(appListIds[i] == appString ){
            console.log(appListIds[i]);
            exist=true;
      		};
    };
    if(exist==false || appListIds==''){
        appListIds.push(appString);
        console.log(appListIds);

    	component.set("v.button","false");
        //btn(disabled=false);
        //console.log(btn+' set to false');
   
    };
    var action = component.get("c.findById");
    action.setParams({
      "appListingId": appListIds
    });
    action.setCallback(this, function(a) {
        component.set("v.app", a.getReturnValue());        
    });
    $A.enqueueAction(action);
    //component.set("v.appId", appListIds);
	},
    
    
    LeadEmail: function(component, event) {
        var emailId = component.find("email");
        var fName = component.find("firstname");
       // var lName = component.find("lastname");
       // var cName = component.find("company");
        var countryName = component.find("country");
        
        var emailIdValue = component.find("email").get("v.value");
        var fNameValue = component.find("firstname").get("v.value");
        //var lNameValue = component.find("lastname").get("v.value");
        //var cNameValue = component.find("company").get("v.value"); 
        var countryNameValue = component.find("country").get("v.value");
		var appListIds = component.get("v.appId");

        emailId.showHelpMessageIfInvalid();
		fName.showHelpMessageIfInvalid();
		//lName.showHelpMessageIfInvalid();
		//cName.showHelpMessageIfInvalid();     
        countryName.showHelpMessageIfInvalid();        
        
        if(emailId.get("v.validity").valid &&
   		   fName.get("v.validity").valid &&
   		   countryName.get("v.validity").valid) {
        		var action = component.get("c.saveLead");
           		action.setParams({
          		"firstName": fNameValue,
         	//	"lastName": lNameValue,
          		"emailId": emailIdValue,
          	//	"companyName": cNameValue,
                "country": countryNameValue,
          		"appIds": appListIds
        	});   
        		action.setCallback(this, function(a) {
        		component.set("v.lead", a.getReturnValue()); 
            	//****Refresh the page
            	$A.get('e.force:refreshView').fire()
    		});        
    		$A.enqueueAction(action);
            
            //****Show Confirmation Message that the email was sent
        	var toastEvent = $A.get("e.force:showToast");
    		toastEvent.setParams({
        	"title": "Success!",
        	"message": "Your email has been sent. Please check your inbox."
    		});
    		toastEvent.fire();

    	}    	
	},
    
    handleRemoveAppButtonClick: function(component, event, helper ) {
        // component.getEvent("RemoveApp").setParams({"indexVar" : component.get("v.rowIndex") }).fire();
		var self = this;  // safe reference
        var appListIds = component.get("v.appId");
        var index = event.currentTarget.dataset.index;
        console.log("Event Value Next for firing cmp:");
        console.log(event);
        var ClearCheckBoxEvent = $A.get("e.c:ClearAppCheckBox");
        ClearCheckBoxEvent.setParams({"checkBoxAppId": event.currentTarget.id});
        ClearCheckBoxEvent.fire();
        helper.removeApp(component, index);
    },
    
    RemoveAppList: function(component, event, helper ) {
        var appString = event.getParam("RemoveApp");
        var appListIds = component.get("v.appId");
        var ind=-1;
        console.log("App List"+appListIds);
        console.log("removed App"+appString);
        
        for (var i in appListIds){
        if(appListIds[i] === appString ){
            ind=i;
      		};
            }; 
       console.log("remove Index"+ind);
        if(ind!=-1){
            helper.removeApp(component, ind);
        }
       if(appListIds==''){
    		component.set("v.button","true"); 
       }
    }
    
})