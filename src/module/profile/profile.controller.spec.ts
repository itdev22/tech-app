import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

describe('UserController', () => {
  let appController: ProfileController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [ProfileService],
    }).compile();

    appController = app.get<ProfileController>(ProfileController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getProfile()).toBe('Hello World!');
    });
  });
});
