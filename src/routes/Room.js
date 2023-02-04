//채팅방
import { useLocation } from "react-router-dom"
import { setDoc,doc,addDoc, collection, deleteDoc } from "firebase/firestore"
import { dbService } from '../firebase';
import { authService } from "../firebase";
function Room({userObj}){
    const location=useLocation()
    
    // if(location.user!==undefined){
    //     const {uid,userName,userImg}=location.user
    //     addDoc(collection(dbService,"list"),{
    //         firstUid:userObj.uid,
    //         firstName:userObj.displayName,
    //         secondUid:uid,
    //         secondName:userName
    //     })
        
    // }
    
    return (
        <div>
            채팅방

        </div>
    )
}

export default Room