export interface User{
    id:number
    Firstname:string
    Lastname:string
    Senderemail:string
    Password:string
    role:string
    issent:number
}
export interface Data{
    id: string,
    Senderemail: string,
    name:string
    role:string
    iat: number,
    exp: number
  }