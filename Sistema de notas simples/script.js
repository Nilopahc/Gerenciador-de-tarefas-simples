function verificar(name, age, course, grade){
    if(name.value.length == 0 || course.value.length == 0 || age.value.length == 0 || grade.value.length == 0){
        alert('Preencha todos os campos')
        return false
    }else if(Number(age.value) < 1 /* No meu código recem nascidos nao estudam*/ || Number(age.value) > 120/*Nem idosos*/){
        alert('Insira uma idade válida')
        age.focus()
        return false
    }else if(Number(grade.value) > 10 || Number(grade.value) < 0){
        alert('Insira uma nota de 0 a 10')
        grade.focus()
        return false
    }
    return true
}

function guardar(){
    let name = document.getElementById('student-name')
    let age = document.getElementById('student-age')
    let course = document.getElementById('student-course')
    let grade = document.getElementById('student-grade')
    let res = document.getElementById('students-table')

    if(verificar(name, age, course, grade)){
        addStudent(name.value, Number(age.value), course.value, Number(grade.value))
        name.value = '';
        age.value = '';
        course.value = '';
        grade.value = '';
    }
}
function addStudent(name, age, course, grade){
    let students = JSON.parse(localStorage.getItem('students')) || []
    let entry = {name, age, course, grade}
    students.push(entry)
    localStorage.setItem('students', JSON.stringify(students))
    addTable()
}

function deletar(index, data){
    data.splice(index, 1)
    console.log(data)
    localStorage.setItem('students', JSON.stringify(data))
    addTable()
    console.log('s')
}
function editar(index, data){
    console.log('teste')
    let student = data[index]
    let form = document.getElementById('student-form')
    let buttonSave = document.getElementById('button-save')

    let existingButton = document.getElementById('edit-button')
    if(existingButton) existingButton.remove()

    let button = document.createElement('button')
    button.setAttribute('id', 'edit-button')
    button.textContent = 'Editar'
    form.appendChild(button)
    
    let name = document.getElementById('student-name')
    let age = document.getElementById('student-age')
    let course = document.getElementById('student-course')
    let grade = document.getElementById('student-grade')
    name.focus()
    name.value = student.name
    age.value = student.age
    course.value = student.course
    grade.value = student.grade

    button.addEventListener('click', () => {
        if (verificar(name, age, course, grade)){
            student.name = name.value
            student.age = age.value
            student.course = course.value
            student.grade = grade.value
            data[index] = student
            localStorage.setItem('students', JSON.stringify(data))
            addTable()

            name.value = ''
            age.value = ''
            course.value = ''
            grade.value = ''
        }
    })
}

function addTable(){
    let students = JSON.parse(localStorage.getItem('students')) || []
    let table = document.getElementById('student-resp')
    table.innerHTML = '';
    for(let i = 0; i < students.length; i++){

        let buttonEdit = document.createElement('button')
        buttonEdit.setAttribute('class', 'act')
        buttonEdit.textContent = 'editar'
        buttonEdit.addEventListener ('click', () => editar(i, students))

        let buttonDel = document.createElement('button')
        buttonDel.setAttribute('class', 'act')
        buttonDel.textContent = 'excluir'
        buttonDel.addEventListener('click', () => deletar(i, students))

        let linhas = document.createElement('tr')

        let colName = document.createElement('td')
        let textName = document.createTextNode(students[i].name)
        
        let colAge = document.createElement('td')
        let textAge = document.createTextNode(students[i].age)

        let colCourse = document.createElement('td')
        let textCourse = document.createTextNode(students[i].course)

        let colGrade = document.createElement('td')
        let textGrade = document.createTextNode(students[i].grade)

        let colAction = document.createElement('td')
        colAction.setAttribute('id', 'action')

        
        colName.appendChild(textName)
        colAge.appendChild(textAge)
        colCourse.appendChild(textCourse)
        colGrade.appendChild(textGrade)
        colAction.appendChild(buttonDel)
        colAction.appendChild(buttonEdit)

        linhas.appendChild(colName)
        linhas.appendChild(colAge)
        linhas.appendChild(colCourse)
        linhas.appendChild(colGrade)
        linhas.appendChild(colAction)
        table.appendChild(linhas)
    }
}
function limparTabelaDuranteTestes(){
    localStorage.clear()
    addTable()
}
window.scrollTo({ top: 0, behavior: 'smooth' });

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("students")) {
        addTable();
    }
});