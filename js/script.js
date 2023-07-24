window.onload = function () {
const wrap = document.querySelector(".wrap");
const header = document.querySelector(".header");
let scy = 0;
window.addEventListener("scroll", function () {
    scy = this.document.documentElement.scrollTop;
    if (scy > 0) {
    wrap.classList.add("active");
    header.classList.add("active");
    } else {
    wrap.classList.remove("active");
    header.classList.remove("active");
    }
});

// 펼침 목록들 보기 기능
// 더보기 목록 기능
const menuBt = document.getElementById("menu-bt");
const menuList = document.getElementById("menu-list");
// 참여 목록 기능
const joinBt = document.getElementById("join-bt");
const joinList = document.getElementById("join-list");
//  조합원센터 목록 기능
const centerBt = document.getElementById("center-bt");
const centerList = document.getElementById("center-list");
// 배열 순서 번호가 주어짐
// 배열 순서 번호 index라고 한다
const toggleListArr = [menuList, joinList, centerList];
const toggleBtArr = [menuBt, joinBt, centerBt];
// 펼침 목록 모두 닫기
// forEach = 하나하나 들고올 때, 반복문
document.addEventListener("click", function(){
    toggleListArr.forEach(function(item){
        item.style.display = "none";
    });
    // 버튼 초기화
    toggleBtArr.forEach(function(item){
        item.classList.remove("active");
    });
});
// 목록 전체를 클릭을 해도 이벤트 전달을 막아준다
toggleListArr.forEach(function(item){
    item.addEventListener("click", function(event){
        event.stopPropagation()
    })
})
// 코드 블럭이 같은 기능이 반복된다
// 기능을 만드어서 써야겠다
function listToggle(버튼, 목록){
    // 처음에는 목록을 보여주지 않는다
    목록.style.display = "none";
// 클릭 이벤트가 발생하면 함수를 실행한다
    버튼.addEventListener("click", function (event){
        // 클릭이 되었다면 이벤트가 아래로 전달된다
        // 클릭된 이벤트를 아래로 전달하지 못하도록 막아준다
        // stopPropagation = 이벤트를 막아주는 기능
        event.stopPropagation();
        toggleListArr.forEach(function(item){
            item.classList.remove("active")
        });
        console.log(목록);
        const nowListId = 목록.getAttribute("id")
        // 내가 체크한 거 말고 다른 두개를 display = none
        const hideArr = toggleListArr.filter(function(item){
            let id = item.getAttribute("id");
            console.log(id);
            if (id !== nowListId) {
                return this;
            }
        });
        // 그리고 새로 저장된 배열의 목록들은 
        console.log(hideArr);
        hideArr.forEach(function(item){
            item.style.display = "none";
        });
        const css = getComputedStyle(목록).display;
        // display값을 비교한다 
        if(css === "none"){
            목록.style.display = "block"
            // 클래스를 강제로 추가한다
            버튼.classList.add("active")
        } else{
            목록.style.display = "none"
            // 클래스를 강제로 추가한다
            버튼.classList.remove("active");
        }
    });
}
listToggle(menuBt, menuList);
// toggleListArr[0] = menuList
listToggle(joinBt,joinList);
// toggleListArr[0] = joinList
listToggle(centerBt,centerList);
// toggleListArr[0] = centerList


// 전체 메뉴 펼침 기능
const allMenuArea = document.querySelector(".all-menu-area");
const allMenu = document.querySelector(".all-menu");
const cateList = document.querySelector(".cate-list");
const themaList = document.querySelector(".theme-list");

allMenuArea.addEventListener("mouseleave", function () {
    allMenu.classList.remove("active");
});
cateList.addEventListener("mouseenter", function () {
    allMenu.classList.add("active");
});
themaList.addEventListener("mouseleave", function () {
    allMenu.classList.remove("active");
});
// 서브 카테고리 보여주기
const cateLists = document.querySelectorAll(".cate-list > li");
const cateDepth2 = document.querySelectorAll(".cate-depth2-list")
cateLists.forEach(function(item,index){
    item.addEventListener("mouseenter", function(){
        cateDepth2.forEach(function(itemSub,indexSub){
            itemSub.style.display = "none";
            if(indexSub === index) {
                itemSub.style.display = "block"
            }
        });
        console.log(index);
    });
});
};
