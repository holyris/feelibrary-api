import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/modules/users/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService]
    }).compile();

    service = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);

  });

  // describe('register', () => {
  //   it('should return an new user', async () => {
  //     const result = [{
  //       id: "1",
  //       username: "test",
  //     }]


  //     jest.spyOn(service, "register").mockImplementation(() => await result);
  //     expect(await controller.register()).toBe

  //   })
  // })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
