import { Injectable, Inject } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { Documents } from './documents.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @Inject('DocumentsRepository')
    private documentsRepository: Repository<Documents>,
  ) {}

  // 创建文档记录，并返回id
  async createDocument(documents: Documents): Promise<Documents> {
    return await this.documentsRepository.save(documents);
  }

  // 查询所有文档数据
  async findAll(): Promise<Documents[]> {
    return this.documentsRepository.find();
  }

  // 查询文档数据byIds
  async findByIds(ids: number[]): Promise<Documents[]> {
    return this.documentsRepository.findBy({
      id: In(ids),
    });
  }
}
