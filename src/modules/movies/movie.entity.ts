import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { Exclude, Expose, Transform } from 'class-transformer';
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

  @Transform(image => image ? process.env.TMDB_API_IMG_BASE_URL + "w500" + image : null)
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

  get feelingTypeAmounts(): Object {
    let feelingTypeAmounts = {};
    if (this.feelings) {
      for (const feeling of this.feelings) {
        if (feelingTypeAmounts[feeling.feelingType.id]) {
          feelingTypeAmounts[feeling.feelingType.id]++;
        } else {
          feelingTypeAmounts[feeling.feelingType.id] = 1;
        }
      }
    }
    return feelingTypeAmounts;
  }

  @Expose()
  get feelingsProportion() {
    let feelingsProportion: FeelingProportionModel[] = [];
    if (this.feelings) {
      for (const property in this.feelingTypeAmounts) {
        feelingsProportion.push(new FeelingProportionModel({
          feelingTypeId: Number(property),
          amount: this.feelingTypeAmounts[property],
          proportion: this.feelingTypeAmounts[property] / this.feelings.length
        }))
      }

      feelingsProportion.sort((a, b) => {
        return b.amount - a.amount
      })
    }

    return feelingsProportion;
  }

  constructor(partial: Partial<Movie>) {
    Object.assign(this, partial);
  }

  // Return the amount of feelings that matches feelingTypeIds
  calculateFeelingsAmountByFeelingTypeIds(feelingTypeIds: number[]): number {
    let feelingsAmount: number = 0;
    for (let feelingTypeId of feelingTypeIds) {
      feelingsAmount += this.feelingTypeAmounts[feelingTypeId]
    }
    return feelingsAmount;
  }
}