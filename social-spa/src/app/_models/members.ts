import { Photo } from "./photo"


export interface Members {
    id: number;
    userName: string;
    firstname: any
    lastname: any
    dateOfBirth: string
    created: string
    photoUrl: string
    age: number
    lastActive: string
    email: any
    gender: string
    knownAs: string
    country: string
    city: string
    photos: Photo[];
    introduction: string;
    lookingFor: string;
    interests: string;
   
  }
  
