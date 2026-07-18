import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

// All routes here live under /upload
@Controller('upload')
export class UploadController {
  // Step 1 — Accept a single file sent as multipart/form-data under the field "file".
  // FileInterceptor('file') tells Nest which form field holds the upload.
  // @UploadedFile() gives us the parsed file.
  // Try: POST /upload  with a form-data field "file"
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // The file lives in memory (file.buffer). We just report its details.
    return {
      originalName: file.originalname,
      mimeType: file.mimetype,
      sizeInBytes: file.size,
    };
  }

  // Step 2 — Same thing, but validate the file first.
  // ParseFilePipe runs the validators and rejects the request (400) if any fail.
  // Here: max 1 MB, and images only.
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 }), // 1 MB
          new FileTypeValidator({ fileType: /^image\// }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return {
      message: 'Valid image received.',
      originalName: file.originalname,
      sizeInBytes: file.size,
    };
  }
}
