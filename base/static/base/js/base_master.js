import handleMessageContainer from './components/message.js'
import {handleToggle} from './components/toggle.js'
import {scroll_to} from './components/anchor_scroll.js'
import {handleTabDisplay, setActiveMenuItem} from './components/navBar.js'

const current_href = window.location.href
console.log(`pathname: ${current_href}`)
// on page load:
document.addEventListener('DOMContentLoaded', function(){
    //methods called here will run on page-load
    
    //sets menu toggler button event listener
    document.querySelector("#menuButton").addEventListener('click', e => handleToggle(e))

    //will display messages if any
    handleMessageContainer()
    
    //sets scrool_to event to any elements of class scroll_to.
    const scroll_anchors = document.getElementsByClassName('scroll_to');
    for (let anchor of scroll_anchors){
        anchor.addEventListener('click', e => scroll_to(e))
    }

    //sets tab link display events to all tab groups, if any
    const tab_groups = document.getElementsByClassName('nav-tabs')
    for (let tab_group of tab_groups){
        handleTabDisplay(tab_group)
    }
    
    //sets current page navlink to active, according to url
    setActiveMenuItem(current_href)
})