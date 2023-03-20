import { Injectable, Inject } from '@nestjs/common';
import { Repository, Like, Between, Not } from 'typeorm';
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
    const {
      member,
      demandStatus,
      longMaoId,
      startDate,
      endDate,
      pageSize,
      page,
    } = params;

    const list = await this.demandsRepository.find({
      where: {
        longMaoDemand: longMaoId ? Like(`%${longMaoId}%`) : undefined,
        status: demandStatus
          ? demandStatus == 8
            ? Not(6)
            : demandStatus
          : undefined,
        publishDate:
          startDate && endDate ? Between(startDate, endDate) : undefined,
        developers: Like(`%${member}%`),
      },
      order: {
        publishDate: 'DESC',
      },
      skip: pageSize * (page - 1),
      take: pageSize,
    });

    return list;
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

  // 创建需求详情
  async findDetail(id: number): Promise<any> {
    return await this.demandsRepository.findBy({
      id: id,
    });
  }

  // 更新需求
  async updateDemand(demand: any): Promise<any> {
    const { id } = demand;
    return await this.demandsRepository.update(
      {
        id: id,
      },
      demand,
    );
  }
}
