import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Ruas } from "./Ruas";

@Entity()
export class RuasCoordinates extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ruas, (ruas) => ruas.ruasCoordinates, {
    onDelete: "CASCADE",
  })
  ruas: Ruas;

  @Column()
  coordinates: string;

  @Column()
  created_by: string;

  @Column()
  updated_by: string;

  @CreateDateColumn({ type: "timestamptz", precision: 3 })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamptz", precision: 3 })
  updated_at: Date;
}
