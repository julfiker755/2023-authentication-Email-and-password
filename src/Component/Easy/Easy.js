import { async } from '@firebase/util';
import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword,useAuthState,useUpdateProfile,useSendEmailVerification,useSignInWithEmailAndPassword,useSignOut,useUpdatePassword} from 'react-firebase-hooks/auth';
import auth from '../../Firebase/Firebase';


const Easy = () => {
    const [register,setregister]=useState(false)
    const [name,setname]=useState('')
    const [email,setemail]=useState('')
    const [pass,setpass]=useState('')
    // react-firebase-hooks
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
    const [sendEmailVerification] = useSendEmailVerification(auth);
    const [updateProfile] = useUpdateProfile(auth);
    const [user] = useAuthState(auth);
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const [signOut] =useSignOut(auth);
    const [updatePassword] = useUpdatePassword(auth);
    // handlefrom your collection your data
    const Handlefrom=async(e)=>{
    e.preventDefault()
     if(register){
      await signInWithEmailAndPassword(email,pass)
     }else{
     await createUserWithEmailAndPassword(email,pass)
    await updateProfile({displayName:name })
    const success=await sendEmailVerification()
     if(success){
    window.alert("Check Your Email")
 }
     }
    }
    console.log(user)
    return (
        <div className='container mx-auto'>
           {register ?  <div className='space-y-3'>
            <form onSubmit={Handlefrom}>
            <h1 className='text-[50px] text-bold text-[red]'>Please {register ? 'Log In':'Register'}</h1>
            <h1><span className='text-[22px] mr-1'>Email:</span><input onChange={(e)=>setemail(e.target.value)} type="text" className="input input-bordered input-primary h-[35px] w-full rounded-lg max-w-xs" /></h1>
            <h1><span className='text-[22px] mr-1'>Password:</span><input onChange={(e)=>setpass(e.target.value)} type="text" className="input input-bordered input-primary h-[35px] rounded-lg w-full max-w-xs" /></h1>
            <h1><input onClick={()=>setregister(!register)} type="checkbox"/><span className='text-[22px] mr-1'>Your are Register</span></h1>
            <button className='bg-[green] text-white py-2 px-[30px] rounded-md'>{register ? 'Log In':'Register'}</button> 
            </form>
             </div>  : <div className='space-y-3'>
             <form onSubmit={Handlefrom}>
             <h1 className='text-[50px] text-bold text-[red]'>Please {register ? 'Log In':'Register'}</h1>
            <h1><span className='text-[22px] mr-1'>Name:</span> <input type="text"  onChange={(e)=>setname(e.target.value)} className="input input-bordered input-primary h-[35px] w-full rounded-lg max-w-xs" /></h1>
            <h1><span className='text-[22px] mr-1'>Email:</span><input type="text" onChange={(e)=>setemail(e.target.value)} className="input input-bordered input-primary h-[35px] w-full rounded-lg max-w-xs" /></h1>
            <h1><span className='text-[22px] mr-1'>Password:</span><input type="text" onChange={(e)=>setpass(e.target.value)} className="input input-bordered input-primary h-[35px] rounded-lg w-full max-w-xs" /></h1>
            <h1><input onClick={()=>setregister(!register)} type="checkbox"/><span className='text-[22px] mr-1'>Your are Register</span></h1>
            <button className='bg-[green] text-white py-2 px-[30px] rounded-md'>{register ? 'Log In':'Register'}</button>
             </form>
           </div>} 
            {/* Your update password  */}
           <button 
           onClick={async()=>{
            const success=await updatePassword(pass)
            if(success){
                window.alert("Check Your email")
            }
           }}
           className='bg-[#0d4e5b] text-white py-2 mt-6 rounded-md px-8'>Forget Password</button>
           <div className="divider">User Information</div>
           <div>
      {user && <div className='border-2 right-4 rounded-md space-y-2 p-3'>
      <h1 className='text-[20px]'>Display Name:{user.displayName}</h1>
      <h1 className='text-[20px]'>Email :{user.email}</h1>
      <h1><button
      onClick={async()=>signOut()}
      className='bg-[red] py-2 px-4 rounded-md'>Log out</button></h1>
      </div>}
      </div>
        </div>
    );
};

export default Easy;