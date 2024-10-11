import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FileService } from './file.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateFileDto, FileResponse } from './dto/file.dto';

@Controller('files')
@ApiTags('Files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all files',
  })
  @ApiOkResponse({
    description: 'List of all files',
    type: FileResponse,
  })
  async getFiles(): Promise<FileResponse> {
    try {
      const files = await this.fileService.getAllFiles();
      return {
        message: 'Success get all files',
        data: files,
      };
    } catch (error) {
      console.error('Error has been occured:', error);
      throw new InternalServerErrorException();
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new file',
    description: 'create file',
  })
  @ApiCreatedResponse({
    type: FileResponse,
  })
  async createFile(
    @Body() createFileDto: CreateFileDto,
  ): Promise<FileResponse> {
    try {
      const { name, folderId } = createFileDto;
      const file = await this.fileService.create({ name, folderId });

      return {
        message: 'Success create new file',
        data: file,
      };
    } catch (error) {
      console.error('Error has been occured:', error);
      throw new InternalServerErrorException();
    }
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a file',
  })
  @ApiOkResponse({
    type: FileResponse,
  })
  async update(
    @Param('id') id: string,
    @Body() updateFileDto: CreateFileDto,
  ): Promise<FileResponse> {
    try {
      const file = await this.fileService.update(+id, {
        ...updateFileDto,
      });
      if (!file) {
        throw new NotFoundException();
      }

      return {
        message: 'Success change a file',
        data: file,
      };
    } catch (error) {
      console.error('Error has been occured:', error);

      if (error instanceof NotFoundException) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a file',
  })
  @ApiOkResponse({
    type: () => ({ message: String }),
  })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    try {
      const file = await this.fileService.remove(+id);
      if (file === null) {
        throw new NotFoundException();
      }

      return {
        message: 'Success delete a file',
      };
    } catch (error) {
      console.error('Error has been occured:', error);

      if (error instanceof NotFoundException) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }
}
