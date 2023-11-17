const el = {
    form: document.querySelector('.main-form'),
    tasks: document.querySelectorAll('.task-style'),
    input_add: document.querySelector('#add-task'),
    input_find: document.querySelector('#find-task'),
    btnAdd: document.querySelector('#btn-add'),
    btnFind: document.querySelector('#btn-find'),
    tasksContainer: document.querySelector('.tasks-container'),
    input_edit: document.querySelector('#edit-task'),
}

const divContent = (div) => {
    let textContent = ''

    div.childNodes.forEach((node) => {
        if (node.nodeType === node.TEXT_NODE) {
            textContent += node.textContent
        }
    });

    return textContent.trim()
}

const addTask = (task) => {
    if (task.length > 5) {
        let divTask = document.createElement('div')
        let divContent = document.createElement('div')
        divContent.classList.add('task-content')
        divContent.innerText = task
        divTask.classList.add('task-style')
        divTask.appendChild(divContent)

        let btnContainer = document.createElement('div')
        btnContainer.classList.add('btn-container')
    
        let btnDelete = document.createElement('button')
        btnDelete.classList.add('btn-task-delete')
        btnDelete.classList.add('btn-task-style')
        btnDelete.innerText = 'D'

        let btnEdit = document.createElement('button')
        btnEdit.classList.add('btn-task-edit')
        btnEdit.classList.add('btn-task-style')
        btnEdit.innerText = "E"

        let btnConcluir = document.createElement('button')
        btnConcluir.classList.add('btn-task-concluir')
        btnConcluir.classList.add('btn-task-style')
        btnConcluir.innerText = 'C'

        btnContainer.appendChild(btnDelete)
        btnContainer.appendChild(btnConcluir)
        btnContainer.appendChild(btnEdit)

        divTask.appendChild(btnContainer)
        el.tasksContainer.appendChild(divTask)
    }
}

el.btnAdd.addEventListener('click', (e) => {
    addTask(el.input_add.value)
    el.input_add.value = ''
})

const findTask = (task) => {
    const nodeList = document.querySelectorAll('.task-content')
    let index = false
    console.log(nodeList)
    nodeList.forEach((e, i) => {
        console.log(e.textContent)
        if (e.textContent.toLowerCase() == task.toLowerCase()) {
            e.parentNode.style.border = "2px solid red"
            setTimeout(function () {
                e.parentNode.style.border = ''
            }, 2500)
            index = i
        } 
    })

    if (index) {
        let pai = nodeList[index].parentNode.parentNode
        pai.removeChild(nodeList[index].parentNode)
        pai.insertBefore(nodeList[index].parentNode, pai.firstChild)
    }
    // depois de encontrar a(s) tasks que estão sendo procuradas vou coloca-las
    // no topo da lista e destaca-las com uma borda laranja
}

el.btnFind.addEventListener('click', (e) => {
    findTask(el.input_find.value)
})

const deleteTask = (task) => {
    let pai = task.parentNode.parentNode // pai do pai
    pai.parentNode.removeChild(pai) // pai do pai do pai, remove o pai do pai
}

const editTask = (task) => {
    document.querySelector('.edit-task-container').style.display = 'flex'
    let pai = task.parentNode.parentNode
    el.input_edit.value = ''
    el.input_edit.value = pai.querySelector('.task-content').textContent
    console.log(pai.querySelector('.task-content').textContent)

    return new Promise((resolve, reject) => {
        let editedTask = ''
        document.querySelector('#btn-edit').addEventListener('click', (e) => {
            console.log('oi')
            if (e.target.className === 'form-button' && el.input_edit.value.trim() !== '') {
                editedTask = el.input_edit.value.trim()
                el.input_edit.value = ''
                resolve(editedTask)

                setTimeout(() => {
                    document.querySelector('.edit-task-container').style.display = 'none'
                }, 500)
            } else {
                reject('Edição inválida.')
            }
        })
    })
}

const concluirTask = (btnConcluir) => {
    let pai = btnConcluir.parentNode.parentNode
    pai.style.border = '2px solid rgb(0, 255, 0)'

    setTimeout(() => { 
        pai.style.border = '' 
        deleteTask(btnConcluir)
    }, 1500)

}

el.tasksContainer.addEventListener('click', async (e) => {
    console.log(e.target.className)
    if (e.target.className === 'btn-task-delete btn-task-style') {
        console.log('delete')
        deleteTask(e.target)
    } else if (e.target.className === 'btn-task-edit btn-task-style') {
        console.log('edit')
        try {
            const editedTask = await editTask(e.target)
            let pai = e.target.parentNode.parentNode
            console.log(pai)
            pai.querySelector('.task-content').textContent = editedTask
        } catch(e) {
            console.log(e)
        }
    } else if (e.target.className === 'btn-task-concluir btn-task-style') {
        console.log('concluir')
        concluirTask(e.target)
    }
})