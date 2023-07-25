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

    // data.json을 로딩
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (event) {
    const req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
        const str = req.response;
        // 글자로 온 데이터를 객체로 변환
        // 글자가 json 규칙대로 만들어진 문자열이다
        // 그러므로 json 글자를 객체로 변환해서 활용한 것
        let obj = JSON.parse(str);

        //
        VISUAL_ARR = obj.visual;
        // 비주얼 화면에 배치한다
        showVisual();
    }
    };

    // 자료를 호출한다
    console.log("자료를 가져온다. XMLHT.....");
    xhttp.open("GET", "data.json");
    // 웹브라우저 기능을 실행할 수 있도록 요청
    xhttp.send();

    let VISUAL_ARR;
    let visualTag = document.getElementById("data-visual");

    // 비주얼 화면 출력 기능
    function showVisual() {
    let html = "";
    VISUAL_ARR.forEach(function (item) {
        const tag = `
        <div class="swiper-slide">
        <div class="visual-slide-page">
        <a href = "${item.link}">
        <img src="../images/${item.pic}" alt="${item.name}"/>
        </a>
        </div>
        </div>
        `;
        html += tag;
    });
    visualTag.innerHTML = html;
    // 비주얼 슬라이드 기능
    const showVisual = new Swiper(".sw-visual", {
        Loop: true,
        navigation: {
        prevEl: ".visual-prev",
        nextEl: ".visual-next",
        },
        autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        },
        pagination: {
        el: ".visual-pg",
        type: "fraction",
        },
    });
    }
    // 퍌침 목록들 보기 기능
    // 더보기 목록 기능
    const menuBt = document.getElementById("menu-bt");
    const menuList = document.getElementById("menu-list");
    // 참여 목록 기능
    const joinBt = document.getElementById("join-bt");
    const joinList = document.getElementById("join-list");
    // 조합원센터 목록 기능
    const centerBt = document.getElementById("center-bt");
    const centerList = document.getElementById("center-list");
    // 배열 순서번호가 주어진다
    // 배열순서번호 - index 라고 한다
    const toggleListArr = [menuList, joinList, centerList];
    const toggleBtArr = [menuBt, joinBt, centerBt];
    // 펼침 목록 전부!! 닫기
    document.addEventListener("click", function () {
    toggleListArr.forEach(function (item) {
        item.style.display = "none";
    });
    // 버튼 초기화
    toggleBtArr.forEach(function (item) {
        item.classList.remove("active");
    });
    });
    // 목록 전체를 클릭해도 이벤트 전달 막는다
    toggleListArr.forEach(function (item) {
    item.addEventListener("click", function (event) {
        event.stopPropagation();
    });
    });
    // 코드 블럭이 같은 기능 반복됨
    // 기능을 만들어서 씀
    function listToggle(버튼, 목록) {
    // 처음에는 목록을 보여주지 않음
    목록.style.display = "none";
    // click 이벤트가 발생하면 함수 실행
    버튼.addEventListener("click", function (event) {
        // 클릭이 되었다면 이벤트가 아래로 전달됨
        // 클릭된 이벤트를 아래로 전달하지 못하도록 막아줌
        event.stopPropagation();
        toggleBtArr.forEach(function (item) {
        item.classList.remove("active");
        });
        const nowListId = 목록.getAttribute("id");
        const hideArr = toggleListArr.filter(function (item) {
        let id = item.getAttribute("id");
        if (id !== nowListId) {
            return this;
        }
        });
        // 새로 저장된 배열의 목록들은
        hideArr.forEach(function (item) {
        item.style.display = "none";
        });
        const css = getComputedStyle(목록).display;
        // display 값 비교
        if (css === "none") {
        목록.style.display = "block";
        // 클래스를 강제로 추가
        버튼.classList.add("active");
        } else {
        목록.style.display = "none";
        // 클래스 강제로 추가
        버튼.classList.remove("active");
        }
    });
    }
    listToggle(menuBt, menuList);
    // toggleListArr[0] = menuList;
    listToggle(joinBt, joinList);
    // toggleListArr[1] = joinList;
    listToggle(centerBt, centerList);
    // toggleListArr[2] = centerList;

    // 전체 메뉴 펼침 기능
    const allMenuArea = document.querySelector(".all-menu-area");
    const allMenu = document.querySelector(".all-menu");
    const cateList = document.querySelector(".cate-list");
    const themeList = document.querySelector(".theme-list");

    allMenuArea.addEventListener("mouseleave", function () {
    allMenu.classList.remove("active");
    });
    cateList.addEventListener("mouseenter", function () {
    allMenu.classList.add("active");
    });
    themeList.addEventListener("mouseleave", function () {
    allMenu.classList.remove("active");
    });

    // 서브 카테고리 보여주기
    const cateLists = document.querySelectorAll(".cate-list > li");
    const cateDepth2 = document.querySelectorAll(".cate-depth2-list");
    cateLists.forEach(function (item, index) {
    item.addEventListener("mouseenter", function () {
        cateDepth2.forEach(function (itemSub, indexSub) {
        itemSub.style.display = "none";
        if (indexSub === index) {
            itemSub.style.display = "block";
        }
        });
    });
    });
};