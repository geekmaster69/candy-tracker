import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { v2 as cloudinary } from 'cloudinary'
import { UploadApiResponse } from 'cloudinary';
import { envs } from 'src/config/environments/envs';

const folder = 'candyTracker';
@Injectable()
export class FilesService {




  constructor() {

    cloudinary.config({
      cloud_name: envs.cloudName,
      api_key: envs.cloudApiKey,
      api_secret: envs.cloudApiSecret
    });
  }

  async uploadImage(fileBuffer: Buffer) {
    const fileName = randomUUID();

    const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: folder,
          public_id: fileName,
        },
        (error, uploadResult) => {
          if (error) {
            console.log(error);
            return reject(new InternalServerErrorException('Error to upload file'))
          }
          return resolve(uploadResult);
        }).end(fileBuffer);
    });

    return {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id
    }

  }



  deleteFile(fileName: string) {
    return cloudinary.uploader.destroy(`${folder}/${fileName}`);
  }



}
