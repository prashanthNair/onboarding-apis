export class BrandRegisterModel {
    BrandId:string;
    Status:string;
    BrandName:string;
    Domain: string;
    Category: string; 
    Country: string;
    EmailId: string;
    Mobile: number;
    CountryCode: string;
    RegBusinessName: string;
    RegisteredType: string;
    BrandUrl:string;
    Tags:Array<string>;
    PAN:string;
    
    GSTN:string;
    Address:Address;
    Name: string;  
    Password: string;
    CreatedDate:string;
    LastUpdatedDate:string;

  }
  
   class Address {
    Street: string;
    City: string;
    State: string;
    PostalCode: number;
  }
  