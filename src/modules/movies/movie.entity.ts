import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Feeling } from '../feelings/feeling.entity';

@Entity()
export class Movie {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true, type: "text" })
  description: string;

  @Column({ nullable: true })
  releaseDate: Date;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => Feeling, feeling => feeling.movie)
  feelings: Feeling[]

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Movie>) {
    Object.assign(this, partial);
  }
}