import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // 1️⃣ Log error but never crash server
    console.error('🔥 Error:', exception);

    // 2️⃣ Detect HTTP Nest errors
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // 3️⃣ Extract proper message
    const message =
      exception instanceof HttpException
        ? (exception.getResponse() as any).message ||
          (exception.getResponse() as any).error ||
          exception.message
        : 'Internal Server Error';

    // 4️⃣ Unified JSON response
    return response.status(status).json({
      statusCode: status,
      message,
      data: null,
    });
  }
}
