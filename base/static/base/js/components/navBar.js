//sets the navlink witch corresponds to current url to active navlink
function setActiveMenuItem(current_path){
    const navLinks = document.getElementsByClassName('nav-link')
    for (let link of navLinks){
        if(link.href === current_path){
            link.className += ' active'
        }else{
            link.className = link.className.replace(' active', '')
        }
    }
}

export {setActiveMenuItem}