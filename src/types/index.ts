export interface UserTypes{
    "is_normaluser"?:true, 
    "is_restaunt"?:true,
    "is_superuser"?:true,
    "is_matatu"? : true,
    "is_filmmaker"? : true,
    "is_contentcreator"? : true,
    "is_recordlabel"? : true,
    "is_controller"?:true,
}
export interface ErrorType { 
    status:number, 
    data:{
        [key:string]:string
    }
}

export interface MusicItemProp {
    name: string;
    description: string;
    id: number;
    media: {
        id: number
        media_url: string
    }
    created_at: string
    views?: number;
    owner: {
        id: number
        username: string
        email: string
    }
    genres: {
        id: number;
        name: string;
        image: string;
        description: string;
        genreId: number;
    }
    video_thumbnail: string,
}

export interface IMatatuType{
    name: string
    number_plate: string
    route: number
    number_of_seats?: number
    is_trial?: boolean
    image_interior?: string
    image_exterior?: string
    owner?: string
    id?: string
}
export interface Mix{ 
    name: string,
    video_thumbnail?: string,
    owner:{
        username?:string,
        id?:string,
    },
    media:{
        media_url: string
    },
    views?:string, 
    id: string 
}
export type IContentCreatorsType = {
    email: string
    id: string | number
    username: string
}

  export interface Artist {
    id: string;
    artist_stage_name: string;
    
  }

  export interface SingleCreator {
    id: string;
    title: string;
    thumbnailUrl: string;
  }
export interface MediaInformation {
    id: number;
    owner: {
        username: string;
        id: number;
        email: string;
    };
    name: string;
    video_thumbnail: string;
    views: number;
    description: string;
    created_at: string;
    media: {
        id: number;
        media_url: string;
    };
    genres: {
        id: number;
        name: string;
        image: string;
        description: string;
    };
 }
