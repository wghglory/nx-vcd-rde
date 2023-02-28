import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MfeLookupService {
  constructor(private http: HttpClient) {}

  // { name: 'Shop App', path: 'shop-mfe' }
  mfeApps$ = this.http.get<Record<string, string>>('assets/module-federation.manifest.json').pipe(
    map(json => {
      const result: { name: string; url: string; path: string }[] = [];
      for (const [key, value] of Object.entries(json)) {
        result.push({ name: key, url: value, path: `../${key}` });
      }
      return result;
    }),
  );
}
