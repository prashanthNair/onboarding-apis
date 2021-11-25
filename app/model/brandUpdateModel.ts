export class BrandUpdateModel {
    BrandId: string;
    Status: string;
    UserName: string;
    AccountPassword: string;
    BrandName: string;
    Category: string;
    Country: string;
    CountryCode: string;
    CreatedDate: string;
    Domain: string;
    EmailId: string;
    lastUpdatedDate: string;
    MobileNumber: string;
    RegBusinessName: string;
    RegisteredType: string;
    Subscriptions: string;
    Address:Address;
    }
    class Address {
        Street: string;
        City: string;
        State: string;
        PostalCode: number;
      }
