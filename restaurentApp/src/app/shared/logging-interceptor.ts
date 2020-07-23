import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class LoginInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('outgoin request');
        console.log(req.url);
        return next.handle(req).pipe(tap((event) => {
            if ( event.type === HttpEventType.Response) {
                console.log('Incoming Res', event.body);
            }
        }));
    }
}
