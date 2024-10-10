import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../../entities/file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async getAllFiles(): Promise<File[]> {
    return await this.fileRepository.find({ relations: ['folder'] });
  }

  async create({ name, folderId }): Promise<File> {
    try {
      const folder = this.fileRepository.create({
        name: name,
        folderId: folderId,
      });

      return await this.fileRepository.save(folder);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, { name, folderId }): Promise<File> {
    try {
      const folder = await this.fileRepository.findOneBy({ id: id });
      if (!folder) {
        return folder;
      }

      const merged = this.fileRepository.merge(folder, {
        name: name,
        folderId: folderId,
      });
      return await this.fileRepository.save(merged);
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number): Promise<void | null> {
    try {
      const folder = await this.fileRepository.findOneBy({ id: id });
      if (!folder) {
        return null;
      }

      await this.fileRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
