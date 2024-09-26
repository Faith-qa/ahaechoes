import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
@Injectable()
export class CloudinaryService {
  async uploadImage(fileUri: string): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log('hello ok', fileUri);
      v2.uploader.upload(
        fileUri,
        {
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            console.log(error);
            return reject(error);
          }
          if (result && result.secure_url) {
            resolve(result.secure_url); // result is guaranteed to be defined here
          } else {
            reject(new Error('Upload result is undefined'));
          }
        },
      );
    });
  }
}
