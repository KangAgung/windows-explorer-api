import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Folder } from '../../entities/folder.entity';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private folderRepository: Repository<Folder>,
  ) {}

  private transformData(folders: Folder[], parentId?: number): Folder[] {
    return folders
      .filter((folder) => folder.parentId === parentId)
      .map((item) => {
        return {
          ...item,
          children: this.transformData(folders, item.id),
        };
      });
  }

  async getAllFolders(): Promise<Folder[]> {
    const folder = await this.folderRepository.find({
      relations: ['files'],
    });

    return this.transformData(folder, null);
  }

  async create({ name, parentId = null }): Promise<Folder> {
    try {
      const folder = this.folderRepository.create({
        name: name,
        parentId: parentId,
      });

      return await this.folderRepository.save(folder);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, { name, parentId = null }): Promise<Folder> {
    try {
      const folder = await this.folderRepository.findOneBy({ id: id });
      if (!folder) {
        return folder;
      }

      const merged = this.folderRepository.merge(folder, {
        name: name,
        parentId: parentId,
      });
      return await this.folderRepository.save(merged);
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number): Promise<void | null> {
    try {
      const folder = await this.folderRepository.findOneBy({ id: id });
      if (!folder) {
        return null;
      }

      await this.folderRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
