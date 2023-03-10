import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RemoteApp } from '@seed/shared/model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MfeLookupService {
  constructor(private http: HttpClient) {}

  /**
   * Get Base App's module-federation.manifest config, containing all mfe name and url
   * return { name: 'shop-mfe', url: 'http://localhost:4301', path: '../shop-mfe' }
   */
  mfeApps$ = this.http.get<Record<string, string>>('assets/module-federation.manifest.json').pipe(
    map(json => {
      // TODO: read from each mfe app assets' mfe-config
      const apps: RemoteApp[] = [];
      for (const [key, value] of Object.entries(json)) {
        apps.push({ name: key, url: value, path: `../${key}` });
      }
      return apps;
    }),
  );
}
