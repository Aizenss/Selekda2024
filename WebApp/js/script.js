document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('drawing-canvas');
    const ctx = canvas.getContext('2d');
    let tool = 'brush';
    let brushSize = 10;
    let brushShape = 'round';
    let brushOpacity = 1.0;
    let color = '#000000';
    let drawing = false;
    let x = 0;
    let y = 0;

    // Welcome Screen
    setTimeout(() => {
        document.getElementById('welcome-screen').classList.add('hidden');
        document.getElementById('new-file-window').classList.remove('hidden');
    }, 1000);

    // Handle new file creation
    document.getElementById('new-file-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const width = parseInt(document.getElementById('image-width').value, 10);
        const height = parseInt(document.getElementById('image-height').value, 10);
        canvas.width = width;
        canvas.height = height;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
        document.getElementById('new-file-window').classList.add('hidden');
        canvas.classList.remove('hidden');
    });

    // Tool selection
    document.querySelectorAll('.toolbar-left button').forEach(button => {
        button.addEventListener('click', () => {
            tool = button.id;
            document.querySelectorAll('.tool-properties').forEach(div => {
                div.classList.add('hidden');
            });
            document.getElementById(`${tool}-properties`).classList.remove('hidden');
        });
    });

    // Brush properties
    document.getElementById('brush-size').addEventListener('input', (e) => {
        brushSize = e.target.value;
    });
    document.getElementById('brush-shape').addEventListener('change', (e) => {
        brushShape = e.target.value;
    });
    document.getElementById('brush-opacity').addEventListener('change', (e) => {
        brushOpacity = e.target.value / 100;
    });

    // Color Picker
    document.getElementById('color-picker-input').addEventListener('input', (e) => {
        color = e.target.value;
    });

    // Canvas drawing
    canvas.addEventListener('mousedown', (e) => {
        drawing = true;
        x = e.offsetX;
        y = e.offsetY;
    });

    canvas.addEventListener('mouseup', () => {
        drawing = false;
    });

    canvas.addEventListener('mousemove', (e) => {
        if (drawing) {
            ctx.strokeStyle = color;
            ctx.lineWidth = brushSize;
            ctx.globalAlpha = brushOpacity;
            ctx.lineCap = brushShape;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            x = e.offsetX;
            y = e.offsetY;
        }
    });

    // Undo/Redo functionality
    let undoStack = [];
    let redoStack = [];

    document.getElementById('undo').addEventListener('click', () => {
        if (undoStack.length > 0) {
            redoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
            ctx.putImageData(undoStack.pop(), 0, 0);
        }
    });

    document.getElementById('redo').addEventListener('click', () => {
        if (redoStack.length > 0) {
            undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
            ctx.putImageData(redoStack.pop(), 0, 0);
        }
    });

    // Selection Tool (Placeholder)
    document.getElementById('selection-tool').addEventListener('click', () => {
        // Implement selection tool logic
    });

    // Import/Export functionality (Placeholder)
    document.getElementById('import').addEventListener('click', () => {
        // Implement import logic
    });

    document.getElementById('export').addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpeg');
        link.download = 'drawing.jpg';
        link.click();
    });
});
