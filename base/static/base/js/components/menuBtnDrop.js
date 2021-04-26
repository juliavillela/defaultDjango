function toggle_menu_items(){
    console.log(">>> toggle menu items")
    const all_menu_items = document.getElementsByClassName('menu-items')
    for(let ul_item of all_menu_items){
        if (ul_item.className.search('expand') === -1){
            ul_item.className += " expand"
            console.log("menu items expanded")
        }else{
            ul_item.className = ul_item.className.replace(' expand', "")
            console.log("menu items collapsed")
        }
    }
}

function set_nav_item_active(e, navbar_list){
    console.log(">>> set active")
    const clicked_nav_item = e.target
    for(navItem of navbar_list){
        navItem.className = navItem.className.replace(" active", "")
    }
    clicked_nav_item.className = "active"
}

export {
    toggle_menu_items,
    set_nav_item_active
}