const message_container = document.querySelector("#django-message-container")


export default function handleMessageContainer(){
    if (message_container.childElementCount>0){
        console.log("message has children")
        message_container.style.marginTop = 0;
        const timeout = 1500;
        setTimeout(() => {
            message_container.style.marginTop = '-4em';
        }, timeout);
    }
    console.log("no messages")
}