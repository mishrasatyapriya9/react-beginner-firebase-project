import {getDoc,collection, getDocs, doc} from "firebase/firestore"
import { db } from "../../config/Firebase";
import { useEffect, useState } from "react";
import { Post } from "./post"

 export interface Post {
    id:String,
    userId:String,
    title: string,
    username:string,
    description:string,
}


export const Main = () =>{
    //making a state which keep track of data we fetch
    const [postsList,setPostsList] = useState<Post[] | null>(null);
    const postsRef = collection(db,"posts");
     //which collection we gonna use
    //function which get posts from firebase database
    const getPosts = async() =>{
        const data = await getDocs(postsRef) 
        setPostsList(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as unknown as Post[]
            );    
    };
   
    useEffect(() =>{
        getPosts();
    }, [])
     return (
        <div> 
            {postsList?.map(
                (post)=>(<Post post={post}/>))  }
        </div>
    )
}
// export default Main;
