import { Exclude } from "class-transformer";
import { Feeling } from "src/modules/feelings/feeling.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class FeelingType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @OneToMany(() => Feeling, feeling => feeling.feelingType)
  feelings: Feeling[];

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor(partial: Partial<Feeling>) {
    Object.assign(this, partial);
  }

}