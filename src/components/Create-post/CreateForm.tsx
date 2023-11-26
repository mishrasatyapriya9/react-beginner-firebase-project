import React from "react";
//this the code file for form inout and validations for user posts
import {useForm} from "react-hook-form"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { error } from "console";
import {getDoc , collection, addDoc} from "firebase/firestore"
// getdoc means add a new docoment/new entry inside your collection in database
//collection -in which collection we have to add the new data 
import { auth, db } from "../../config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom"
// import yupresolver from @hookresollver but also adding yup in the last 
//typescript donot know the interface of schema,necessery for typescript
interface CreateFormData{
    title:string;
    description:string;
}

export const CreateForm = () =>{
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const schema = yup.object().shape(
        {
            title: yup.string().required("mustt write the title"),
            description: yup.string().required("Add descrition...."),
        }
    )
    //sending the data
    const {register ,handleSubmit, formState: { errors }, reset} = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    });
    
    const postsRef = collection(db,"posts");
    
    const onCreatePost = async( data: CreateFormData) => {   
        await addDoc(postsRef, {
            // title: data.title,
            // description: data.description,
            ...data,
            username: user?.displayName,
            userId: user?.uid,
        });
        //after oncce submit the area need to be reset
        // console.log({data});
        // reset();
        navigate("/");
    };
    return (
        <div>
            <form action="" onSubmit={handleSubmit(onCreatePost)}>
                <input type="text" placeholder="title..." {...register("title")} required/> 
                <p style={{color:"red"}}>{errors.title?.message}</p> <br />
                <textarea  id="" placeholder="Description......" {...register("description")} ></textarea> 
                <p style={{color:"red"}}>{errors.description?.message}</p>
                <br />
                <input type="submit" value="submit"  placeholder="submit" className="SubmitForm"/><br />
            </form>
        </div>
    );
};

// for validations install react-hook-form, yup(for validation), @hookform/resolvers(for merge both of them)  