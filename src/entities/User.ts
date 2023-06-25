import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  Unique,
} from "typeorm";

@Entity()
@Unique(["username"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true, type: "timestamptz", precision: 3 })
  last_login: Date;

  @Column({ nullable: true })
  token_jwt: string;

  @Column()
  created_by: string;

  @Column()
  updated_by: string;

  @CreateDateColumn({ type: "timestamptz", precision: 3 })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamptz", precision: 3 })
  updated_at: Date;
}
