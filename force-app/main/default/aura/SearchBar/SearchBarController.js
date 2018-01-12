({
    searchKeyChange: function(component, event, helper) {
        var myEvent = $A.get("e.c:SKChange");
        var seachStr = component.get("v.searchKeyString");
        myEvent.setParams({"searchKey": seachStr});
        console.log('searchkey before event fire:'+ seachStr);
        myEvent.fire();
    },
    
    clearSearchBar: function(component, event, helper) {
         
         var seachStr = component.get("v.searchKeyString");
         console.log('seachStr :'+ seachStr);
         component.set("v.searchKeyString", "");
         seachStr = component.get("v.searchKeyString");
		 console.log('seachStr after:'+ seachStr);
        /*var searchString = component.find("SearchInput");
         var SearchStringDisplay = searchString.get("v.value");
         console.log(SearchStringDisplay);
		 component.set("v.searchKeyString","");
        helper.searchKeyChangeHelper(component, event);*/
    }    
})