import { useState, useEffect, useCallback } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([])
  const fetchComments =useCallback(()=>{
    fetch(`/api/comments/${eventId}`).then(res=>{
      return res.json()}).then(data=>{
      setComments(data.comments)})
  },[eventId])
  useEffect(()=>{
    if(showComments)
    fetchComments()
  },[fetchComments, showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    // send data to API
    fetch(`/api/comments/${eventId}`, {
      method:"POST",
      body:JSON.stringify({id: eventId, ...commentData}),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res=>res.json()).then(data=>console.log(data))

    fetchComments()
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList id={eventId} comments={comments}/>}
    </section>
  );
}

export default Comments;
