import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Remands } from './demands.entity';

@Injectable()
export class DemandsService {
  constructor(
    @Inject('PHOTO_REPOSITORY')
    private photoRepository: Repository<Remands>,
  ) {}

  async findAll(): Promise<Remands[]> {
    return this.photoRepository.find();
  }
  async create(tasks: Remands): Promise<void> {
    await this.photoRepository.save(tasks);
  }
}
