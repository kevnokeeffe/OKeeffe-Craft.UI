import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getBaseEndpoint } from '../configuration/store/configuration.selectors';

/**
 * Request options passed to the parent http client in GET/POST/PUT/DELETE requests from api client
 */
export interface IRequestOptions {
  body?: any;
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]: string | string[];
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

/**
 * Used within app module to get an instance of the api client
 * @param http - base http client
 * @param store - NgRx store
 */
export function apiClientCreator(http: HttpClient, store: Store) {
  return new ApiClient(http, store);
}

/**
 * An extended implementation of the http client which prepends the api endpoint.
 */
@Injectable()
export class ApiClient {
  /**
   * Reference to the base API endpoint
   */
  private api: any;

  /**
   * Extending the HttpClient through the Angular DI.
   * @param http - injected http client
   * @param store - NgRx store
   */
  public constructor(public http: HttpClient, public store: Store) {
    // If you don't want to use the extended versions in some cases you can access the public property and use the original one.
    // for ex. this.httpClient.http.get(...)
    this.store.select(getBaseEndpoint).subscribe((base: any) => {
      if (base) {
        this.api = base;
      }
    });
  }

  /**
   * Get the full API endpoint from the relative path
   * Paths starting with 'mock:' are appended to the mock directory URL
   * Otherwise, paths are appended to the baseUrl set in environment config
   * @param endpoint - relative endpoint to parse
   */
  private getFullEndPoint(endpoint: string): string {
    // Check if this.baseUrl is defined before calling concat
    if (this.api) {
      return this.api.concat(endpoint);
    } else {
      // Handle the case where this.baseUrl is undefined
      return endpoint;
    }
  }

  /**
   * GET request
   * @param endpoint - relative to api base url (or 'mock:' endpoint)
   * @param options - request options of the request like headers, body, etc.
   * @returns Observable<T> - observable of data returned from API
   */
  public get<T>(endpoint: string, options?: IRequestOptions): Observable<T> {
    return this.http.get<T>(this.getFullEndPoint(endpoint), options);
  }

  /**
   * POST request
   * @param endpoint - relative to api base url (or 'mock:' endpoint)
   * @param params - body of the request.
   * @param options - request options of the request like headers, body, etc.
   * @returns Observable<T> - observable of data returned from API
   */
  public post<T>(
    endpoint: string,
    params: any,
    options?: IRequestOptions
  ): Observable<T> {
    return this.http.post<T>(this.getFullEndPoint(endpoint), params, options);
  }

  /**
   * PUT request
   * @param endpoint - relative to api base url (or 'mock:' endpoint)
   * @param params - body of the request.
   * @param options - request options of the request like headers, body, etc.
   * @returns Observable<T> - observable of data returned from API
   */
  public put<T>(
    endpoint: string,
    params: any,
    options?: IRequestOptions
  ): Observable<T> {
    return this.http.put<T>(this.getFullEndPoint(endpoint), params, options);
  }

  /**
   * PATCH request
   * @param endpoint - relative to api base url (or 'mock:' endpoint)
   * @param params - body of the request.
   * @param options - request options of the request like headers, body, etc.
   * @returns Observable<T> - observable of data returned from API
   */
  public patch<T>(
    endpoint: string,
    params: any,
    options?: IRequestOptions
  ): Observable<T> {
    return this.http.patch<T>(this.getFullEndPoint(endpoint), params, options);
  }

  /**
   * DELETE request
   * @param endpoint - relative to api base url (or 'mock:' endpoint)
   * @param options - request options of the request like headers, body, etc.
   * @returns Observable<T> - observable of data returned from API
   */
  public delete<T>(endpoint: string, options?: IRequestOptions): Observable<T> {
    return this.http.delete<T>(this.getFullEndPoint(endpoint), options);
  }
}
