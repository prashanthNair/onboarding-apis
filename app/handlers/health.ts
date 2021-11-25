 
import commonMidleware from "../utils/commonMidleware";

export const healthCheck= async(event:any, context:any)=> { 

  let respose = {status:true, message: "Brand Api Health CHeck Passed"}
  return {
    statusCode: 200,
    body: JSON.stringify(respose),
  };
}

 export const handler = commonMidleware(healthCheck);
    
