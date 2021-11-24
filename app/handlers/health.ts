import { v4 as uuid } from "uuid";  

export const handler= async(event:any, context:any)=> { 

  let respose = {status:true, message: "Brand Api Health CHeck Passed"}
  return {
    statusCode: 200,
    body: JSON.stringify(respose),
  };
}

 
// export const handler = commonMidleware(createBrand);
   
  //.use(validator({ inputSchema: CreateBrandSchema }));
