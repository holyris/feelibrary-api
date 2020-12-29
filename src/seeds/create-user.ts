import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { User } from 'src/modules/users/user.entity'
import { hash } from 'argon2';

export default class CreateUser implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { username: 'test', password: await hash('test') },
      ])
      .execute()
  }
}