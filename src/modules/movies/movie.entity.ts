import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Feeling } from 'src/modules/feelings/feeling.entity';

@Entity()
export class Movie {
  @PrimaryColumn()
  id: number;

  @Column({unique: true})
  tmdbId: number;

  @Column({nullable:false})
  title: string;

  @Column()
  description: string;

  @Column()
  releaseDate: Date;

  @Column()
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