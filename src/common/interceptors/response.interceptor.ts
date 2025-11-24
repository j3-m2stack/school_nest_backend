import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const res = http.getResponse();
    const req = http.getRequest();

    return next.handle().pipe(
      map((response) => {
        let statusCode = res.statusCode;

        // Detect method-based expected status codes
        if (statusCode === 200 || statusCode === 201) {
          // do nothing; correct already
        } else {
          switch (req.method) {
            case 'POST':
              statusCode = 201;
              break;
            case 'GET':
              statusCode = 200;
              break;
            case 'PUT':
            case 'PATCH':
              statusCode = 200;
              break;
            case 'DELETE':
              statusCode = 200;
              break;
            default:
              statusCode = 200;
          }

          res.status(statusCode);
        }

        // If manually formatted earlier, return as is
        if (response?.statusCode !== undefined) {
          return response;
        }

        // Pagination support:
        // { data: [...], page, limit, total }
        if (
          response?.data !== undefined &&
          (response.page !== undefined ||
            response.limit !== undefined ||
            response.total !== undefined)
        ) {
          return {
            statusCode,
            message: 'Success',
            data: {
              items: response.data,
              page: response.page,
              limit: response.limit,
              total: response.total,
            },
          };
        }

        // Default normalized response
        return {
          statusCode,
          message: 'Success',
          data: response,
        };
      }),
    );
  }
}
