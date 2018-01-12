({
	expand : function(component,event,appId,expanded) {
        var section = "section-" + appId;
        var existingStatus = expanded;
        //var container = component.find(section);
        
        if(existingStatus === true){
            $A.util.addClass(section, "slds-accordion__section")
        }else{
            $A.util.addClass(section, "slds-accordion__section slds-is-open")
        }
	},
})