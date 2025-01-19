// This file is only used to show the play button when hovered on a playlist

document.addEventListener('keydown', function(event) {
    if ((event.ctrlKey || event.metaKey) && (event.key === '+' || event.key === '-' || event.key === '0')) {
        alert("resizing");
    }
});

const svgelement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgelement.setAttribute("class", "w-20 h-14 mt-1 ml-3");
svgelement.setAttribute("viewBox", "0 0 24 24");
svgelement.setAttribute("stroke-width", "1.5");
svgelement.setAttribute("stroke", "none");
svgelement.setAttribute("fill", "#1ED760");

const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
path1.setAttribute("stroke-linecap", "round");
path1.setAttribute("stroke-linejoin", "round");
path1.setAttribute("d", "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z");

const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
path2.setAttribute("stroke-linecap", "round");
path2.setAttribute("fill", "black");
path2.setAttribute("stroke-linejoin", "round");
path2.setAttribute("d", "M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z");

svgelement.appendChild(path1);
svgelement.appendChild(path2);

svgelement.addEventListener('mouseover', ()=>{
    svgelement.style.visibility='visible'
})

const whenMouseIn=(parentid)=>{
    let parentIndex = parentIdArray.indexOf(parentid) + 1
    document.getElementById(parentid).querySelector('#' + parentIdArray[parentIndex]).appendChild(svgelement);
}

const whenMouseOut=()=>{
    svgelement.remove()
    svgelement.style.visibility='invisible'
}

let parentIdArray = ['parent1', 'child1', 'parent2', 'child2', 'parent3', 'child3', 'parent4', 'child4', 'parent5', 'child5', 'parent6', 'child6', 'parent7', 'child7', 'parent8', 'child8']

parentIdArray.forEach(parentId => {
    if(parentId.substring(0, 6) === 'parent'){

        document.getElementById(parentId).addEventListener('mouseover', ()=>{
            // console.log(parentId + ' is hovered on!');
            console.log(parentId + ' is clicked');
            whenMouseIn(parentId)
        })

        document.getElementById(parentId).addEventListener('mouseout', ()=>{
            whenMouseOut()
        })

    }
    });

let playBtn = document.getElementById("playImage")
let pauseBtn = document.getElementById("pauseImage")
playBtn.addEventListener("click", ()=>{
    playBtn.style.display="none"
    pauseBtn.style.display="inline-block"
    pauseBtn.style.marginLeft = "0px"
})
pauseBtn.addEventListener("click", ()=>{
    pauseBtn.style.display="none"
    playBtn.style.display="inline-block"
})

let xMark = document.getElementById("x-mark")
let sideBar = document.getElementById("sidebar-left")
let playlist = document.getElementById("parent3")
let blockDad = document.getElementById("block-3-dad")
let block3 = document.getElementById("block-3")
let midSection = document.querySelector("body > div > div.bg-gradient-to-b.from-mainbgcolor.to-black.col-start-4.col-end-11.row-start-1.row-end-12.overflow-x-auto.scrollbar.scrollbar-thumb-gray-500.scrollbar-thumb-min-h-4")
let a =document.querySelector("#block-3")
xMark.addEventListener("click", ()=>{
        sideBar.style.visibility = "hidden"
        midSection.style.gridColumnEnd = '13'
        blockDad.style.width = '100%'
        blockDad.style.display = "flex"
        blockDad.style.flexDirection = "row"
        blockDad.style.justifyContent = "flex-start"
        block3.style.width= '1075px'
})

let b = document.getElementById("bellsvg")
b.addEventListener("click", ()=>{
    sideBar.style.visibility = 'visible'
    midSection.style.gridColumnEnd = '11'
    blockDad.style.width = '100%'
    block3.style.width= '1100px' 
})