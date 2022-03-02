export class BrandModel {
  BrandId: string;
  UserId: string;
  BrandName: string;
  Domain: string;
  Category: string;
  Mobile: string;
  EmailId: string;
  Country: string;
  CountryCode: string;
  RegBusinessName: string;
  RegisteredType: string;
  BrandUrl: string;
  Tags: Array<string>;
  PAN: string;
  GSTN: string;
  Address: Address;
  Website: string;
  BillingName: string;
  Name: string;
  Password: string;
  PANOwnerName: string;
  BankDetails: BankDetails;
  Subscriptions: Subscriptions;
  Status: string;
  CreatedAt: string;
  UpdatedAt: string;
}
class Subscriptions {
  SubscriptionsId: string;
  SubscriptionName: string;
  period: string;
}
class BankDetails {
  BeneficiaryName: string;
  BranchIFCCode: string;
  AccountNumber: string;
  AccountHolderName: string;
}
class Address {
  Street: string;
  City: string;
  States: string;
  PostalCode: string;
}
