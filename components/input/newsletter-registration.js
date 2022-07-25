import { useRef } from 'react';
import { useContext } from 'react';
import NotificationContext from '../../store/notification-context';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext)
  const emailRef = useRef()
  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    const enteredEmail = emailRef.current.value
    // optional: validate input
    notificationCtx.showNotification({status:"pending", titile:"Signing up..." ,message:"Signing up email"})
      fetch("/api/newsletter", {
        method:"POST",
        body: JSON.stringify({email:enteredEmail}),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res=>{
        if(!res.ok)throw new Error("request failed")
        return res.json()
      }).then(data=>{
        notificationCtx.showNotification(data)
      }).catch(err=> {
      notificationCtx.showNotification({status:"error", titile:"Error",message:err.message || "Something went wrong"})})
    }
    // send valid data to API
  

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailRef}
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
