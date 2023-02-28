import { Injectable, Inject } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { Demands } from './demands.entity';
import { Documents } from '../documents/documents.entity';
import { DocumentsService } from '../documents/documents.service';

@Injectable()
export class DemandsService {
  constructor(
    @Inject('DemandsRepository')
    private demandsRepository: Repository<Demands>,

    @Inject('DocumentsService')
    private documentsService: DocumentsService,
  ) {}

  // 通过条件查询需求列表
  async findAll(params: any): Promise<Demands[]> {
    const { member, demandStatus, longMaoId, startDate, endDate } = params;

    return await this.demandsRepository
      .createQueryBuilder('post')
      .where('post.longMaoDemand LIKE :param', { param: '%' + longMaoId + '%' })
      .andWhere('post.status = :status', { status: demandStatus })
      .andWhere('publishDate BETWEEN :start AND :end', {
        start: startDate,
        end: endDate,
      })
      // .having('post.developers = :member', { member: member })
      // .andWhere('post.developers LIKE :member', { member: member })
      .orderBy('post.id', 'ASC')
      .getMany();
  }

  // 创建需求
  async create(tasks: Demands): Promise<void> {
    await this.demandsRepository.save(tasks);
  }

  // 创建文档记录，并返回id
  async createDocument(documents: Documents): Promise<Documents> {
    return await this.documentsService.createDocument(documents);
  }

  // 查询文档
  async queryDocumentByIds(ids: number[]): Promise<Documents[]> {
    return await this.documentsService.findByIds(ids);
  }
}
