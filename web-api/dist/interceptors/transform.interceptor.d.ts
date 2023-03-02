import { NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}