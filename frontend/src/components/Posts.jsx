import React from 'react'
import axios  from 'axios';
import { Modal , Button } from 'react-bootstrap';
import PostCard from './PostCard';
const server = 'http://localhost:8000/post';

const Posts = () => {
  const inputRef = React.useRef("");
  const [posts,setPosts] = React.useState([]);
  const [click,setClick] = React.useState(false);
  const [search,setSearch] = React.useState("");
  const [post,setPost] = React.useState({
    title:"",
    description:"",
    poster:"",
  })
  const [show,setShow] = React.useState(false)
  const handleOpen  = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleSave = async(e) => {
    e.preventDefault();
    try {
      const body = new FormData();
      body.append('title',post.title);
      body.append('description',post.description);
      body.append('poster',post.poster);
      await axios.post(server+'/add',body).then(res=>console.log({res})).catch(err=>console.log(err));
    } catch (error) {
      console.log({error});
    }
    finally{
      getContents();
      handleClose();
    }
  }
  const getContents = async() => {
    try {
      const response = await fetch(server+'/',{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      })
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log({error});
    }
  }

  const searchUpdate = (e) => {
    try {
      if(e.keyCode === 13 && search){
        const filter  = posts.filter(post=>post.title.toLowerCase().includes(search.toLowerCase()));
        setPosts(filter);
      }
    } catch (error) {
      console.log({error});
    }
  } 
  React.useEffect(()=>{
    getContents();
  },[])
  return (
    <div>
      <div className="d-flex px-4 border py-3 justify-content-around align-items-center">
        <h1 onClick={handleOpen} role='button'>+</h1>
        <h2>Content Gallery</h2>
        <div>
          <input onKeyDown={searchUpdate} value={search??""} onChange={(e)=>setSearch(e?e.target.value:"")} placeholder='SEARCH' className='form-control shadow-none' type='search'  />
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <form encType='multipart/form-data' onSubmit={handleSave}>
        <Modal.Header closeButton>
          <Modal.Title>
              Add New Image
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div  className='m-2'>
            <div>Title</div>
            <input onChange={e=>setPost(prev=>({...prev,title:e?e.target.value:""}))} value={post.title} className='shadow-none form-control' />
          </div>
          <div className='m-2'>
            <div>Description</div>
            <textarea onChange={e=>setPost(prev=>({...prev,description:e?e.target.value:""}))} value={post.description} className='shadow-none form-control' />
          </div>
          <div className="m-2">
          {
            click ?
            <>
            <div onClick={()=>{
              setClick(false)
              setPost(prev=>({...prev,poster:{}}))
              }} className="btn mx-2 btn-outline-danger">Revert</div>
            <small  className='text-primary'>{post.poster.name}</small>
            </>
            :
            <>
            <input ref={inputRef}
              accept="image/png, image/jpeg, image/jpg, image/svg"
              onChange={(e)=>{
                setPost(prev=>({...prev,poster:e.target.files[0],filename:e.target.files[0]?.name}))
                setClick(!click);
                }} className='d-none' type="file" />
              <div onClick={()=>inputRef.current.click()} className="btn btn-primary text-light border-secondary">Upload Poster</div>
            </>

          }        
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant='outline-primary' className='px-5'>Save</Button>
        </Modal.Footer>
        </form>
      </Modal>
      <div>
        <div className="d-flex flex-wrap m-5">
          {
            posts?.map(post=>(<PostCard key={post._id} post={post} />))
          }
        </div>
      </div>
    </div>
  )
}

export default Posts