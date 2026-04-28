import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<any> {
    const hashedPassword = bcrypt.hashSync(data.password, 10);
    return this.prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password_hash: hashedPassword,
      },
    });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<any | null> {
    return this.prisma.user.findUnique({ where: { id: parseInt(id) } });
  }

  async findByEmail(email: string): Promise<any | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: string, data: Partial<UpdateUserDto>): Promise<any> {
    const updateData: any = { ...data };
    if (updateData.password) {
      updateData.password = bcrypt.hashSync(updateData.password, 10);
    }
    return this.prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
  }

  async remove(id: string): Promise<any> {
    return this.prisma.user.delete({ where: { id: parseInt(id) } });
  }
}
