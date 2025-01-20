import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly baseUrl = 'http://rest-items.research.cloudonix.io/items';
  private readonly headers = new HttpHeaders({
    Authorization: `Bearer 01234567890`, // Substitua pelo token dinâmico, se necessário
  });

  constructor(private http: HttpClient) {}

  /**
   * Retorna a lista de produtos.
   */
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, { headers: this.headers });
  }

  /**
   * Retorna os detalhes de um produto pelo ID.
   * @param id ID do produto
   */
  getProductById(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  /**
   * Cria um novo produto.
   * @param product Objeto contendo os dados do produto
   */
  createProduct(product: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, product, {
      headers: this.headers,
    });
  }

  /**
   * Atualiza os detalhes de um produto.
   * @param id ID do produto a ser atualizado
   * @param updatedData Objeto contendo os dados atualizados
   */
  updateProduct(id: number, updatedData: any): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.patch<any>(url, updatedData, {
      headers: this.headers,
    });
  }

  /**
   * Exclui um produto pelo ID.
   * @param id ID do produto a ser excluído
   */
  deleteProduct(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers });
  }
}
