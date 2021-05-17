function scroll_to(e){
    const anchor = e.target;
    const scroll_to_el_id = anchor.name;
    const scroll_to_el = document.getElementById(scroll_to_el_id);
    scroll_to_el.scrollIntoView(true)
}

export {scroll_to};