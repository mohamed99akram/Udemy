function createCourse(course) {
    let html = 
        `
            <div class="course carousel-item">
                <a href="#">
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
            </div>
            `;
    return html;
}
let currentTab = "Python";
function updateCourses(courses){
    
    let coursesContainer = document.querySelector(".courses-container");
    coursesContainer.innerHTML = "";
    courses.forEach((course) => coursesContainer.innerHTML += createCourse(course));
    coursesContainer.querySelectorAll('.course')[0]?.classList.add("active");
    coursesContainer.querySelectorAll('.course')[1]?.classList.add("active");
    // coursesContainer.querySelectorAll('.course')[2]?.classList.add("active");
}
fetch(
  "https://raw.githubusercontent.com/mohamed99akram/Udemy/phase2/courses.json"
)
  .then((response) => response.json())
  .then((json) => {
    let courses = json.courses;
    if(courses){
        localStorage.setItem("courses", JSON.stringify(courses));
        localStorage.setItem("marketing", JSON.stringify(json.marketing));
    }
    courses = courses.filter((course) => course.category == currentTab);
    console.log('courses', courses)
    updateCourses(courses);

  });

let coursesTabs = document.querySelectorAll(".tablinks");
coursesTabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
        // make all unactive
        coursesTabs.forEach((tab2)=>{tab2.classList.remove('active')});
        // make current active
        tab.classList.add('active');
        document.querySelector('.useless').setAttribute('style', 'display:block');
        // change current tab's courses
        currentTab = tab.innerText;
        let courses = JSON.parse(localStorage.getItem("courses")??"[]");
        courses = courses.filter((course) => course.category == currentTab);
        updateCourses(courses);
        // change marketing
        let marketing = JSON.parse(localStorage.getItem("marketing")??"{}");
        let useless = document.querySelector('.useless');
        useless.querySelector('h2').innerText = marketing[currentTab]?.brief??"Udemy has great Courses";
        useless.querySelector('p').innerText = marketing[currentTab]?.details??"Take them for very good prices! offer starts now";
    });
});

let submitButton = document.querySelector(".submitbutton");
submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector('.useless').setAttribute('style', 'display:none');
    let courses = JSON.parse(localStorage.getItem("courses")??"[]");
    let searchInput = document.querySelector(".searchbar").value;
    let filteredCourses = courses.filter((course) => {
        return course.title.toLowerCase().includes(searchInput.toLowerCase());
    });
    updateCourses(filteredCourses);
});