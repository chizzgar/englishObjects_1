(() => {
    const alphabetDraggable = [
        {
            id: 'al_1',
            letter: 'A a',
        },
        {
            id: 'al_2',
            letter: 'B b',
        },
        {
            id: 'al_3',
            letter: 'C c',
        },
        {
            id: 'al_4',
            letter: 'D d',
        },
        {
            id: 'al_5',
            letter: 'E e',
        },
        {
            id: 'al_6',
            letter: 'F f',
        },
        {
            id: 'al_7',
            letter: 'G g',
        },
        {
            id: 'al_8',
            letter: 'H h',
        },
        {
            id: 'al_9',
            letter: 'I i',
        },
        {
            id: 'al_10',
            letter: 'J j',
        },
        {
            id: 'al_11',
            letter: 'K k',
        },
        {
            id: 'al_12',
            letter: 'L l',
        },
        {
            id: 'al_13',
            letter: 'M m',
        },
        {
            id: 'al_14',
            letter: 'N n',
        },
        {
            id: 'al_15',
            letter: 'O o',
        },
        {
            id: 'al_16',
            letter: 'P p',
        },
        {
            id: 'al_17',
            letter: 'Q q',
        },
        {
            id: 'al_18',
            letter: 'R r',
        },
        {
            id: 'al_19',
            letter: 'S s',
        },
        {
            id: 'al_20',
            letter: 'T t',
        },
        {
            id: 'al_21',
            letter: 'U u',
        },
        {
            id: 'al_22',
            letter: 'V v',
        },
        {
            id: 'al_23',
            letter: 'W w',
        },
        {
            id: 'al_24',
            letter: 'X x',
        },
        {
            id: 'al_25',
            letter: 'Y y',
        },
        {
            id: 'al_26',
            letter: 'Z z',
        },
    ];


    const alphabetWrapper = document.querySelector('.alphabetWrapper_simple');
    const alphabetDropPlace = document.querySelector('.alphabetDropPlace_simple');
    const alphabetDragPlace = document.querySelector('.alphabetDragPlace_simple');

    const interakt_zadanie = alphabetWrapper.parentElement;
    const headCheck = interakt_zadanie.previousElementSibling;

    const drop = headCheck.querySelector('.drop');
    const check_your = headCheck.querySelector('.check_your');
    const result = headCheck.querySelector('.result');

    drop.addEventListener('click', resetPuzzle);
    let startAction = false;

    // <div className="letterCard_drop" drop-data={item.id} ></div>
    alphabetDraggable.forEach((elem) => {
        const dropPalce = document.createElement('div');
        dropPalce.classList.add('letterCard_drop');
        dropPalce.style.display = 'block';
        dropPalce.setAttribute('drop-data', elem.id);
        alphabetDropPlace.appendChild(dropPalce);
    });


    const alphabetRandomLetters = alphabetDraggable.sort(() => Math.random() > 0.5 ? 1 : -1);

    // <div drag-data={item.id} className="letterCard_drag"><p>{item.letter}</p></div>
    alphabetRandomLetters.forEach((elem) => {
        const div = document.createElement('div');
        div.classList.add('letterCard_drag');
        div.setAttribute('drag-data', elem.id);

        const paragraph = document.createElement('p');
        paragraph.classList.add('letterCard_drag_p');
        paragraph.append(elem.letter);

        div.appendChild(paragraph);
        alphabetDragPlace.appendChild(div);
    });

    const letterCard_drag = document.querySelectorAll('.letterCard_drag');
    const letterCard_drop = document.querySelectorAll('.letterCard_drop');

    letterCard_drag.forEach((e) => {
        e.addEventListener('pointerdown', mouseDown);
    });

    function changeStylesAndAppend(dropPlace, draggingElem) {
        draggingElem.style.position = 'relative ';
        draggingElem.style.zIndex = null;
        draggingElem.style.top = null;
        draggingElem.style.left = null;
        dropPlace.appendChild(draggingElem);
    }

    let draggingItem;
    let elemBelow;

    function mouseDown(event) {
        if (event.button !== 0) return;
        draggingItem = event.target;

        draggingItem.classList.remove('letterCard_drag_active')
        draggingItem.classList.add('letterCard_drag')

        const draggingItemMarginTop = parseInt(getComputedStyle(draggingItem).marginTop.match(/\d+/)); // Если в стилях перетаскиваемого элемента используются margin
        const draggingItemMarginLeft = parseInt(getComputedStyle(draggingItem).marginLeft.match(/\d+/)); // Если в стилях перетаскиваемого элемента используются margin
        const elemDraggingBanBorder = interakt_zadanie;//элемент за границы которого запрещён вылет перетаскиваемой фигуры
        const elemDraggingStartPlace = alphabetDragPlace;  //элемент первоначального расположения перетаскиваемых фигур (стартовое состояние)

        draggingItem.style.touchAction = 'none'; //ОБЯЗАТЕЛЬНОЕ УСЛОВИЕ(МОЖНО УБРАТЬ И ПРОПИСАТЬ В СТИЛЬ САМОМУ ОБЪЕКТУ) 
        draggingItem.style.cursor = 'grabbing';
        let shiftX = event.clientX - draggingItem.getBoundingClientRect().left;
        let shiftY = event.clientY - draggingItem.getBoundingClientRect().top;

        // ЛИММИТЫ КООРДИНАТ ОГРАНИЧИВАЮЩИЕ ВЫЛЕТ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА ЗА БЛОК
        //  (ПО УМОЛЧАНИЮ interact_zadanie - РОДИТЕЛЬ ВАШЕГО БЛОКА)
        let limits = {
            top: elemDraggingBanBorder.offsetTop,
            right: elemDraggingBanBorder.offsetWidth + elemDraggingBanBorder.offsetLeft,
            bottom: elemDraggingBanBorder.offsetHeight + elemDraggingBanBorder.offsetTop,
            left: elemDraggingBanBorder.offsetLeft
        };

        draggingItem.style.position = 'absolute';
        draggingItem.style.zIndex = 1000;
        document.body.appendChild(draggingItem);

        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            draggingItem.style.left = pageX - shiftX + 'px';
            draggingItem.style.top = pageY - shiftY + 'px';
        }

        elemBelow = document.elementFromPoint(event.clientX, event.clientY);

        let clickWithoutMove = true;
        function onMouseMove(event) {
            let newLocation = {
                x: limits.left,
                y: limits.top
            };
            if (event.pageX > limits.right) {
                newLocation.x = limits.right;
            }
            else if (event.pageX > limits.left) {
                newLocation.x = event.pageX;
            }
            if (event.pageY > limits.bottom) {
                newLocation.y = limits.bottom;
            }
            else if (event.pageY > limits.top) {
                newLocation.y = event.pageY;
            }

            clickWithoutMove = false
            moveAt(newLocation.x, newLocation.y);

            if (!event.path.includes(draggingItem)) {
                window.addEventListener('pointerup', moveOut);
            }

            draggingItem.hidden = true;
            elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            draggingItem.hidden = false;

            if (!elemBelow) return;

            // ОБРАБОТКА СОБЫТИЯ НАХОЖДЕНИЯ НАД БЛОКОМ И ВЫЛЕТА ИЗ НЕГО (ПО НЕОБХОДИМИОСТИ)

            // let currentDroppable = null;

            // let droppableBelow = elemBelow.closest('.droppable'); // БЕРЁМ НУЖНЫЙ БЛОК 

            // if (currentDroppable != droppableBelow) {
            //     if (currentDroppable) { 
            // ЛОГИКА ОБРАБОТКИ ПРОЦЕССА "ВЫЛЕТА" ИЗ DROPPABLE
            //         leaveDroppable(currentDroppable);
            //     }
            //     currentDroppable = droppableBelow;
            // ЛОГИКА ОБРАБОТКИ ПРОЦЕССА, КОГДА МЫ "ВЛЕТАЕМ" В ЭЛЕМЕНТ
            //     if (currentDroppable) {
            //         enterDroppable(currentDroppable);
            //     }
            // }
        }

        // КОГДА НАД ВЫБРАННЫМ БЛОКОМ
        function enterDroppable(currentDroppable) {
            // currentDroppable
        }
        // КОДА ВЫЛЕТЕЛИ ИЗ БЛОКА
        function leaveDroppable(currentDroppable) {
            // currentDroppable
        }
        document.addEventListener('pointermove', onMouseMove);


        // КОГДА ВО ВРЕМЯ ПЕРЕТАСКИВАНИЯ КУРСОР ВЫНЕСЛИ ЗА ПРЕДЕЛЫ ОКНА БРАУЗЕРА И ОТПУСТИЛИ ЗАХВАТ ЭЛЕМЕНТА
        function moveOut(e) {
            const elemUnderPount = document.elementFromPoint(e.clientX, e.clientY);
            if (elemUnderPount !== draggingItem) {
                changeStylesAndAppend(elemDraggingStartPlace, draggingItem);
            }
            window.removeEventListener('pointerup', moveOut);
            document.removeEventListener('pointermove', onMouseMove);
        }

        // КОГДА КУРСОР В ЗОНЕ ДЛЯ ПЕРЕТАСКИВАНИЙ И ПОЛЬЗОВАТЕЛЬ ОТПУСТИЛ ЗАХВАТ ЭЛЕМЕНТА
        draggingItem.onpointerup = function () {
            draggingItem.style.cursor = 'grab';
            startAction = true;
            checkButton_classList_changer();
            if (clickWithoutMove) {
                changeStylesAndAppend(elemDraggingStartPlace, draggingItem);
            }
            document.removeEventListener('pointermove', onMouseMove);

            // ЛОГИКА ОБРАБОТКИ ПОПАДАНИЯ НА НУЖНЫЙ БЛОК И НАОБОРОТ
            if (elemBelow.classList.contains('letterCard_drop')) {
                draggingItem.classList.remove('letterCard_drag')
                draggingItem.classList.add('letterCard_drag_active')
                changeStylesAndAppend(elemBelow, draggingItem);
            }
            else {
                changeStylesAndAppend(elemDraggingStartPlace, draggingItem);
            }
        };


    };


    function checkButton_classList_changer() {

        if (check_your.classList.contains('check_your_active') && !startAction) {
            check_your.classList.remove('check_your_active');
            check_your.removeEventListener('click', checkPuzzle);
        }
        else if (!check_your.classList.contains('check_your_active') && startAction) {
            check_your.removeEventListener('click', checkPuzzle);
            check_your.classList.add('check_your_active');
            check_your.addEventListener('click', checkPuzzle);
        }
    }

    function resetPuzzle() {
        startAction = false;
        checkButton_classList_changer();
        feedBackChanger('reset');

        letterCard_drop.forEach(elem => {
            if (elem.firstChild) {
                elem.firstChild.classList.remove('letterCard_drag_active')
                elem.firstChild.classList.add('letterCard_drag')
                changeStylesAndAppend(alphabetDragPlace, elem.firstChild)
            }
        })
    }

    function checkPuzzle() {
        let winCount = 0;
        letterCard_drop.forEach(elem => {
            if (!!elem.firstChild?.attributes.getNamedItem("drag-data").value && elem.attributes.getNamedItem("drop-data").value === elem.firstChild.attributes.getNamedItem("drag-data").value) {
                winCount++;
            }
        })
        if (winCount === alphabetDraggable.length) {
            feedBackChanger('win');
        }
        else {
            feedBackChanger('lose');
        }
    }

    function feedBackChanger(state) {
        if (startAction && state === 'win' || state === 'lose') {
            result.classList.add(`result_${state}`);
        }
        else {
            result.classList.remove(`result_win`);
            result.classList.remove(`result_lose`);
        }

    }

})()