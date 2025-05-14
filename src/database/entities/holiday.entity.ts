import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('holidays')
export class HolidayEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  name: string;

  @Column()
  localName: string;

  @Column()
  date: string;

  @Column()
  countryCode: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  launchYear: number;

  @Column({ default: false })
  fixed: boolean;

  @Column({ default: false })
  global: boolean;
}
