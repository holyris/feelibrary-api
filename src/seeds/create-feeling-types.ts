import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { FeelingType } from '../modules/feeling-types/feeling-type.entity'
 
export default class CreateFeelingTypes implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(FeelingType)
      .values([
        { name: 'Joy' },
        { name: 'Fear' },
        { name: 'Sadness' },
        { name: 'Excitment' },
        { name: 'Anger' },
        { name: 'Incomprehension' },
        { name: 'Laugh' },
      ])
      .execute()
  }
}