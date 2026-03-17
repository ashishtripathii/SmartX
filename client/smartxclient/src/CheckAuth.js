import { redirect } from "react-router-dom";




export default function checkUserAuth(){


    const token = localStorage.getItem("token");
    
   if(token){
    return null;
   }

   else{
    return redirect("/login");
   }

}