import { BrandModel } from "../model/brandModel";

export const Create = (brandModel: BrandModel) => {
  const BrandId = "BR" + new Date().getTime().toString(); 
  const now = new Date(); 

  const subscription = [
    {
      SubscriptionsId: "1",
      SubscriptionName: "MigoInventory",
      Period: "Long",
      Status:'Active'
    },
  ];

  const bankDetails = {
    BeneficiaryName: "",
    BranchIFCCode: "",
    AccountNumber: "",
    AccountHolderName: "",
  };

  const Address = {
    Street: "",
    PostalCode: "",
    City: "",
    States: "",
  };

  const brandRequest: any = {
    BrandId: BrandId,
    UserID: "",
    BrandName: brandModel.BrandName ? brandModel.BrandName : "",
    Domain: brandModel.Domain ? brandModel.Domain : "",
    Category: brandModel.Category ? brandModel.Category : "All",
    Mobile: brandModel.Mobile ? brandModel.Mobile : "",
    EmailId: brandModel.EmailId,
    Country: brandModel.Country ? brandModel.Country : "",
    CountryCode: brandModel.CountryCode ? brandModel.CountryCode : "+91",
    RegBusinessName: brandModel.RegBusinessName
      ? brandModel.RegBusinessName
      : "",
    RegisteredType: brandModel.RegisteredType ? brandModel.RegisteredType : "",
    BrandUrl: brandModel.BrandUrl ? brandModel.BrandUrl : "",
    Tags: brandModel.Tags ? brandModel.Tags : [],
    PAN: brandModel.PAN ? brandModel.PAN : "",
    GSTN: brandModel.GSTN ? brandModel.GSTN : "",
    Address: brandModel.Address ? brandModel.Address : Address,
    Website: brandModel.Website ? brandModel.Website : "",
    BillingName: brandModel.BillingName ? brandModel.BillingName : "",
    Name: brandModel.Name ? brandModel.Name : "",
    Password: brandModel.Password,
    PANOwnerName: brandModel.PANOwnerName ? brandModel.PANOwnerName : "",
    Subscriptions: brandModel.Subscriptions
      ? brandModel.Subscriptions
      : subscription,
    BankDetails: brandModel.BankDetails ? brandModel.BankDetails : bankDetails,
    CreatedAt: now.toLocaleString(),
    UpdatedAt: now.toLocaleString(),
    Status: "Active",
  };
  return brandRequest
};
