const el = {
    form: document.querySelector('.main-form'),
    tasks: document.querySelectorAll('.task-style'),
    input_add: document.querySelector('#add-task'),
    input_find: document.querySelector('#find-task'),
    btnAdd: document.querySelector('#btn-add'),
    btnFind: document.querySelector('#btn-find'),
    tasksContainer: document.querySelector('.tasks-container')
}

const addTask = (task) => {
    let divTask = document.createElement('div')
    divTask.classList.add('task-style')
    divTask.innerText = task

    let btnOptions = document.createElement('button')
    btnOptions.classList.add('btn-task-option')
    btnOptions.textContent = '...'

    divTask.appendChild(btnOptions)
    el.tasksContainer.appendChild(divTask)
}

el.btnAdd.addEventListener('click', (e) => {
    addTask(el.input_add.value)
    el.input_add.value = ''
})

const findTask = (task) => {
    const nodeList = document.querySelectorAll('.task-style')
    let findedTask = []
    nodeList.forEach((e) => {
        if (e.textContent === task) {
            findedTask.push(e)
        } 
    })

    console.log(findedTask)
}

el.btnFind.addEventListener('click', (e) => {
    findTask(el.input_find.value)
})