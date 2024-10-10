import { response } from 'src/commons/utils';
import { Folder } from '../../../entities/folder.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFolderDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  parentId: number;
}

export class FolderResponse implements response {
  message: string = 'success';
  data?: Folder[] | Folder;
}
