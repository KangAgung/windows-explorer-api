import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { File } from './file.entity';

@Entity('folders')
export class Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'parent_id', nullable: true })
  parentId: number;

  children?: Folder[];

  @OneToMany(() => File, (file) => file.folder)
  files: File[];
}
