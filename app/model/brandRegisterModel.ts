export class BrandRegisterModel {
    BrandId:string;
    Status:string;
    BrandName:string;
    Domain: string;
    Category: string; 
    Country: string;
    EmailId: string;
    PhoneNumber: number;
    CountryCode: string;
    RegBusinessName: string;
    RegisteredType: string;
    BrandUrl:string;
    Tags:string;
    PAN:string;
    GST:string;
    Address:Address;
    UserName: string;  
    AccountPassword: string;
    CreatedDate:string;
    LastUpdatedDate:string;

  }
  
   class Address {
    Street: string;
    City: string;
    State: string;
    PostalCode: number;
  }