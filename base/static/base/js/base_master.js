import handleMessageContainer from './components/message.js'
import { toggle_menu_items }from './components/menuBtnDrop.js'

// on page load:
document.addEventListener('DOMContentLoaded', function(){
    document.querySelector("#menu-button").addEventListener('click', toggle_menu_items);
    //methods called here will run on page-load
    handleMessageContainer()
})