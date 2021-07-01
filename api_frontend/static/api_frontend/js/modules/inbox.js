window.onpopstate = e => {
  console.log(e.state);
  route(e.state.display, e.state.data, true);
} 

document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => route('mailbox', 'inbox'));
  document.querySelector('#sent').addEventListener('click', () => route('mailbox', 'sent'));
  document.querySelector('#archive').addEventListener('click', () => route('mailbox', 'archive'));
  document.querySelector('#compose').addEventListener('click', () => route('compose', null));
  
  //actions:
  document.querySelector('#compose-form').onsubmit = submit_email;
  document.querySelector('#compose-submit').addEventListener('animationend', () => redirect("compose-submit", load_mailbox('inbox')));

  document.querySelector('#reply').addEventListener('click', e => compose_reply(e.target.dataset.emailid));
  document.querySelector('#set_archive').addEventListener('click', e => archive(e.target.dataset.emailid, e.target.dataset.setto));
  document.querySelector('#set_archive').addEventListener('animationend', () => redirect("set_archive", route('mailbox', 'inbox')));
  document.querySelector('#set_read').addEventListener('click', e => read(e.target.dataset.emailid, "false", true));
  document.querySelector('#set_read').addEventListener('animationend', () => redirect("set_read", route('mailbox', 'inbox')))

  // By default, load the inbox
  route('mailbox', 'inbox');
});

//redirects to correct view and and pushes state if back is false
function route(display, data, back=false){
  const state = {display:display, data:data};
  let url;
  switch (display) {
    case 'mailbox':
      url = `/?${data}`
      load_mailbox(data);
      break;
    case 'email':
      url = `/?email/${data}`      
      load_email(data);
      break;
    case 'compose':
      url = '/?compose'
      compose_email(data);
      break;
    default:
      break;
  }
  if (back === false){
    window.history.pushState(state, "", url)
  }
}

//load different views 
function compose_email(reply) {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#single-email-view').style.display = 'none';

  if (reply) {
    //if email is a reply, set initial reply values
    document.querySelector('#compose-recipients').value = reply.recipients;
    document.querySelector('#compose-subject').value = reply.subject;
    document.querySelector('#compose-body').value = reply.body;
  }else {
     // Clear out composition fields
    document.querySelector('#compose-recipients').value = '';
    document.querySelector('#compose-subject').value = '';
    document.querySelector('#compose-body').value = '';
  }
  set_tab_active("compose");
}

function load_mailbox(mailbox) {

  // Show the mailbox and hide other views
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#single-email-view').style.display = 'none';
  document.querySelector('#emails-view').style.display = "block";

  //fetch latest emails from server
  emails_table = fetch_emails_in(mailbox);

  // Replace any content with the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3 class="page-title">${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  //append emails table to emails view
  document.querySelector('#emails-view').appendChild(emails_table);
  
  //set button to active:
  set_tab_active(mailbox);
}

function load_email(email_id){

  const email_container=document.querySelector('#email-container');
  email_container.innerHTML = "";
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#single-email-view').style.display = 'block';
  
  //fetch email data
  fetch(`/emails/${email_id}`)
  .then(response => response.json())
  .then(email => {
    console.log(email)
    //display
    email_container.append(email_element(email))
    //set email as read
    read(email.id, "true");
    //set email navigation values
    build_nav(email);
  })
  .catch(error => console.log(error)); 
}

//actions:
function submit_email(){

  //gets all values from form into object
  const email_obj = {
    recipients: document.querySelector('#compose-recipients').value,
    subject: document.querySelector('#compose-subject').value,
    body: document.querySelector('#compose-body').value
  };
  
  console.log(`email obj : ${email_obj}`);

  const url = '/emails';

  //creates new request
  const request = new Request (url, {
    method: 'POST',
    body: JSON.stringify(email_obj),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  //sends request
  fetch(request)
  .then(response => response.json())
  .then(response_obj => {
    console.log(response_obj);
    if(response_obj.error){
      alert(response_obj.error);
      compose_email(email_obj);
    }else{
      console.log(response_obj.message)
      //start button animation
      document.querySelector('#compose-submit').style.animationPlayState = "running";
    }
  })
  .catch(error => alert(error["error"]));
  
  //do not submit post request
  return false;
}

function compose_reply(email_id){
  fetch(`/emails/${email_id}`)
  .then(response => response.json())
  .then(email => {
    // if email is not already a response, add Re: before subject
    let subject = email.subject;
    if(!subject.match(/^Re:/)){
      subject = `Re: ${subject}`
    }
    //mark end of each email with:
    const separator = "\n ------ \n\n";
    //build reply object and pass it to compose
    const reply  = {
      recipients: email.sender,
      subject: subject,
      body:`${separator} On ${email.timestamp}, ${email.sender} wrote: ${email.body}.`,
    };
    route('compose', reply);
  })
  .catch(error => console.log(error)); 
}

function read(email_id, value, redirect=false){
  //call update to set new value of read in email
  let b_val = Boolean(value === "true");
  const content = {read: b_val};
  update(content, email_id);
  if (redirect){
    animate('set_read');
  }
}

function archive(email_id, value){
  //call update to set new value of archive in email
  let b_val = Boolean(value === "true");
  const content = {archived: b_val};
  update(content, email_id);
  animate('set_archive');
}


//helper functions:

function fetch_emails_in(mailbox){

  //gets list of email objects
  let emails_table = document.createElement("table");
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
    if (emails.length === 0 ){
      emails_table.innerHTML = `${mailbox} is empty.`
    } else {
      emails.forEach(email => {
        console.log(email.subject);
        // adds each email as a row of table
        emails_table.appendChild(email_tr(email, mailbox));
      });
    }
  });
  //returns a table containing all emails with data
  return emails_table;
}

