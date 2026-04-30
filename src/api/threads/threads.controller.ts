import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Post()
  @ApiBearerAuth('JwtAuthGuard')
  @UseGuards(JwtAuthGuard)
  create(@Body() createThreadDto: CreateThreadDto) {
    return this.threadsService.create(createThreadDto);
  }

  @Get()
  findAll() {
    return this.threadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.threadsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth('JwtAuthGuard')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateThreadDto: UpdateThreadDto,
    @Req() req: any,
  ) {
    const userId = Number(req.user?.userId);
    return this.threadsService.updateByUser(+id, userId, updateThreadDto);
  }

  @Delete(':id')
  @ApiBearerAuth('JwtAuthGuard')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Req() req: any) {
    const userId = Number(req.user?.userId);
    return this.threadsService.removeByUser(+id, userId);
  }

  @Get('my-threads/:id')
  @ApiBearerAuth('JwtAuthGuard')
  @UseGuards(JwtAuthGuard)
  findMyThreads(@Param('id') id: string) {
    return this.threadsService.findByUser(+id);
  }
}
