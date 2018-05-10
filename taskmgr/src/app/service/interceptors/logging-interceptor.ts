import { LoadingService } from './../../common/loading/loading.service';
import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler,
    HttpRequest, HttpResponse
} from '@angular/common/http';

import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
    count = 0;
    sum = 0;
    constructor(private loadingService: LoadingService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const started = Date.now();
        let ok: string;
        this.count++;
        this.loadingService.open();
        let _event: any;
        let _error: any;
        // extend server response observable with logging
        return next.handle(req)
            .pipe(
            tap(
                // Succeeds when there is a response; ignore other events
                event => {
                    ok = event instanceof HttpResponse ? 'succeeded' : '';
                    _event = event;
                },
                // Operation failed; error is an HttpErrorResponse
                error => {
                    ok = 'failed';
                    _error = error;
                }
            ),
            // Log when response observable either completes or errors
            finalize(() => {
                const elapsed = Date.now() - started;
                const msg = `${req.method} "${req.urlWithParams}"
                    ${ok} in ${elapsed} ms.`;
                this.sum++;
                if (this.count === this.sum) {
                    this.loadingService.close();
                }
            })
            );
    }
}
