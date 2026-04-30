import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { ThreadsRepository } from './threads.repository';

@Injectable()
export class ThreadsService {
  constructor(private readonly repo: ThreadsRepository) {}

  async create(createThreadDto: CreateThreadDto) {
    const thread = await this.repo.create(createThreadDto as any);
    if (!thread) throw new NotFoundException('Failed to create thread');
    return thread;
  }

  findAll() {
    return this.repo.findAll();
  }

  async findOne(id: number) {
    const thread = await this.repo.findOne(id);
    if (!thread) throw new NotFoundException('Thread not found');
    return thread;
  }

  async updateByUser(
    id: number,
    userId: number,
    updateThreadDto: UpdateThreadDto,
  ) {
    const thread = await this.repo.findOne(id);
    if (!thread) throw new NotFoundException('Thread not found');
    if (thread.userId !== userId)
      throw new ForbiddenException('Not thread owner');
    return this.repo.update(id, updateThreadDto as any);
  }

  async removeByUser(id: number, userId: number) {
    const thread = await this.repo.findOne(id);
    if (!thread) throw new NotFoundException('Thread not found');
    if (thread.userId !== userId)
      throw new ForbiddenException('Not thread owner');
    return this.repo.remove(id);
  }

  findByUser(userId: number) {
    return this.repo.findByUser(userId);
  }

  update(id: number, updateThreadDto: UpdateThreadDto) {
    return this.repo.update(id, updateThreadDto as any);
  }

  remove(id: number) {
    return this.repo.remove(id);
  }
}
