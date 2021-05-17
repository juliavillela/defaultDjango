import handleMessageContainer from './components/message.js'
import {handleToggle} from './components/toggle.js'
import {scroll_to} from './components/anchor_scroll.js'
import {setActiveMenuItem} from './components/navBar.js'

const current_href = window.location.href
console.log(`pathname: ${current_href}`)
// on page load:
document.addEventListener('DOMContentLoaded', function(){
    //methods called here will run on page-load
    
    //sets menu toggler button event listener
    document.querySelector("#menuButton").addEventListener('click', e => handleToggle(e))

    //will display messages if any
    handleMessageContainer()
    
    //sets scrool_to to any anchors of class scroll_to.
    const anchors = document.getElementsByTagName('A');
    for (let anchor of anchors){
        if (anchor.className.includes('scroll_to')){
            anchor.addEventListener('click', e => scroll_to(e))
        }
    }
    
    //sets current page navlink to active
    setActiveMenuItem(current_href)
})