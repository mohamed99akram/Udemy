function getCourseCard(course){
    let html = 
    `
    <a href="#" class="course-card">
                    <img src="${course?.image??"assets/PLMP"}" alt="courseImg" width="100%">
                    <div class="course-text">
                        <h3>${course?.title??"Course Name"}</h3><span class="instructorName">${course?.instructor??"Jeff Bezos"}</span>
                        <div>
                            <span class="rating">${course?.rating??4.5}</span>
                            ${course.rating>=1?`<span class="fa fa-star checked"></span>`:`<span class="fa fa-star"></span>`}
                            ${course.rating>=2?`<span class="fa fa-star checked"></span>`:`<span class="fa fa-star"></span>`}
                            ${course.rating>=3?`<span class="fa fa-star checked"></span>`:`<span class="fa fa-star"></span>`}
                            ${course.rating>=4?`<span class="fa fa-star checked"></span>`:`<span class="fa fa-star"></span>`}
                            ${course.rating>=5?`<span class="fa fa-star checked"></span>`:`<span class="fa fa-star"></span>`}
                        </div>
                        <h3>${course?.price??"Free"}</h3>
                    </div>
                </a>
    `
    return html;
}
function createCourse(course) {
    let html = 
        `
            <div class="course carousel-item">
                ${getCourseCard(course)}
            </div>
            `;
    return html;
}
let currentTab = "Python";
function updateCourses(courses){
    console.log("hi how are you?");
    let coursesContainer = document.querySelector("#myTabContent");
    courses.forEach((course) => coursesContainer.innerHTML += getCourseCard(course));
    coursesContainerList = coursesContainer.querySelectorAll('.course')
    for(let i = 0; i < coursesContainerList.length; i++)
       coursesContainerList[i  ]?.classList.add("active");
}
function populateTab(tabName){
    let html = 
    `
      <div class="tab-pane fade" id="${tabName}" role="tabpanel" >
        <div class="useless"><h2></h2><p></p></div>
        <div class="carousel slide" data-ride="carousel"data-interval="false">
            <div class="carousel-inner courses-container"></div>
            <button class="carousel-control-prev" >
                <span class="carousel-control-prev-icon"style="background-color:black" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </button>
            <button class="carousel-control-next">
            <span class="carousel-control-next-icon"style="background-color:black"  aria-hidden="true"></span>
            <span class="sr-only">Next</span>
            </button>
        </div>
    </div>
    `
    return html;
}
tabs = ['python', 'excel','web-development', 'javascript', 'data-science', 'aws-certification', 'drawing']
tabsMap = {'Python':'python', 'Excel':'excel', 'Web Development':'web-development',
 'Javascript':'javascript','Data Science':'data-science', 
 'AWS Certification':'aws-certification',
  'Drawing':'drawing'};
reverseTabsMap = {};
for(var key in tabsMap){
    reverseTabsMap[tabsMap[key]] = key;
}
fetch(
  "https://raw.githubusercontent.com/mohamed99akram/Udemy/Phase3/courses.json"
)
  .then((response) => response.json())
  .then((json) => {
    let courses = json.courses;
    let marketing = json.marketing;
    // store data in local storage
    if(courses){
        localStorage.setItem("courses", JSON.stringify(courses));
        localStorage.setItem("marketing", JSON.stringify(marketing));
    }
    // add tabs
    tabContents = document.querySelector('#myTabContent');
    tabContents.innerHTML = ''
    tabs.forEach((tabName)=>tabContents.innerHTML+=populateTab(tabName));
    // add carousel actions for each tab
    tabs.forEach((tab)=>{
    document.querySelector(`#${tab} .carousel-control-prev`).addEventListener('click', ()=>{
        let active = document.querySelectorAll(`#${tab} .carousel-item.active`);
        let prev = active[0].previousElementSibling;
        if(prev){
            active[active.length-1].classList.remove('active');
            prev.classList.add('active');
        }
      });
      document.querySelector(`#${tab} .carousel-control-next`).addEventListener('click',()=>{
        let active = document.querySelectorAll(`#${tab} .carousel-item.active`);
        let next = active[active.length - 1].nextElementSibling;
        if(next){
            active[0].classList.remove('active');
            next.classList.add('active');
        }
      });
    });
    // add courses data
    courses.forEach((course)=>{
        requiredTab = document.querySelector(`#${tabsMap[course.category]} .courses-container`)
        requiredTab.innerHTML+=createCourse(course);
    });
    document.querySelector(`#${tabs[0]}`).classList.add('show');
    document.querySelector(`#${tabs[0]}`).classList.add('active');
    
    
    for(let i = 0; i < tabs.length; i++){
        let coursesList = document.querySelectorAll(`#${tabs[i]} .course`)
        let useless = document.querySelector(`#${tabs[i]} .useless`);
        useless.querySelector('h2').innerText = marketing[reverseTabsMap[tabs[i]]]?.brief??"Udemy has great Courses";
        useless.querySelector('p').innerText = marketing[reverseTabsMap[tabs[i]]]?.details??"Take them for very good prices! offer starts now";
        
        for(let j = 0; j < 3; j++){
            coursesList[j]?.classList.add('active');
        }
    }

  });
let submitButton = document.querySelector(".submitbutton");
submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    tabs.forEach((tab)=>{
        document.querySelector(`#${tab}`).classList.remove('show');
        document.querySelector(`#${tab}`).classList.remove('active');
    });
//     // document.querySelector('.useless').setAttribute('style', 'display:none');
    let courses = JSON.parse(localStorage.getItem("courses")??"[]");
    let searchInput = document.querySelector(".searchbar").value;
    let filteredCourses = courses.filter((course) => {
        return course.title.toLowerCase().includes(searchInput.toLowerCase());
    });
    updateCourses(filteredCourses);
});