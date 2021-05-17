const message_container = document.querySelector("#django-message-container");
const message_container_close = document.querySelector("#close-django-message");

//if messages, displays message container for 6000ms
// user can dismiss message by clicking the close button
export default function handleMessageContainer(){
    if (message_container.childElementCount>1){
        console.log("message has children")
        message_container_close.addEventListener('click', () => close(message_container) )
        message_container.style.marginTop = 0;
        const timeout = 6000;
        setTimeout(() => {
            message_container.style.marginTop = '-10em';
        }, timeout);
    }
    console.log("no messages")
}


function close(element, margin_top='-10em'){
    element.style.marginTop = '-10em';
}