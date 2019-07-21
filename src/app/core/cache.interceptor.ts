import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from './cache.service';


export class CacheInterceptor implements HttpInterceptor {

    constructor(private cacheService: CacheService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        if (req.method !== 'GET') {
            this.cacheService.invalidateCache();
        }
        const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url);
        if (cachedResponse !== undefined) {
         return of(cachedResponse);
        }

        return next.handle(req).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    this.cacheService.put(req.url, event);
                    let reponse: HttpResponse<any>;
                    reponse  = event;

                }
                return of(event);
            })
        );
    }

}