function email_tr(email, mailbox){

  //creates html tags and popultes them with email data.
  let tr = document.createElement("tr");
  if (email.read){
    tr.className = "read"
  }
  tr.id = `email-${email.id}`;
  
  let data = [
      {content: email.subject, class: "column-subject"},
      {content: email.timestamp, class: "column-timestamp"}
  ];
  if (mailbox == 'sent'){
    data.unshift({content: `<strong>to: </strong>${is_me(email.recipients.join())}`, class: "column-address"});
  }else{
    data.unshift({content:`<strong>from: </strong>${is_me(email.sender)}`, class:"column-address"}); 
  }
  data.forEach(d =>{
    let td = document.createElement("td");
    td.innerHTML = d.content;
    td.className = d.class;
    tr.appendChild(td);
  })
  //then returns table row with data
  tr.addEventListener('click', () => tr.style.animationPlayState ="running");
  tr.addEventListener('animationend', () => redirect(route('email', email.id)));
  return tr;
}

function email_element(email){
  let container = document.createElement('div');
  let title = document.createElement('h4');
  title.innerHTML = email.subject;
  let from = document.createElement('p');
  from.innerHTML = `<strong>from: </strong>${is_me(email.sender)} <br> <strong>to: </strong>${is_me(email.recipients.join())}`;
  let body = document.createElement('div');

  const separator = "------";
  const line_break = /\n\n/;

  //break main email into paragraphs and append each to body
  let emails = email.body.split(separator);
  let main_ps = emails[0].split(line_break);
  main_ps.forEach(p => {
    let main = document.createElement('p');
    main.className = "main-email";
    main.innerHTML = p;
    body.append(main);
  })

  //if email contains reply history, format history and append
  if (emails.length>1){
      for(let i=1; i<emails.length; i++){
      let h = document.createElement('p');
      h.className="email-history"
      h.innerHTML = emails[i];
      body.append(h)
    }
  }
  //append all email elements to container
  container.appendChild(title);
  container.appendChild(from);
  container.appendChild(body);
  return container;
}

function update(content, email_id){
  
  const url = `/emails/${email_id}`;
  
  const request = new Request (url, {
    method: 'PUT',
    body: JSON.stringify(content),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  fetch(request)
  .then(response => response.json())
  .then(r => console.log(r))
  .catch(error => console.log(error)); 
}

function build_nav(email_obj){
  const nav = document.querySelector("#single-email-nav");
  
  let sent = email_obj.sender !== is_me(email_obj.sender)

  // set value of email id as tag data.
  for(let i=0; i<nav.children.length; i++){
      nav.children[i].setAttribute("data-emailid", email_obj.id);
      if (sent){
        nav.children[i].disabled = true;
      } else {
        nav.children[i].disabled = false;
      }
    }
    //if archived, button unarchives, else button archives
  let archive = document.querySelector('#set_archive');
  if (email_obj.archived){
      archive.innerHTML = "unarchive";
      archive.setAttribute("data-setto", false);
  } else {
      archive.innerHTML = "archive";
      archive.setAttribute("data-setto", true);
  }
}


//format and viasual aid functions:

function set_tab_active(button_id){
  //remove active class from all buttons in navbar
  let tabs = document.querySelector("#navBar").children;
  for(let i=0; i<tabs.length; i++){
    tabs[i].className = tabs[i].className.replace(" active", "");
  }
  //set active class to this button
  document.getElementById(button_id).className += " active";
}

function is_me(email_address){
  //if email address belongs to logged user, replaces address with "me"
  const this_user = document.querySelector('#useremail').innerHTML;
  return email_address.replace(this_user, "me")
}

function animate(event_element){
  document.querySelector(`#${event_element}`).style.animationPlayState = "running";
}

function redirect(event_element, route_function){
  document.querySelector(`#${event_element}`).style.animationPlayState = "paused";
  route_function;
}