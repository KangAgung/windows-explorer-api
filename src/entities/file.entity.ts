import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Folder } from './folder.entity';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'folder_id' })
  folderId: number;

  @ManyToOne(() => Folder, (folder) => folder.files)
  @JoinColumn({ name: 'folder_id', referencedColumnName: 'id' })
  folder: Folder;
}
