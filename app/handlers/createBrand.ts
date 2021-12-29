import middy from "@middy/core";
import cors from "@middy/http-cors";
import { v4 as uuid } from "uuid";  
import { BrandRegisterModel } from "../model/brandRegisterModel";
import { CreateBrandSchema } from "../schemas/createBrandSchema";
import { SaveBrand } from "../services/saveBrand";
import commonMidleware from "../utils/commonMidleware";

const createBrand= async(event:any, context:any)=> { 
  const { brandName } = event.body;
  let brandRegstermodel: BrandRegisterModel = JSON.parse(event.body);
  console.info("Request Event",event);
  console.info("Request Body",event.body);
  const BrandId = "BR"+ new Date().getTime().toString();
  const UserId = "U"+ new Date().getTime().toString();
  const now = new Date();
  const endDate = new Date();
  endDate.setHours(now.getHours() + 1);
  const subscription= [{subscriptionName:"MigoInventory"}]
  const bankDetails= {
    BeneficiaryName: "",
    BranchIfscCode:"",
    AccountNumber:"",
    AccountHolderame:""
  }
  const Address = {
    Street: "",
    PostalCode: "",
    City: "",
    States: ""
  }
  
  
  const brandRequest: any = {
    BrandId: BrandId, 
    UserID:UserId,
    BrandName:brandRegstermodel.BrandName?brandRegstermodel.BrandName:"",
    Domain:brandRegstermodel.Domain,
    Category: brandRegstermodel.Category?brandRegstermodel.Category:"All",
    Mobile: brandRegstermodel.Mobile?brandRegstermodel.Mobile:"",
    EmailId:brandRegstermodel.EmailId,
    Country:brandRegstermodel.Country,
    Subscriptions:subscription,
    CountryCode: brandRegstermodel.CountryCode?brandRegstermodel.CountryCode:"+91",
    RegBusinessName: brandRegstermodel.RegBusinessName?brandRegstermodel.RegBusinessName:"",
    RegisteredType: brandRegstermodel.RegisteredType?brandRegstermodel.RegisteredType:"",
    BrandUrl:brandRegstermodel.BrandUrl?brandRegstermodel.BrandUrl:"",
    Tags:brandRegstermodel.Tags?brandRegstermodel.Tags:[],
    BankDetails:bankDetails,
    PAN:brandRegstermodel.PAN?brandRegstermodel.PAN:"",
    GSTN:brandRegstermodel.GSTN?brandRegstermodel.GSTN:"",
    Address: Address,
    PANOwnerName: brandRegstermodel.PANOwnerName ? brandRegstermodel.PANOwnerName : "",
    BillingName: brandRegstermodel.BillingName ? brandRegstermodel.BillingName : "",
    Name: brandRegstermodel.Name?brandRegstermodel.Name:"",
    Password: brandRegstermodel.Password,
    CreatedAt: now.toISOString(),
    UpdatedAt:now.toISOString(),
    Status: "Active",
    
  };
  let response = await SaveBrand(brandRequest);
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
}

 
 export const handler =  middy(createBrand).use(cors())
