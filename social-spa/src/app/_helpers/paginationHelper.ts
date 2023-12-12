import { HttpClient, HttpParams } from "@angular/common/http";
import { PaginatedResults } from "../_models/pagination";
import { map } from "rxjs";

export function getPaginationResult<T>(url: string,params: HttpParams,http:HttpClient){
    const paginatedResult: PaginatedResults<T> = new PaginatedResults<T>();
    return http.get<T>(url,{observe: 'response', params}).pipe(
     map((res)=>{

    if(res.body){
        paginatedResult.results=res.body;
    }
   const pagination = res.headers.get('Pagination');

   if(pagination){

    paginatedResult.pagination=JSON.parse(pagination);
   }

   return paginatedResult;

   })


    )

    
}


export function getPaginationHeader(pageNumber:number,pageSize:number){

let params = new HttpParams();
params=params.append('pageNumber', pageNumber);
params=params.append('pageSize', pageSize);



}