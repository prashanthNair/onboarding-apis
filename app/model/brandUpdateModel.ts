export class BrandUpdateModel {
    BrandId: string;
    Status: string;
    Name: string;
    Password: string;
    BrandName: string;
    Category: string;
    Country: string;
    CountryCode: string;
    CreatedDate: string;
    Domain: string;
    EmailId: string;
    UpdatedAt: string;
    Mobile: string;
    RegBusinessName: string;
    RegisteredType: string;
    Subscriptions: string;
    Address:Address;
    GSTN:string;
    BankDetails:BankDetails
    }
    class Address {
        Street: string;
        City: string;
        State: string;
        PostalCode: number;
      }
class BankDetails{
  BeneficiaryName: String;
  BranchIfscCode:string;
  AccountNumber:string;
  AccountHolderame:string;
}