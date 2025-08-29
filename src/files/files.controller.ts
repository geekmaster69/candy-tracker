import { Controller, Post, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator, ParseUUIDPipe } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: 2 * 1024 * 1024 }
  }))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /^(image\/jpeg|image\/png|image\/gif|application\/pdf)$/ }),
          new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024, }),
        ]
      })
    ) file: Express.Multer.File
  ) {
    return this.filesService.uploadImage(file.buffer);
  }


  @Delete(':uuid')
  deleteFile(
    @Param('uuid', ParseUUIDPipe) uuid: string
  ) {
    return this.filesService.deleteFile(uuid);
  }



}
