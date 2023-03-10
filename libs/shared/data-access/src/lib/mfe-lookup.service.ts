import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MfeConfig, RemoteApp } from '@seed/shared/model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MfeLookupService {
  constructor(private http: HttpClient) {}

  /**
   * Get Base App's mfe-configs config
   */
  mfeApps$: Observable<RemoteApp[]> = this.http.get<MfeConfig[]>('assets/mfe-configs.json').pipe(
    map(configs => {
      return configs.map(config => ({
        ...config,
        path: `../${config.remoteName}`,
      }));
    }),
  );
}
