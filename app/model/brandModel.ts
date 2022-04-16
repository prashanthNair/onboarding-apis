export class BrandModel {
  BrandId: string;
  UserId: string;
  Domain: string;
  Category: string;
  Mobile: string;
  EmailId: string;
  Country: string;
  City: string;
  ProfileLogUrl: string;
  Tags: Array<string>;
  Address: Address;
  BankDetails: BankDetails;
  Subscriptions: Array<Subscriptions>;
  ContactInfo: ContactInfo;
  BusinessDetails: BusinessDetails;
  Status: string;
  CreatedAt: string;
  UpdatedAt: string;
}
export class AccountCreation {
  EmailId: string;
  Password: string;
}

export class ContactInfo {
  Name: string;
  Mobile: string;
  CountryCode: string;
  PreferredLanguages: Array<string>;
}

export class BusinessDetails {
  BusinessName: string;
  BusinessType: string;
  Category: string;
  SubCategory: string;
  GSTIN: string;
  BusinessPAN: string;
  PANOwnerName: string;
  BrandName: string;
  PinCode: string;
  WebSiteLink: string;
}
export class Subscriptions {
  SubscriptionsId: string;
  SubscriptionName: string;
  Period: string;
  Status: string;
}
export class BankDetails {
  BeneficiaryName: string;
  IFSCode: string;
  AccountNumber: string;
  BankName: string;
}
export class Address {
  Street: string;
  City: string;
  State: string;
  PostalCode: string;
}
