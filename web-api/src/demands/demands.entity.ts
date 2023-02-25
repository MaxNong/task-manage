import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Remands {
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

  // 需求地址
  @Column({
    type: 'simple-array',
  })
  demandUrls: Array<{ name: string; url: string }>;

  // 相关文档
  @Column({
    type: 'simple-array',
  })
  relativeDocuments: Array<{ name: string; url: string }>;

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
