import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Feeling } from '../feelings/feeling.entity';
import { FeelingProportionModel } from './models/feeling-proportion.model';

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

  @Exclude()
  @OneToMany(() => Feeling, feeling => feeling.movie, { eager: true })
  feelings: Feeling[]

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;

  @Expose()
  get feelingsAmount(): number {
    return this.feelings ? this.feelings.length : 0;
  }

  @Expose()
  get feelingsProportion() {
    let feelingsProportion: FeelingProportionModel[] = [];
    let feelingsProportionMap = {};
    for (const feeling of this.feelings) {
      if (feelingsProportionMap[feeling.feelingType.id]) {
        feelingsProportionMap[feeling.feelingType.id]++;
      } else {
        feelingsProportionMap[feeling.feelingType.id] = 1;
      }
    }

    for (const property in feelingsProportionMap) {
      feelingsProportion.push(new FeelingProportionModel({
        feelingTypeId: Number(property),
        amount: feelingsProportionMap[property],
        proportion: feelingsProportionMap[property] / this.feelings.length
      }))
    }

    feelingsProportion.sort((a, b)=>{
      return b.amount - a.amount
    })

    return feelingsProportion;
  }

  constructor(partial: Partial<Movie>) {
    Object.assign(this, partial);
  }
}