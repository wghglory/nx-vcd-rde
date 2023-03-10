import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@seed/feature/product/model';
import { RDEList } from '@seed/shared/model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private http: HttpClient) {}

  products$ = this.http.get<RDEList<Product>>('/api/products').pipe(map(res => res.values.slice(0, 10)));
}
