import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { Annonce } from '../models/annonce';
@Injectable({
providedIn: 'root'
})
export class AnnonceService {
private readonly apiUrl = 'http://localhost:3000/api/annonces';
constructor(private http: HttpClient) {}
getAnnonces(): Observable<Annonce[]> {
return this.http.get<Annonce[]>(this.apiUrl);
}
getAnnonceById(id: string): Observable<Annonce> {
return this.http.get<Annonce>(`${this.apiUrl}/${id}`);
}
addAnnonce(annonce: Annonce): Observable<Annonce> {
return this.http.post<Annonce>(this.apiUrl, annonce);
}
updateAnnonce(id: string, annonce: Annonce): Observable<Annonce> {
return this.http.put<Annonce>(`${this.apiUrl}/${id}`, annonce);
}
deleteAnnonce(id: string): Observable<{ message: string }> {
return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
}
}
