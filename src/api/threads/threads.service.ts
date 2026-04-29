import { Injectable } from '@nestjs/common';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { ThreadsRepository } from './threads.repository';

@Injectable()
export class ThreadsService {
  constructor(private readonly repo: ThreadsRepository) {}

  create(createThreadDto: CreateThreadDto) {
    return this.repo.create(createThreadDto as any);
  }

  findAll() {
    return this.repo.findAll();
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  update(id: number, updateThreadDto: UpdateThreadDto) {
    return this.repo.update(id, updateThreadDto as any);
  }

  remove(id: number) {
    return this.repo.remove(id);
  }
}
