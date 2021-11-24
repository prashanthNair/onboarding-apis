import middy from "@middy/core";
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
  const id = "BR"+ new Date().getTime().toString();
  const now = new Date();
  const endDate = new Date();
  endDate.setHours(now.getHours() + 1);

  const brandRequest: any = {
    BrandId: id, 
    Category: brandRegstermodel.Category,
    MobileNumber: brandRegstermodel.PhoneNumber,
    CreatedAt: now.toISOString(),
    UpdatedAt:now.toISOString(),
    Status: "Active"
  };
  let response = await SaveBrand(brandRequest);
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
}

 
 export const handler = middy(createBrand);
   
  //.use(validator({ inputSchema: CreateBrandSchema }));
