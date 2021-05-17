function handleToggle(e){
    const element = e.target;
    const element_do = element.dataset.toggle;
    const element_target_id = element.dataset.target;
    const target = document.querySelector(element_target_id);
    toggle(element_do, target)
}

function toggle(action, target){
    if (action === 'collapse'){
        if (target.className.includes('show')){
            target.className = target.className.replace(' show', '');
        }else{
            target.className += ' show'
            target.firstElementChild.focus();
        }
    }
}

export{ handleToggle };