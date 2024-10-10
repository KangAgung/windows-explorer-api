import { Module } from '@nestjs/common';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from '../../entities/folder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Folder, File])],
  controllers: [FolderController],
  providers: [FolderService],
})
export class FolderModule {}
