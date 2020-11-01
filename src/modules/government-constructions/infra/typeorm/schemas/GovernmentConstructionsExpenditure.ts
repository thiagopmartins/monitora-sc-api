import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('government-constructions-expenditure')
class GovernmentConstructionsExpenditure {
  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  @Index({ unique: true })
  statusId: number;

  @Column()
  statusDesc: string;

  @Column()
  projectsAmount: number;

  @Column()
  projectsValue: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default GovernmentConstructionsExpenditure;
