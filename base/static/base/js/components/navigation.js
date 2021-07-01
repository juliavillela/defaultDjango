//sets the navlink witch corresponds to current url to active navlink
function setActiveMenuItem(current_path){
    const navBar = document.querySelector("#navBar")
    const navLinks = navBar.getElementsByClassName('nav-link')
    for (let link of navLinks){
        if(link.href === current_path){
            link.className += ' active'
        }else{
            link.className = link.className.replace(' active', '')
        }
    }
}

// handleTabDisplay will add the setActiveTab event listener on all tab anchors
// this will work on tab-containers made up of 
    // tab-nav ul
    // tab-container with a corresponding element child for each tab-nav li.
// this should only happen if anchor element has data-target property.
function handleTabDisplay(tabs){
    // adds event listeners to all tab-navs in tabs element
    for(let i=0; i<tabs.children.length; i++){
        // this should not rely on first element child...
        let tab = tabs.children[i].firstElementChild;

        tab.addEventListener('click', (e) => {setActiveTab(e)})
    }
}

function setActiveTab(e){
    console.log("set active tab called", e.target)
    //sets only clicked tab to active and related content to show
    // hides and deactivates all others.
    const tag_link = e.target;
    if (tag_link.className.includes('active')){
        console.log('already active');
        return 0;
    }

    const tag_container = document.querySelector(tag_link.dataset.container);
    const tag_nav = tag_container.querySelector(tag_container.dataset.nav);

    for (let i=0; i<tag_nav.children.length; i++){
        //this should not rely on first element child to work
        let tag_anchor = tag_nav.children[i].firstElementChild
        let content = document.querySelector(tag_anchor.dataset.target)
        if(tag_anchor === tag_link){
            tag_anchor.className += ' active'
            content.className += ' show'
        } else{
            tag_anchor.className = tag_anchor.className.replace(' active', '')
            content.className = content.className.replace(' show', '')
        }
    }
}

export {setActiveMenuItem, handleTabDisplay}