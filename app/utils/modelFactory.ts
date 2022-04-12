import {
  Address,
  BankDetails,
  BrandModel,
  BusinessDetails,
  ContactInfo,
  Subscriptions,
} from '../model/brandModel';

export const Create = (brandModel: BrandModel) => {
  try {
    const BrandId = 'BR' + new Date().getTime().toString();
    const now = new Date();

    const subscription: Subscriptions = {
      SubscriptionsId: '1',
      SubscriptionName: 'MigoInventory',
      Period: 'Long',
      Status: 'Active',
    };

    const businessDetails: BusinessDetails = {
      BusinessName: '',
      BusinessType: '',
      Category: '',
      SubCategory: '',
      GSTIN: '',
      BusinessPAN: '',
      PANOwnerName: '',
      BrandName: '',
      PinCode: '',
      WebSiteLink: '',
    };
    const bankDetails: BankDetails = {
      BeneficiaryName: '',
      IFCCode: '',
      AccountNumber: '',
    };
    const contactInfo: ContactInfo = {
      Name: '',
      Mobile: '',
      CountryCode: '',
      Language: '',
    };
    const address: Address = {
      Street: '',
      PostalCode: '',
      City: '',
      State: '',
    };
    const brandModelRequest: BrandModel = {
      BrandId: BrandId,
      UserId: '',
      Domain: '',
      Mobile: brandModel.Mobile,
      Category: brandModel.Category ? brandModel.Category : 'All',
      EmailId: brandModel.EmailId,
      Country: brandModel.Country ? brandModel.Country : '',
      City: brandModel.City ? brandModel.City : '',
      ProfileLogUrl: brandModel.ProfileLogUrl ? brandModel.ProfileLogUrl : '',
      Tags: brandModel.Tags ? brandModel.Tags : [],
      Address: address,
      BankDetails: bankDetails,
      Subscriptions: [subscription],
      ContactInfo: contactInfo,
      BusinessDetails: businessDetails,
      Status: 'Active',
      CreatedAt: now.toUTCString(),
      UpdatedAt: now.toUTCString(),
    };
    return brandModelRequest;
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
