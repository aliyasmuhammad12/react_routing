import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes, useParams, NavLink } from 'react-router-dom';


const Home=()=>{
const [posts, setPosts]=useState([]);

  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/posts")
    // first passed to json formet
    .then((data)=>data.json())
    // the fetch the actual data
    .then((data)=>setPosts(data))
  },[])
  return(
    <div>
      <div className='post-container'>
    {posts.map((post)=>(
      <NavLink className="post-titles" style={{display:"block"}} to={`/posts/${post.id}`}>{post.title}</NavLink>
    ))}
      </div>
    </div>
  )
}


const PostPage=()=>{
const params = useParams();
const [data, setData] = useState(null)
console.log("Params", params);

useEffect(()=>{
fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)
.then(data=> data.json())
.then(data => setData(data))
},[])
console.log("data", data)

if(data === null) return <p>Loading....</p>
  return(
    <div>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </div>
  )
}
const SayUser=()=>{
  const params = useParams();
  console.log("params", params)
  return(
    <div>
      <h1>my name is {params.userId}</h1>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/posts/:postId' element={<PostPage/>}/>
      <Route path='/user/:userId' element={<SayUser/>}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

