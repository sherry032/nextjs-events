import { useEffect, useState } from 'react';
import classes from './comment-list.module.css';

function CommentList(props) {
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {props.comments.map((comment, i) => <li key={comment._id}>
        <p>{comment.text}</p>
        <div>
          By <address>{comment.name}</address>
        </div>
      </li>)}
    </ul>
  );
}

export default CommentList;

