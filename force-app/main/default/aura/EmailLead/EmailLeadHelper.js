({
    showToast : function(component, event, helper) {
    var toastEvent = $A.get("e.force:showToast");
    toastEvent.setParams({
        "title": "Success!",
        "message": "Your email has been sent."
    });
    toastEvent.fire();
},
    
    removeApp : function(component, index) {
        var leadIds = component.get("v.appId");
        var leads = component.get("v.app");
		leadIds.splice(index, 1);
        leads.splice(index, 1);
        console.log("After Splice");
		console.log("id List"+leadIds);
        console.log(" App list"+leads);
        component.set("v.appId", leadIds);
       // component.set("v.app", leads);
        var action = component.get("c.findById");
       action.setParams({
      "appListingId": leadIds
    });
    action.setCallback(this, function(a) {
        component.set("v.app", a.getReturnValue());        
    });
    $A.enqueueAction(action);
	}
   
})