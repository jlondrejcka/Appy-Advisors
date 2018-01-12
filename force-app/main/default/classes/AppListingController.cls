global class AppListingController {
    	
  	@AuraEnabled
	public static List<App_Listing__c> getAppListing() {
		return [SELECT id, Short_Name__c , Name, App_by_Partner__c, Tagline__c, Full_Description__c, Short_Description__c, Listing_Id__c, Pricing__c, Rating__c, Partner__r.Booth__c, Partner__r.Name
			FROM App_Listing__c 
			ORDER BY Name];
	  }

    //this is incomplete and need to be updated to work with the EmailLead Lightning Component
    //Should Create a Lead, and Associated App Interest Objects.
    @AuraEnabled
    public static Lead saveLead(String firstName, String emailId, String country, List<Id> appIds) {
        system.debug('Enter SaveLead');
        List<Lead> li = new list <Lead>();
        Lead l = new Lead();
        l.FirstName = firstName;
        l.LastName = 'a';
        l.Company = 'NA';
        l.Email = emailId; 
        l.Country = country;
        li.add(l);
        system.debug(li);
   		upsert li;

        ID leadId = li[0].ID;
		system.debug(leadId);
        
       //Inserting App interests with the Lead id 
        List<App_Interest__c > appIntList = new list <App_Interest__c >();
        Integer idList = appIds.size();
        system.debug('appIds>>>'+ appIds);
        system.debug('number of apps>>>'+ idList);
        
        for(Integer i=0;i<idList;i++) {
    		App_Interest__c  ai = new App_Interest__c();
        	ai.Lead__c =leadId ;
        	ai.App_Listing__c=appIds[i] ;   
            
    		appIntList.add(ai);
		}
        upsert appIntList;  
                
        Lead emailLead = new Lead();
        emailLead = SendEmail(li[0]/*, appIntList*/);

    return l;      
    }
    
  
    @AuraEnabled
    Public Static Lead SendEmail(Lead lead/*, List<App_Interest__c> AppInt*/){
     try{
        //insert query for leadid
        Lead leadQ = [SELECT id, Name, Company, Email, Address, 
                      (SELECT Id FROM App_Interests__r) 
                      FROM Lead 
                	  WHERE Id = :lead.Id];
        EmailTemplate emailTemplate = [SELECT Id, Subject, HtmlValue, Body 
                                       FROM EmailTemplate 
                                       where Id ='00X1J000000jmuM'];
        List<Messaging.SingleEmailMessage> allmsg = new List<Messaging.SingleEmailMessage>();
		Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();

        mail.setTemplateID(emailTemplate.Id); 
		mail.setSaveAsActivity(true);
        mail.setTargetObjectId(leadQ.Id);     
       // mail.setOrgWideEmailAddressId('0D2B0000000069Y');
        String[] toaddress = new String[]{leadQ.Id};    
        system.debug('ToAddress'+toaddress);
		mail.setToAddresses(toaddress);
		allmsg.add(mail);
		Messaging.sendEmail(new Messaging.SingleEmailMessage[] {mail});
        List<Lead> li = new list <Lead>();
        leadQ.Email = '';
        li.add(leadQ);
        system.debug(li);
   		update li;
          return leadQ; 
    	}
    catch(Exception err){
    	System.debug(err);
                  return lead; 

		}
          
    }

    
    @AuraEnabled
    public static List<App_Listing__c> findAll() {
        return [SELECT id, Short_Name__c , Name, App_by_Partner__c, Tagline__c, Full_Description__c, Short_Description__c, Listing_Id__c, Pricing__c, Rating__c, Partner__r.Booth__c, Partner__r.Name
                FROM App_Listing__c 
                LIMIT 20];
    }
    
    
    @AuraEnabled
    public static List<App_Listing__c> findByName(String searchKey) {
        String name = '%' + searchKey + '%';
        //String booth = '%' + booth + '%'
        //String paid = paid
        //String rating = rating
        return [SELECT id, name, Short_Name__c, App_by_Partner__c, Tagline__c, Full_Description__c, Short_Description__c, Listing_Id__c, Pricing__c, Rating__c, Partner__r.Booth__c, Partner__r.Name 
                FROM App_Listing__c 
                WHERE name LIKE :name OR Tagline__c LIKE :name OR Partner__r.Name Like :name
                LIMIT 20];
    }  
   
    @AuraEnabled
    public static List<App_Listing__c> findById(List<Id> appListingId){  
        system.debug(appListingId);
        List<App_Listing__c> tempList = [SELECT id, name, App_by_Partner__c, Short_Name__c, Tagline__c, Short_Description__c,  Full_Description__c, Listing_Id__c, Pricing__c, Rating__c, Partner__r.Booth__c, Partner__r.Name 
                FROM App_Listing__c 
                WHERE Id IN :appListingId];
        
                system.debug(tempList);
        return tempList;        
    }   
   
    
    
}