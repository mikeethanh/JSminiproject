
var courseAPI = 'http://localhost:3000/courses'

function start() {
    getCourse(renderCourses)

    handleForm()
}
//chay ung dung 
start()


/**fetch(courseAPI): Hàm fetch được sử dụng để thực hiện một cuộc gọi 
 * mạng để tải dữ liệu từ một API, trong trường hợp này, API được truyền qua biến courseAPI.
.then(function(response) { ... }): Hàm .then là một phần của Promises trong JavaScript và
 nó chạy khi cuộc gọi fetch hoàn thành thành công. Trong hàm này, response là kết quả trả về từ API.
return response.json(): Trong phần .then, mã này chuyển đổi dữ liệu JSON từ response bằng cách 
sử dụng phương thức .json(). Phương thức này trả về một Promise chứa dữ liệu JSON.
.then(callback): Khi dữ liệu JSON đã được tạo ra, nó được truyền cho hàm callback được cung cấp. 
Hàm callback này sẽ được gọi với dữ liệu khóa học là tham số. Cụ thể, nó sẽ gọi hàm callback được truyền vào getCourse. */
function getCourse(callback) {
    //dung fetch de lay ra cac khoa hoc 
    fetch(courseAPI)
      .then(function(response) {
        //tra ve cac khoa hoc , tra ve callback
            return response.json()
        })
      .then(callback)
}

//ham tao 1 khoa hoc tu form 
function createCourse(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(data)
    }

    fetch(courseAPI, options) 
        .then(function(response) {
            return response.json()
        })
        .then(callback)
}

function deleteCourse(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }, 
    }

    fetch(courseAPI + '/' + id, options) 
        .then(function(response) {
            return response.json()
        })
        .then(function(response) {

        })
}

//ham de render ra html
function renderCourses(courses) {
    var listCoursesBlocks = document.querySelector('#list-courses')
    var htmls = courses.map(function(course) {
        return `
            <li>
                <h3>${course.name}</h3>
                <p>${course.description}</p>
                <button onclick = "deleteCourse(${course.id})">&times;</button>
            </li>`  
    })
    //innerHTML là một thuộc tính của các phần tử HTML trong 
    //JavaScript. Thuộc tính này cho phép bạn truy cập và thay đổi nội dung HTML bên trong một phần tử.
    listCoursesBlocks.innerHTML = htmls.join('')
}


//handleForm
function handleForm() {
    //lau ra the co id create va gan vao createBtn
    var createBtn = document.querySelector("#create")
    //lang nghe su kien onclick
    createBtn.onclick = function() {
        //khi lang nghe thi lay ra value nhap vao input 
        var name = document.querySelector('input[name = "name"]').value
        var description = document.querySelector('input[name = "description"]').value

        var formData = {
            name: name,
            description: description
        }

        createCourse(formData)
    }
}