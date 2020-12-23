import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User(createUserDto);
    return this.usersRepository.save(user).catch(err => {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(err.message);
      } else {
        throw new InternalServerErrorException('unhandled exception: ' + err)
      }
    });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } })
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
