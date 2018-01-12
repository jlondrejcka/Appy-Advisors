({
	searchKeyChangeHelper: function(component, event) {
        var myEvent = $A.get("e.c:SKChange");
        myEvent.setParams({"searchKey": event.target.value});
        myEvent.fire();
    },
})