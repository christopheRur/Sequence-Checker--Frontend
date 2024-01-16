import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sequence } from '../sequence';


@Injectable({
  providedIn: 'root'
})
export class SequencerService {

  private apiServeUrl=environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
/**
 *Retrieve all sequence number in db.
 * @returns Observable
 */
  public retrieveSequences():Observable<sequence[]>{
    return this.http.get<sequence[]>(`${this.apiServeUrl}/seq/getseq`);
  }
/**
 *Retrieve jackpot sequence digit
 * @param sequence any
 * @returns Observable
 */
  public retrieveJackpot(sequence:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.apiServeUrl}/seq/getjackpot`,sequence);
  }
/**
 * Retrieve series with 4 matching digits
 * @param sequence any
 * @returns Observable
 */
  public retrieve4SeqList(sequence:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.apiServeUrl}/seq/get4Seq`,sequence);
  }

/**
 *  Retrieve series with 3 matching digits
 * @param sequence any
 * @returns Observable
 */
  public retrieve3SeqList(sequence:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.apiServeUrl}/seq/get3Seq`,sequence);
  }
/**
 *  Retrieve series with 2 matching digits
 * @param sequence any
 * @returns Observable
 */
  public retrieve2SeqList(sequence:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.apiServeUrl}/seq/get2Seq`,sequence);
  }

  /**
 *  Retrieve series with 1 matching
 * @param sequence any
 * @returns Observable
 */
  public retrieve1SeqList(sequence:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.apiServeUrl}/seq/get1Seq`,sequence);
  }



/**
 *Add sequence in db
 * @param sequence any
 * @returns Observable
 */
  public addSequences(sequence:any):Observable<any>{

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.apiServeUrl}/seq/addseq`,sequence);
  }



}
