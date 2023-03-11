import React, { useState } from 'react';
import {createUserWithEmailAndPassword,updateProfile,signInWithEmailAndPassword,sendEmailVerification,sendPasswordResetEmail} from "firebase/auth";
import auth from '../../Firebase/Firebase';

function Hard() {
const [User,Setuser]=useState([])
const [register,setregister]=useState(false)
const [name,setname]=useState('')
const [email,setemail]=useState('')
const [pass,setpass]=useState('')
// submit from
const Handlefrom=(e)=>{
  e.preventDefault()
 if(register){
  createUserWithEmailAndPassword(auth,email,pass)
  .then(result=>{
    const user=result.user
    // display name
    updatedisplayname()
    // varify email
    varityemail()
    Setuser(user)
  }).catch(err=>{
    console.log(err.message)
  })

 }else{
  signInWithEmailAndPassword(auth, email, pass)
  .then(result=>{
    const user=result.user
    Setuser(user)
    console.log('sign in success')
  }).catch(err=>{
    console.log(err.message)
  })
 }
  
}
// update displayname
function updatedisplayname(){
  updateProfile(auth.currentUser,{
    displayName:name
  })
  .then(()=>{
    console.log('display name update')
  })
}
// Varify email
const varityemail=()=>{
  sendEmailVerification(auth.currentUser)
  .then(() => {
     window.alert("check Your email span box")
  });

}
// password change
function resetpass(){
  sendPasswordResetEmail(auth, email)
  .then(() => {
    alert("check your email")
  })
  .catch((error) => {
  console.log(error.message)
  });
}
  return (
    <div className="App"> 
    <div className='w-[500px] mx-auto'>
     <h1 className='text-[40px] font-bold text-[green]'>{register ? 'Plaase Register':'Plaase LogIn'}</h1>
     <form onSubmit={Handlefrom}>
     {register ? <>
     {/* Your register div */}
     <h1 className='text-[20px]'>Name</h1>
     <input onChange={(e)=>setname(e.target.value)} className='border-2 px-2 py-1 focus:outline-none' type="text" placeholder='Enter your name' />
     <h1 className='text-[20px]'>Email</h1>
     <input onChange={(e)=>setemail(e.target.value)} className='border-2 px-2 py-1 focus:outline-none' type="email" placeholder='Enter your name' />
     <h1 className='text-[20px]'>Password</h1>
     <input onChange={(e)=>setpass(e.target.value)} className='border-2 px-2 py-1 focus:outline-none' type="text" placeholder='Enter your name' /><br/><br/>
     </>:<>
     {/* Your sign in */}
     <h1 className='text-[20px]'>Email</h1>
     <input onChange={(e)=>setemail(e.target.value)} className='border-2 px-2 py-1 focus:outline-none' type="email" placeholder='Enter your name' />
     <h1 className='text-[20px]'>Password</h1>
     <input onChange={(e)=>setpass(e.target.value)} className='border-2 px-2 py-1 focus:outline-none' type="text" placeholder='Enter your name' /><br/><br/>
     </>}
     <h1><input onClick={()=>setregister(!register)}  type="checkbox"/>Your are Register</h1>
     <button className='bg-[green] py-2 px-3 text-white'>{register ? 'Plaase Register':'Plaase LogIn'}</button>
     </form><br/>
     {/* password chage button */}
     <button className='bg-[tomato] text-white py-2 px-[9px]' onClick={()=>resetpass()}>Change password</button>
     {/* Your user information */}
     <h1 className='text-[40px]'>User Information</h1>
      <div>
      {User.email && <div className='border-2 right-4 rounded-md space-y-2 p-3'>
      <h1 className='text-[20px]'>displayName:{User.displayName}</h1>
      <h1 className='text-[20px]'>Email:{User.email}</h1>
      </div>}
      </div>
    </div>

   </div>
  );
}
export default Hard;