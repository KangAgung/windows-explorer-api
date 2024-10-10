import { Module } from '@nestjs/common';
import { FolderModule } from './folders/folder.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { defaultConfig } from 'src/config/database.config';
import { FileModule } from './files/file.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return defaultConfig(config);
      },
    }),
    FolderModule,
    FileModule,
  ],
})
export class AppModule {}
