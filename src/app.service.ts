import {
  HttpException,
  HttpService,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { AxiosResponse, AxiosError } from 'axios';

// DOCS in https://min-api.cryptocompare.com/documentation?key=Price&cat=multipleSymbolsFullPriceEndpoint
// Comma separated cryptocurrency symbols list [ Min length - 1] [ Max length - 1000] - form DOCS
const CRYPTOCURRENCY_LIST = 'BTC,ETH,XRP,LTC,BCH,ETC';
// Comma separated cryptocurrency symbols list to convert into [ Min length - 1] [ Max length - 100]
const CURRENCY_LIST = 'USD,GBP,EUR,JPY,ZAR';
@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  private readonly _logger = new Logger(AppService.name);

  public async getCurrentTrading(): Promise<AxiosResponse> {
    return await this._getCurrentTradingObservable()
      .toPromise()
      .catch((error: AxiosError) => {
        throw new HttpException(
          error.message,
          parseInt(error?.code)
            ? parseInt(error?.code)
            : HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  private _getCurrentTradingObservable() {
    const currentTradingUrl =
      'https://min-api.cryptocompare.com/data/pricemultifull';
    const queryParams = `fsyms=${CRYPTOCURRENCY_LIST}&tsyms=${CURRENCY_LIST}`;

    this._logger.log(`Calling url: ${currentTradingUrl}`);
    this._logger.log(
      `With the following query parameters: ${currentTradingUrl}`,
    );

    return this.httpService.get(`${currentTradingUrl}?${queryParams}`);
  }
}
