import { response } from 'src/commons/utils';
import { File } from '../../../entities/file.entity';
import { IsNumber, IsString } from 'class-validator';

export class CreateFileDto {
  @IsString()
  name: string;

  @IsNumber()
  folderId: number;
}

export class FileResponse implements response {
  message: string = 'success';
  data?: File[] | File;
}
