import { Test, TestingModule } from '@nestjs/testing';
import { EmailsendService } from './emailsend.service';

describe('EmailsendService', () => {
  let service: EmailsendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailsendService],
    }).compile();

    service = module.get<EmailsendService>(EmailsendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
