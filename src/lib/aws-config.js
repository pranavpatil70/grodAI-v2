import AWS from 'aws-sdk';

AWS.config.update({
  region: 'your-region', // e.g., 'us-east-1'
  credentials: new AWS.Credentials({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  }),
});

export const polly = new AWS.Polly(); 