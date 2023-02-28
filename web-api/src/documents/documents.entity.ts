import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Documents {
  @PrimaryGeneratedColumn()
  id: number;

  // 需求名称
  @Column({
    default: '',
  })
  name: string;

  // 需求url
  @Column({
    default: '',
  })
  url: string;

  // 需求url类型
  @Column({
    default: -1,
  })
  type: number;
}
