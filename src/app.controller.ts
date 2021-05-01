import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ICryptoCurrrency } from './interfaces/crypto-currency.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAppName(): string {
    return 'BCB CC BE';
  }

  @Get('current-trading')
  public async getCurrentTrading(): Promise<ICryptoCurrrency[]> {
    return await this.appService.getCurrentTrading();
  }
}
