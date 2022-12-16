import { S3 } from 'aws-sdk';

const s3 = new S3({
    // DONT HOLD THESE ON FRONTEND
    accessKeyId: '46D27BDB98E838AF9900',
    secretAccessKey: 'x0zlYq0zffZvDBBRNjW1aYodTjr5iO9P3aaHgJ84',
    endpoint: 'https://s3.filebase.com',
    region: 'us-east-1',
    signatureVersion: 'v4',
});

export default async function uploadJSON(jsonData) {
    const params = {
        Bucket: 'web25bucket',
        Key: 'ipfs-file',
        Body: JSON.stringify(jsonData),
        ContentType: 'application/json; charset=utf-8'
    };
    
    const request = s3.putObject(params);
    request.on('complete', (response) => {
        // CID
        console.log(response.httpResponse.headers['x-amz-meta-cid']);
    });

    request.on('error', (error) => {
        console.error(error);
    });

    request.send();
}
