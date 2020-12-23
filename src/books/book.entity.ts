import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { Feeling } from 'src/feelings/feeling.entity';
import { FeelingProportionModel } from './models/feeling-proportion.model';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  isbn: string

  @Column()
  title: string

  @OneToMany(() => Feeling, feeling => feeling.book)
  feelings: Feeling[]

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Expose()
  get feelingsProportion(): FeelingProportionModel[]{
    let feelingsProportion: FeelingProportionModel[] = [];
    let feelingsProportionMap = {};
    for(const feeling of this.feelings){
      if(feelingsProportionMap[feeling.feelingType.id]){
        feelingsProportionMap[feeling.feelingType.id]++;
      } else {
        feelingsProportionMap[feeling.feelingType.id] = 1;
      }
    }

    // for(const property in feelingsProportionMap){
    //   feelingsProportion.push(new FeelingProportionModel({
    //     id: Number(property),
    //     amount: feelingsProportionMap[property],
    //     proportion: this.feelings.length / feelingsProportionMap[property]
    //   }))
    // }

    // feelingsProportion.sort((a, b)=>{
    //   return a.amount - b.amount
    // })

    return feelingsProportion;
  }

  constructor(partial: Partial<Book>) {
    Object.assign(this, partial);
  }
}