export class BrandModel {
  BrandId: string;
  UserId: string;
  Domain: string;
  Category: string;
  Mobile: string;
  EmailId: string;
  ProfileLogUrl: string;
  Tags: Array<string>;
  AddressDetails: AddressDetails;
  BankDetails: BankDetails;
  Subscriptions: Array<Subscriptions>;
  ContactDetails: ContactInfo;
  BusinessDetails: BusinessDetails;
  Document: Documents;
  ProfileCompletion: ProfileCompletion;
  ProfileCompletionScore: number;
  Status: string;
  CreatedAt: string;
  UpdatedAt: string;
}
export class AccountCreation {
  EmailId: string;
  Password: string;
  UserType: string;
}
export class ProfileCompletion {
  AccountActivation: string;
  BusinessDetails: string;
  ContactDetails: string;
  AddressDetails: string;
  BankDetails: string;
  Documents: string;
}
export class ContactInfo {
  Name: string;
  Mobile: string;
  CountryCode: string;
  EmailId: string;
  Languages: Array<string>;
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
  GSTNVerification: boolean;
  WebSiteLink: string;
}

export class AddressDetails {
  BillingAddress: Address;
  ShippingAddress: Address;
  Logo: any;
  Signature: any;
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
  AddressLine1: string;
  AddressLine2: string;
  PinCode: string;
  City: string;
  State: string;
  Phone: string;
}

export class Documents {
  AadhaarFront: {
    Url: string;
    Uploaded: boolean;
    Verified: boolean;
  };
  AadhaarBack: {
    Url: string;
    Uploaded: boolean;
    Verified: boolean;
  };
  BusinessProof: {
    Url: string;
    Uploaded: boolean;
    Verified: boolean;
  };
  Pan: {
    Url: string;
    Uploaded: boolean;
    Verified: boolean;
  };
}
export class DocumentModel {
  BrandId: string;
  AadhaarFront: {
    Url: string;
    Uploaded: boolean;
    Verified: boolean;
  };
  AadhaarBack: {
    Url: string;
    Uploaded: boolean;
    Verified: boolean;
  };
  BusinessProof: {
    Url: string;
    Uploaded: boolean;
    Verified: boolean;
  };
  Pan: {
    Url: string;
    Uploaded: boolean;
    Verified: boolean;
  };
}
