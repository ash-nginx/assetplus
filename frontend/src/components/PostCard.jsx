/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
const PostCard = ({post}) => {
  const convertDate = (date) => {
    return `${(new Date(date)+"").split(" ")[1]} ${(new Date(date)+"").split(" ")[3]}`
  } 
  return (
    <div>
      <div style={{width:300,height:200}} className="d-flex m-3 p-1">
        <div>
          <img width={150} height={190} src={require(`../images/${post.poster}`)} />
        </div>
        <div className="d-flex p-2 flex-column justify-content-between">
            <h6>{post?.title}</h6>
            <small>{convertDate(post.postedDate)}</small>
        </div>
      </div>
    </div>
  )
}

export default PostCard