// --------------------- sort -------------------------------------------------------------
const container = document.getElementById('figures');

for (var i = 5; i >= 0; i--) {
    container.appendChild(container.children[Math.random() * i | 0]);
}

// ------------------------ drag and drop -------------------------------------------------
const figure = interact('.figure');

function rightAnswered() {
    this.className = 'success';
};

figure.draggable({
    autoscroll: true,
    listeners: {
        move: dragMoveListener
    }
});

function dragMoveListener (event) {
    const target = event.target
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
  
    target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)'
  
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}

interact('.text').dropzone({
    accept: '.figure',
    ondropactivate: function (event) {
        event.target.classList.add('drop-active')
    },
    ondragenter: function (event) {
        const dropzoneElement = event.target;
        dropzoneElement.classList.add('drop-target');
    },
    ondragleave: function (event) {
        event.target.classList.remove('drop-target');0
    },
    ondrop: function (event) {
        const dropzoneElement = event.target;
        const draggableElement = event.relatedTarget;
        dropzoneElement.classList.add('drop-target');

        const draggableClassNames = draggableElement.className.split(/\s+/);
        const dropzoneClassNames = dropzoneElement.className.split(/\s+/);

        if (draggableClassNames[2] === dropzoneClassNames[2]) {
            dropzoneElement.classList.add('correct');
        }
    },
    ondropdeactivate: function (event) {
      event.target.classList.remove('drop-active')
      event.target.classList.remove('drop-target')
    }
});
