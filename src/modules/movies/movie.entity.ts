import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Feeling } from '../feelings/feeling.entity';

@Entity()
export class Movie {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  releaseDate: Date;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => Feeling, feeling => feeling.movie)
  feelings: Feeling[]

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor(partial: Partial<Movie>) {
    Object.assign(this, partial);
  }
}