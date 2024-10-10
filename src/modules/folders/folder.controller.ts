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
import { FolderService } from './folder.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateFolderDto, FolderResponse } from './dto/folder.dto';

@Controller('folders')
@ApiTags('Folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Get()
  @ApiOperation({
    summary: 'Get All Folders',
  })
  @ApiOkResponse({
    description: 'List of all folders',
    type: FolderResponse,
  })
  async getFolders(): Promise<FolderResponse> {
    try {
      const folders = await this.folderService.getAllFolders();
      return {
        message: 'Success get all folders',
        data: folders,
      };
    } catch (error) {
      console.error('Error has been occured:', error);
      throw new InternalServerErrorException();
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new folder',
    description: 'create folder',
  })
  @ApiCreatedResponse({
    type: FolderResponse,
  })
  async createFolder(
    @Body() createFolderDto: CreateFolderDto,
  ): Promise<FolderResponse> {
    try {
      const { name, parentId } = createFolderDto;
      const folder = await this.folderService.create({ name, parentId });

      return {
        message: 'Success create new folder',
        data: folder,
      };
    } catch (error) {
      console.error('Error has been occured:', error);
      throw new InternalServerErrorException();
    }
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a folder',
  })
  @ApiOkResponse({
    type: FolderResponse,
  })
  async update(
    @Param('id') id: string,
    @Body() updateFolderDto: CreateFolderDto,
  ): Promise<FolderResponse> {
    try {
      const folder = await this.folderService.update(+id, {
        ...updateFolderDto,
      });
      if (!folder) {
        throw new NotFoundException();
      }

      return {
        message: 'Success change a folder',
        data: folder,
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
    summary: 'Delete a folder',
  })
  @ApiOkResponse({
    example: {
      message: 'Success delete a folder',
    },
  })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    try {
      const folder = await this.folderService.remove(+id);
      if (folder === null) {
        throw new NotFoundException();
      }

      return {
        message: 'Success delete a folder',
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
