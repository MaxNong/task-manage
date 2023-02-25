import { Controller, Post, Body, Get } from '@nestjs/common';
import { DemandsService } from './demands.service';
import { Remands } from './demands.entity';

@Controller('demands')
export class TasksController {
  constructor(private readonly remandsService: DemandsService) {}
  /**
   * 创建数据
   * @param params
   * @returns
   */
  @Post('/create')
  async create(@Body() params) {
    const {
      status,
      longMaoDemand = '',
      demandUrls = [],
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
    const remands = new Remands();

    remands.status = status;
    remands.longMaoDemand = longMaoDemand;
    remands.demandUrls = demandUrls;
    remands.relativeDocuments = relativeDocuments;
    remands.developers = developers;
    remands.preReviewDate = preReviewDate;
    remands.reviewDate = reviewDate;
    remands.technicalReviewDate = technicalReviewDate;
    remands.testDate = testDate;
    remands.publishDate = publishDate;
    remands.relationalApps = relationalApps;
    remands.remark = remark;

    return await this.remandsService.create(remands);
  }

  @Get('list')
  async findAll() {
    return await this.remandsService.findAll();
  }
}
