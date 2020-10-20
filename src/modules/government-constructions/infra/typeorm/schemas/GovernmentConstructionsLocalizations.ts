import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('government-constructions-localizations')
class GovernmentConstructionsLocalizations {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @Index({ unique: true })
  construction_id: string;

  @Column()
  description: string;

  @Column()
  nuLatitude: number;

  @Column()
  nuLongitude: number;

  @Column()
  urlPin: string;

  @Column()
  heatMapValue: number;

  @Column()
  coordenates: number[];

  @Column()
  projectsId: number[];

  @Column()
  contracts: {
    id: number;
    constructionSitesId: number[];
  }[];

  @Column()
  heatMapQuantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default GovernmentConstructionsLocalizations;
