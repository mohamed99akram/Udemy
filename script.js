function createCourse(course) {
    let html = 
        `
            <div class="course">
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
    courses.forEach((course) => {
        if(course.category == currentTab){
            coursesContainer.innerHTML += createCourse(course);
        }
    });
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
    updateCourses(courses);

  });

let coursesTabs = document.querySelectorAll(".tablinks");
coursesTabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
        // make all unactive
        coursesTabs.forEach((tab2)=>{tab2.classList.remove('active')});
        // make current active
        tab.classList.add('active');
        // change current tab's courses
        currentTab = tab.innerText;
        let courses = JSON.parse(localStorage.getItem("courses"));
        updateCourses(courses);
        // change marketing
        let marketing = JSON.parse(localStorage.getItem("marketing"));
        let useless = document.querySelector('.useless');
        useless.querySelector('h2').innerText = marketing[currentTab].brief;
        useless.querySelector('p').innerText = marketing[currentTab].details;
    });
});
