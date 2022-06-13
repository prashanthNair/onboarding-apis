import {
  Address,
  AddressDetails,
  BankDetails,
  BrandModel,
  BusinessDetails,
  ContactInfo,
  Documents,
  ProfileCompletion,
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
      GSTNVerification: false,
      BrandName: '',
      WebSiteLink: '',
    };
    const bankDetails: BankDetails = {
      BeneficiaryName: '',
      IFSCode: '',
      AccountNumber: '',
      BankName: '',
    };

    const contactInfo: ContactInfo = {
      Name: '',
      Mobile: '',
      CountryCode: '',
      EmailId: '',
      Languages: [],
    };
    const address: Address = {
      AddressLine1: '',
      AddressLine2: '',
      Phone: '',
      PinCode: '',
      City: '',
      State: '',
    };

    const addressDetails: AddressDetails = {
      Logo: { Name: '', Url: '' },
      Signature: { Name: '', Url: '' },
      BillingAddress: address,
      ShippingAddress: address,
    };
    const profileCompletion: ProfileCompletion = {
      AccountActivation: 'Completed',
      BusinessDetails: '',
      ContactDetails: '',
      AddressDetails: '',
      BankDetails: '',
      Documents: '',
    };

    const documents: Documents = {
      AadhaarFront: {
        Uploaded: false,
        Verified: false,
        Url: '',
      },
      AadhaarBack: {
        Uploaded: false,
        Verified: false,
        Url: '',
      },
      BusinessProof: {
        Uploaded: false,
        Verified: false,
        Url: '',
      },
      Pan: {
        Uploaded: false,
        Verified: false,
        Url: '',
      },
    };
    const brandModelRequest: BrandModel = {
      BrandId: BrandId,
      UserId: '',
      Domain: '',
      Mobile: brandModel.Mobile,
      Category: brandModel.Category ? brandModel.Category : 'All',
      EmailId: brandModel.EmailId,
      ProfileLogUrl: brandModel.ProfileLogUrl ? brandModel.ProfileLogUrl : '',
      Tags: brandModel.Tags ? brandModel.Tags : [],
      AddressDetails: addressDetails,
      BankDetails: bankDetails,
      Subscriptions: [subscription],
      ContactDetails: brandModel.ContactDetails || contactInfo,
      Document: documents,
      BusinessDetails: businessDetails,
      ProfileCompletion: profileCompletion,
      ProfileCompletionScore: brandModel.ProfileCompletionScore,
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

export const CreateDocument = (model) => {
  return {
    Uploaded: model.Uploaded,
    Verified: model.Verified,
  };
};
