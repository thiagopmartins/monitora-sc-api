import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('government-constructions-amounts')
class GovernmentConstructionsAmounts {
  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  @Index({ unique: true })
  construction_amount_id: number;

  @Column()
  description: string;

  @Column()
  year: number;

  @Column()
  number: string;

  @Column()
  area: string;

  @Column()
  status: string;

  @Column()
  amount: number;

  @Column()
  cityId: number;

  @Column()
  cityDescription: string;

  @Column()
  projectLink: string;

  @Column()
  peExecuted: number;

  @Column()
  contracts: {
    id: number;
    description: string;
    number: number;
  }[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default GovernmentConstructionsAmounts;
