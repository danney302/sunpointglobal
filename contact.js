/* Public messages use a private server-side inbox, never a mailto address. */
(()=>{'use strict';
 const form=document.querySelector('[data-contact-form]');if(!form)return;
 const status=document.querySelector('[data-form-status]');
 const fields=form.querySelector('fieldset');const submit=form.querySelector('[type=submit]');
 const endpoint='https://cloud.sunpointbeacon.com/v1/public/contact';
 let token='',busy=false,complete=false;
 function notice(text,error=false){status.textContent=text;status.classList.toggle('form-error',error);status.setAttribute('role',error?'alert':'status');}
 async function challenge(){
  submit.disabled=true;notice('Getting your form ready...');
  try{
   const response=await fetch(endpoint+'/challenge',{credentials:'omit',cache:'no-store',headers:{Accept:'application/json'}});
   const result=await response.json().catch(()=>({}));if(!response.ok||!result.token)throw new Error(result.error||'The form is temporarily unavailable. Please try again later.');
   token=result.token;submit.disabled=false;notice('');
  }catch(error){notice(error.message||'We could not open the form. Please reload the page and try again.',true);}
 }
 document.querySelector('[data-form-retry]').addEventListener('click',()=>{if(!busy&&!complete)challenge();});
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(busy||complete||!token||!form.reportValidity())return;
  const values=Object.fromEntries(new FormData(form));values.token=token;
  busy=true;fields.disabled=true;submit.disabled=true;submit.textContent='Sending...';notice('Sending your message. Please keep this page open.');
  try{
   const response=await fetch(endpoint,{method:'POST',credentials:'omit',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(values)});
   const result=await response.json().catch(()=>({}));if(!response.ok||!result.received)throw new Error(result.error||'We could not send your message. Please try again.');
   complete=true;form.hidden=true;document.querySelector('[data-form-retry]').hidden=true;
   notice('Thank you. We received your message. Reference: '+result.reference+'.');status.focus();
  }catch(error){notice(error.message||'We could not send your message. Your text is still here; please try again.',true);}
  finally{busy=false;if(!complete){fields.disabled=false;submit.disabled=false;submit.textContent='Send message';}}
 });
 challenge();
})();
