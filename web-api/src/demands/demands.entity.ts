import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Demands {
  @PrimaryGeneratedColumn()
  id: number;

  // 需求状态
  @Column({
    default: 1,
  })
  status: number;

  // 龙猫需求地址
  @Column({
    default: '',
  })
  longMaoDemand: string;

  // 需求信息-关联文档表ids
  @Column({
    type: 'simple-array',
    charset: 'latin1',
  })
  demandIds: number[];

  // 相关文档-关联文档表ids
  @Column({
    type: 'simple-array',
  })
  relativeDocumentIds: number[];

  // 前端开发
  @Column({
    type: 'simple-array',
  })
  developers: string[];

  // 预审日期
  @Column({
    default: '',
  })
  preReviewDate: string;

  // 评审日期
  @Column({
    default: '',
  })
  reviewDate: string;

  // 技评日期
  @Column({
    default: '',
  })
  technicalReviewDate: string;

  // 提测日期
  @Column({
    default: '',
  })
  testDate: string;

  // 发布日期
  @Column({
    default: '',
  })
  publishDate: string;

  // 涉及应用
  @Column({
    type: 'simple-array',
  })
  relationalApps: string[];

  // 备注
  @Column({
    default: '',
  })
  remark: string;
}
