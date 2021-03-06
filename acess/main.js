let todoItems = [];

// Render todo
setRemain();
function rederTodo (todo) {
    const itemCheck = document.querySelector(`[data-key = '${todo.id}']`);
    const ischecked = todo.checked ? "ok" : "";
    const list = document.querySelector(".list-tasks") ;
    const item = document.createElement("li");
    item.className = "list-tasks-item";
    item.setAttribute('draggable',true);
    item.setAttribute('data-key', todo.id);
    item.innerHTML = `
   <div class="app_creat-status-non app_creat-status-${ischecked}"></div>
   <span class="list-tasks-item-content list-tasks-item-content--${ischecked}">${todo.text}</span>
   <div class="app_creat-status--remove"></div>
   `;
   if (itemCheck) {
       list.replaceChild(item, itemCheck)
    }
    else {
        list.prepend(item);
    }
    setRemain();
};

// Set item remain
function setRemain () {
    const remain = document.querySelector('.app_creat-status-no');
    const num = todoItems.filter (item => item.checked !=true).length;
    remain.innerHTML =`
    ${num} items left
    `;
}

function addTodo (text) {
    const todo ={ 
        text,
        checked: false,
        id: Date.now(),
    };
    todoItems.push(todo);
    rederTodo(todo);
};

function toggleOk (key) {
    const index = todoItems.findIndex(item => item.id == Number(key));
    todoItems[index].checked = !todoItems[index].checked;
    rederTodo(todoItems[index]);
    setRemain();
}
 
// Get input to todo
const form = document.querySelector(".form-input");
form.addEventListener ("submit", e => {
    e.preventDefault();
    const input = document.querySelector(".app_creat-input");
    const text = input.value.trim();
    if (text !== "") {
    addTodo(text);
    input.value="";
    input.focus();
    }
});
const add = document.querySelector('.app_creat-status-add');
add.addEventListener ('click', e => {
    e.preventDefault();
    const input = document.querySelector(".app_creat-input");
    const text = input.value.trim();
    if (text !== "") {
    addTodo(text);
    input.value="";
    input.focus();
    }
})
// Clear Items
const clear = document.querySelector('.list-tasks-item-clear');
clear.addEventListener('click', e => {
    const todoOK = document.querySelectorAll('.list-tasks-item-content--ok');
    todoOK.forEach( e => e.parentElement.remove());
    todoItems = todoItems.filter (item => item.checked ==false);
    setRemain();
});
// Change status todo to OK
const list = document.querySelector(".list-tasks");
list.addEventListener('click', event => {
    if (event.target.classList.contains("app_creat-status-non")) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleOk (itemKey);
    }
});


// Drag or Drop
const check = document.querySelector('.list-tasks');
check.addEventListener('mousedown', dragDrop,false);
function dragDrop() {
    var itemsDrag = document.querySelectorAll('.list-tasks-item');
    var dragSel =null;
    // Drag Start
    function handleDragStart(e) {
    this.style.opacity = "0.5";
    dragSel = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData ('text/html', this.innerHTML);
    };
    // Drag over
    function handleDragOver (e) {
        if (e.preventDefault()) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }
    // // Drag enter
    // function handleDragEnter(e) {
    //     this.classList.add("over");
    // }

    // // Drag leave
    // function handleDrangLeave (e) {
    //     this.classList.remove('over');
    // }
    // Drag Drop
    function handleDrop (e) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        if (dragSel != this) {
            dragSel.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');
        }
        return false;
    }
    // Drag End
    function handleDragEnd (e) {
        this.style.opacity = "1";
        itemsDrag.forEach(function (item) {
            item.classList.remove('over');
        });
    };
    itemsDrag.forEach(function(item) {
    item.addEventListener('dragstart', handleDragStart, false);
    // item.addEventListener('dragenter', handleDragEnter,false);
    item.addEventListener('dragover', handleDragOver, false);
    // item.addEventListener ('dragleave',handleDrangLeave,false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEnd, false); 
    });
};
// Clear Item
document.addEventListener('click', e => {
    if(e.target.classList.contains('app_creat-status--remove')) {
    e.target.parentElement.remove();
    todoItems= todoItems.filter(item => item.id != e.target.parentElement.dataset.key);
    };
    setRemain();
})
//  Status
var statusActive = document.querySelector(".app-status-active");
var statusCompleted = document.querySelector ('.app-status-completed');
var statusAll = document.querySelector (".app-status-all");
// Active
    statusActive.addEventListener('click', e => {
    var displayItems = todoItems.filter(e => e.checked ==false);
    statusActive.style.color='#4980f4';
    statusCompleted.style.color='#5c5e77';
    statusAll.style.color='#5c5e77';
    renderAll(displayItems);
});
    // Completed
    statusCompleted.addEventListener('click', e => {
        var displayItems = todoItems.filter(e => e.checked ==true);
        statusCompleted.style.color='#4980f4';
        statusAll.style.color='#5c5e77';
        statusActive.style.color='#5c5e77';

        renderAll(displayItems);
});
    //All
statusAll.addEventListener('click', e => {
    var displayItems = todoItems;
    statusAll.style.color='#4980f4';
    statusActive.style.color='#5c5e77';
    statusCompleted.style.color='#5c5e77';

    renderAll(displayItems);
});

//  SORT F0R MOBILE 
//  Status
var statusActive1 = document.querySelectorAll(".app-status-active")[1];
var statusCompleted1 = document.querySelectorAll ('.app-status-completed')[1];
var statusAll1 = document.querySelectorAll (".app-status-all")[1];
// Active
    statusActive1.addEventListener('click', e => {
    var displayItems = todoItems.filter(e => e.checked ==false);
    statusActive1.style.color='#4980f4';
    statusCompleted1.style.color='#5c5e77';
    statusAll1.style.color='#5c5e77';
    renderAll(displayItems);
});
    // Completed
    statusCompleted1.addEventListener('click', e => {
        var displayItems = todoItems.filter(e => e.checked ==true);
        statusCompleted1.style.color='#4980f4';
        statusAll1.style.color='#5c5e77';
        statusActive1.style.color='#5c5e77';

        renderAll(displayItems);
});
    //All
statusAll1.addEventListener('click', e => {
    var displayItems = todoItems;
    statusAll1.style.color='#4980f4';
    statusActive1.style.color='#5c5e77';
    statusCompleted1.style.color='#5c5e77';

    renderAll(displayItems);
});

// 
function renderAll(displayItems) {
    const clearScreen = document.querySelectorAll('.list-tasks-item');
    clearScreen.forEach(items => items.remove());

    const list = document.querySelector(".list-tasks") ;
    displayItems.forEach( e => {
        const item = document.createElement("li");
        item.className = "list-tasks-item";
        item.setAttribute ('draggable', 'true');
        item.setAttribute('data-key', e.id);

        const ischecked = e.checked ? "ok"  : "";
        item.innerHTML = `
        <div class="app_creat-status-non app_creat-status-${ischecked}"></div>
        <span class="list-tasks-item-content list-tasks-item-content--${ischecked}">${e.text}</span>
        <div class="app_creat-status--remove"></div>
        
        `;
        list.prepend(item);  
    });
    setRemain();
};

// Change Dark - Light them

const themChange = document.querySelector('.img-status');
themChange.addEventListener('click', e => {
    document.querySelector('.header-light').classList.toggle('header-dark');
    document.querySelector('.img-status-light').classList.toggle('img-status-dark');
    if (document.documentElement.dataset.theme != "dark") {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
    }

});
    