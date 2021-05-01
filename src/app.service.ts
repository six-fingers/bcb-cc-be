import {
    HttpException,
    HttpService,
    HttpStatus,
    Injectable,
    Logger,
} from '@nestjs/common';
import { AxiosResponse, AxiosError } from 'axios';
import { Observable } from 'rxjs';
import { IccCryptoCurrencies, IccCurrencies, IccResponse } from './interfaces/crypto-compare.interface';
import { ICryptoCurrrency } from './interfaces/crypto-currency.interface';
import { ICurrency } from './interfaces/currency.interface';

// DOCS in https://min-api.cryptocompare.com/documentation?key=Price&cat=multipleSymbolsFullPriceEndpoint
// Comma separated cryptocurrency symbols list [ Min length - 1] [ Max length - 1000] - form DOCS
const CRYPTOCURRENCY_LIST = 'BTC,ETH,XRP,LTC,BCH,ETC';
// Comma separated cryptocurrency symbols list to convert into [ Min length - 1] [ Max length - 100]
const CURRENCY_LIST = 'USD,GBP,EUR,JPY,ZAR';
@Injectable()
export class AppService {
    private readonly _logger = new Logger(AppService.name);

    constructor(private httpService: HttpService) {
        this.getCurrentTrading();
    }

    public async getCurrentTrading(): Promise<ICryptoCurrrency[]> {
        const axiosResponse = await this._getCurrentTradingObservable()
            .toPromise()
            .catch((error: AxiosError) => {
                throw new HttpException(
                    error.message,
                    parseInt(error?.code)
                        ? parseInt(error?.code)
                        : HttpStatus.INTERNAL_SERVER_ERROR,
                );
            });

        return this._mapCryptoCurrencies(axiosResponse.data.DISPLAY);
    }

    private _getCurrentTradingObservable(): Observable<AxiosResponse<IccResponse>> {
        const currentTradingUrl = 'https://min-api.cryptocompare.com/data/pricemultifull';
        const queryParams = `fsyms=${CRYPTOCURRENCY_LIST}&tsyms=${CURRENCY_LIST}`;

        this._logger.log(`Calling url: ${currentTradingUrl}`);
        this._logger.log(`With the following query parameters: ${currentTradingUrl}`);

        return this.httpService.get(`${currentTradingUrl}?${queryParams}`);
    }

    private _mapCryptoCurrencies(cryptoCurrencies: IccCryptoCurrencies): ICryptoCurrrency[] {
        return Object.keys(cryptoCurrencies).map((cryptoCurrencyKey) => {
            return {
                name: cryptoCurrencyKey,
                currencies: this._mapCurrencies(cryptoCurrencies[cryptoCurrencyKey])
            }
        });
    }

    private _mapCurrencies(currency: IccCurrencies): ICurrency[] {
        return Object.keys(currency).map((currencyKey) => {
            return {
                name: currencyKey,
                price: currency[currencyKey].PRICE,
                imageUrl: currency[currencyKey].IMAGEURL
            }
        });
    }

}
