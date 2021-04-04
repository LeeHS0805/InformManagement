import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { RuntimeException } from "@nestjs/core/errors/exceptions/runtime.exception";


@Catch(HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = HttpStatus.BAD_REQUEST;
    response
      .status(status)
      .json({
        code: status,
        errMsg: "服务端请求错误！"
      });
  }
}

@Catch(RuntimeException)
export class RuntimeErrorFilter implements ExceptionFilter {
  catch(exception: RuntimeException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = HttpStatus.BAD_REQUEST;
    response
      .status(status)
      .json({
        code: status,
        errMsg: "服务器内部错误！"
      });
  }
}