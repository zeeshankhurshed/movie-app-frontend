import { useState,useEffect } from "react";
import { Link,useLocation,useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/api/user";
import { toast } from "react-toastify";

export default function Login() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [login,{isLoading}]=useLoginMutation();

  const {userInfo}=useSelector((state)=>state.auth);

  const {search}=useLocation();

  const sp=new URLSearchParams(search);
  const redirect=sp.get('redirect') || '/';

  useEffect(()=>{
if(userInfo){
  navigate(redirect);
}
  },[navigate,redirect,userInfo]);


  const submitHandler=async(e)=>{
    e.preventDefault();

    try {
      const res=await login({email,password}).unwrap();
      dispatch(setCredentials({...res}));
      toast('Sign in Successfully');
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.errror);
    }
  }
  return (
    <section className="pl-40 flex flex-wrap">
      <div className="mr-16 mt-20">
        <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

        <form onSubmit={submitHandler} className="container w-[35rem]">
          <div className="my-8">
            <label htmlFor="email" className="block text-sm font-medium text-white">Email Address</label>
            <input type="email" name="email" id="email" className="mt-1 p-2 border border-none w-full rounded focus:outline-none focus:ring-2 focus:ring-green-400" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className="my-8">
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <input type="password" name="password" id="email" className="mt-1 p-2 border border-none w-full rounded focus:outline-none focus:ring-2 focus:ring-green-400" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <button disabled={isLoading} type="submit" className="bg-teal-500 text-white px-4 py-2 rounded cursor-pointer my-4">
            {isLoading ? "Singing In...":"Sign In"}
          </button>

          {isLoading && <Loader/>}
        </form>
        <div className="mt-4">
        <p className="text-white">
          New Customer? {""}
          <Link to={redirect ? `/register?redirect=${redirect}`:"/register"} className="text-teal-500 hover:underline">Register</Link>
        </p>
        </div>
      </div>
      
      <img
          src="https://images.unsplash.com/photo-1485095329183-d0797cdc5676?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="h-[36rem] w-[45%] xl:block md:hidden sm:hidden rounded-lg"
        />
    </section>
  );
}
