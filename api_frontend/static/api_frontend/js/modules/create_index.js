// takes in html content:
function index(html_content){
    const element = document.createElement("div")
    const summary = []
    element.childElementCount
    let header_count = 0
    for (let i=0; i<html_content.childElementCount; i++){
        let element = html_content.children[i]
        let is_heading = child.tagName.match("H(.)")
        if (heading){
            let level = heading[1]
            html_content.children[i].id = `H${level}-${header_count}`
            header_count ++
            summary.push({lvl: level, title: element.innerHTML, id:`H${level}-${header_count}`} )
        }
    }
}



// for each header element in content:
    //set an id to it
    // extract inner html from it
    // build an index object where each header text is an anchor to header
