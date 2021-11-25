const schema = {
    properties: {
      body: {
        type: 'object',
        properties: {
          brandId: {
            type: 'string',
          },
          Category: {
            type: 'string',
          },
          mobileNumber: {
            type: 'string',
          }
          
        },
         required: ['brandId','Category','mobileNumber'],
      },
    },
    required: ['body'],
  };

  export const UpdateBrandSchema=schema