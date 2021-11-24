import middy from "@middy/core";
import { v4 as uuid } from "uuid";  
import { CreateBrandSchema } from "../schemas/createBrandSchema";
import { SaveBrand } from "../services/saveBrand";
import commonMidleware from "../utils/commonMidleware";

const createBrand= async(event:any, context:any)=> { 
  const { brandName } = event.body;

  console.info("Request Event",event);
  console.info("Request Body",event.body);
  const category= event.body.Category
  const now = new Date();
  const endDate = new Date();
  endDate.setHours(now.getHours() + 1);

  const brandRequest: any = {
    BrandId: uuid(), 
    Category:category,
    MobileNumber: "90009000090",
    CreatedAt: now.toISOString(), 
    Status: "Active"
  };
  let respose = await SaveBrand(brandRequest);
  return {
    statusCode: 200,
    body: JSON.stringify(respose),
  };
}

 
 export const handler = middy(createBrand);
   
  //.use(validator({ inputSchema: CreateBrandSchema }));
