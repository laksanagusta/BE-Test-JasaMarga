import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { RuasCoordinates } from "./RuasCoordinates";

@Entity()
export class Ruas extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ruas: string;

  @Column()
  km_awal: string;

  @Column()
  km_akhir: string;

  @Column()
  status: boolean;

  @OneToMany(() => RuasCoordinates, (ruasCoordinates) => ruasCoordinates.ruas, {
    cascade: true,
  })
  ruasCoordinates: RuasCoordinates[];

  @Column()
  created_by: string;

  @Column()
  updated_by: string;

  @CreateDateColumn({ type: "timestamptz", precision: 3 })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamptz", precision: 3 })
  updated_at: Date;
}
