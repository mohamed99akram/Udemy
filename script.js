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

fetch(
  "https://raw.githubusercontent.com/mohamed99akram/Udemy/phase2/courses.json"
)
  .then((response) => response.json())
  .then((json) => {
    let coursesContainer = document.querySelector(".courses-container");
    let courses = json.courses;
    courses.forEach((course) => {
        coursesContainer.innerHTML += createCourse(course);
    });
  });
