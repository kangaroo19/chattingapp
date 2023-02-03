//유저목록 화면
//로그인 이후 볼 수 있는 화면
import { onAuthStateChanged } from "firebase/auth"
import { authService } from "../firebase"
import { dbService } from "../firebase"
import { ref, set } from "firebase/database";
import { doc,addDoc, collection, setDoc,query,onSnapshot,orderBy, QuerySnapshot } from "firebase/firestore";
import { useEffect,useState } from "react";

function Home({userObj}){
    const [nweets,setNweets]=useState([])
    useEffect(()=>{
        const q=query(collection(dbService,"users"))
    const un=onSnapshot(q,(querySnapshot)=>{
        const array=[]
        querySnapshot.forEach((doc)=>{
            array.push(doc.data().userName)
        })
        console.log(array)
        setNweets(array)
    })
    },[])
    console.log(nweets)
    return (
        <>
            <span>유저목록</span>
            {nweets.map((nweets)=>(
                <div>{nweets}</div>
            ))}
        </>

    )
}

export default Home