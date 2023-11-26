import { addDoc, collection ,query, where} from "firebase/firestore";
// query specify what we gonna get directly from firestore database
import {Post as IPost} from "./Main"
import { auth,db } from "../../config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDocs,deleteDoc,doc } from "firebase/firestore";
import { date } from "yup";
import { useEffect, useState } from "react";
interface Props {
     post: IPost;
}

interface Like {
    likeId: string;
    userId: string;
}


// before using props in the typescript we have to make a interface means how the props gonna look like 

export const Post = (props: Props) =>{
    const [user] = useAuthState(auth);
    const {post } = props;

   const [Likes,setLikes ] = useState<Like[] | null>(null);

   const likesRef = collection(db,"likes");
   const likesDoc  = query(likesRef,where("postId","==",post.id))

   const getLikes = async() =>{
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId,likeId:doc.id })));
   }
    //first what field we want to compare ,2nd what operation
    const addLike = async() => {   
        try{ 
        const newDoc = await addDoc(likesRef,{userId:user?.uid, postId:post.id 
        });
        if(user){
        setLikes((prev) =>
        prev? [...prev, { userId:user.uid, likeId:newDoc.id}] : [{ userId: user?.uid ,likeId:newDoc.id}]
        )
        }
    } catch (err) {
        console.log(err);
    }
    };

    const removeLike = async() => {   
        try{ 
            const likeTodeleteQuery = query(likesRef,
                where("postId","==",post.id),
                where("userId" ,"==","user?.uid")
                );
        const likeTodeleteData = await getDocs(likeTodeleteQuery) 
        const likeId = likeTodeleteData.docs[0].id
        const likeTodelete = doc(db,"likes",likeId)
        await deleteDoc(likeTodelete);
        if(user){
        setLikes((prev) =>prev && prev.filter((like =>like.likeId !== likeId)))



        // prev? [...prev, { userId:user?.uid}] : [{ userId: user?.uid}]
        // )
        }
    } catch (err) {
        console.log(err);
    }
    };

    const hasUserLiked = Likes?.find((like) => like.userId === user?.uid);
    useEffect(() =>{
        getLikes();
    },[])
   return (
   <div >
    <div style={{border:"2px solid black"}}>
        <div className="title"><h1>{post.title}</h1></div>
        <div className="body"><p>{post.description}</p></div>
        <div className="footer"><p>@{post.username}</p></div>
        <button onClick={hasUserLiked? removeLike : addLike}> {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}</button>
        {/* //html code for like emoji */}
        {Likes && <p>Likes:{Likes?.length}</p>}
        </div>
    </div>
   )
}

function Doc() {
    throw new Error("Function not implemented.");
}
