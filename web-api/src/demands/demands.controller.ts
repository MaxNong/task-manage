import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { DemandsService } from './demands.service';
import { Demands } from './demands.entity';
import { Like } from 'typeorm';

@Controller('demands')
export class DemandsController {
  constructor(private readonly remandsService: DemandsService) {}
  // 创建需求
  @Post('/create')
  async create(@Body() params) {
    const {
      status,
      longMaoDemand = '',
      demandDocuments = [],
      relativeDocuments = [],
      developers = [],
      preReviewDate = '',
      reviewDate = '',
      technicalReviewDate = '',
      testDate = '',
      publishDate = '',
      relationalApps = [],
      remark = '',
    } = params;
    const demands = new Demands();

    demands.status = status;
    demands.longMaoDemand = longMaoDemand;

    demands.demandIds = [];
    for (let index = 0; index < demandDocuments.length; index++) {
      const saveItem = await this.remandsService.createDocument(
        demandDocuments[index],
      );
      demands.demandIds.push(saveItem.id);
    }

    demands.relativeDocumentIds = [];
    for (let index = 0; index < relativeDocuments.length; index++) {
      const saveItem = await this.remandsService.createDocument(
        relativeDocuments[index],
      );
      demands.relativeDocumentIds.push(saveItem.id);
    }

    demands.developers = developers;
    demands.preReviewDate = preReviewDate;
    demands.reviewDate = reviewDate;
    demands.technicalReviewDate = technicalReviewDate;
    demands.testDate = testDate;
    demands.publishDate = publishDate;
    demands.relationalApps = relationalApps;
    demands.remark = remark;

    return await this.remandsService.create(demands);
  }

  // 查询需求列表数据
  @Get('list')
  async findAll(@Query() params) {
    const data: any = await this.remandsService.findAll(params);

    for (let index = 0; index < data.length; index++) {
      const demandDocuments = await this.remandsService.queryDocumentByIds(
        data[index].demandIds,
      );
      data[index].demandDocuments = demandDocuments;
    }

    for (let index = 0; index < data.length; index++) {
      const relativeDocuments = await this.remandsService.queryDocumentByIds(
        data[index].relativeDocumentIds,
      );
      data[index].relativeDocuments = relativeDocuments;
    }

    return data;
  }
}
