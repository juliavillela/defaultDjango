function handleToggle(e){
    // handles toggle behaviour.
    // element dataset.target: id of the element to be toggled
    // element.dataset.toggle: string corresponding to what toggle should do.
    const element = e.target;
    const action = element.dataset.toggle;
    const element_target_id = element.dataset.target;
    const target = document.querySelector(element_target_id);
    toggle(action, element, target)
}

function toggle(action,trigger,target){
    if (action === 'collapse'){
        if (target.className.includes('show')){
            target.className = target.className.replace(' show', '');
            trigger.className = trigger.className.replace(' active', '');
        }else{
            target.className += ' show'
            element.className += ' active'
            target.firstElementChild.focus();
        }
    }
}

function collapse(trigger, target){
    target.className = target.className.replace(' show', '');
    trigger.className = trigger.className.replace(' active', '');
}

/*
a group with excludent toggle should be shaped like this:

<tag >
    <nav id="options" data-active="#option-1">
        <tag id="option-1" data-parent="#options" data-action:?? data-target:"#content-1">option 1</tag>
        <tag id="option-2" data-action:?? data-target:"#content-2">option 2</tag>
    </nav>

    <tag id="content-1"> i'm content 1</tag>
    <tag id="content-2"> i'm content 2 </tag>
</tag>
*/

function set_active_in_group(e){
    const trigger = e.target
    const group_parent = trigger.dataset.parent
    group_parent.dataset.active = `#${trigger.id}`


    if (trigger.className.includes('active')){
        console.log('element is already active')
        return 0;
    }

    for (let i=0; i<tag_nav.children.length; i++)

}

function display_active_in_group(group){
    const trigger = document.querySelector(group.dataset.active);
    const target = document.querySelector(trigger.dataset.target);
    if (target){
        target.className()
    }
}


export{ handleToggle };