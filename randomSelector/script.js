// script.js
$(document).ready(function() {
    const canvas = $('#wheelCanvas')[0];
    const ctx = canvas.getContext('2d');
    let options = ["Option 1", "Option 2", "Option 3", "Option 4"]; // Default options
    let startAngle = 0;
    let arc = Math.PI / (options.length / 2);
    let spinTimeout = null;
	let colors = getRandomColor();

    function drawWheel() {
		arc = Math.PI / (options.length / 2);
        const outsideRadius = 250;
        const textRadius = 200;
        const insideRadius = 50;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.shadowColor = "black";
		ctx.shadowBlur = 18;
        ctx.beginPath()
        ctx.arc(300, 300, outsideRadius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();

        ctx.shadowBlur = 8;
        ctx.shadowColor = "lightblue";
        ctx.save()
		const baseFontSize = 30; // Base font size
		const dynamicFontSize = Math.max(10, baseFontSize - options.length); // Decrease font size as options increase
		
		ctx.font = `${dynamicFontSize}px Arial`;

        for (let i = 0; i < options.length; i++) {
            const angle = startAngle + i * arc;
            ctx.fillStyle =  colors[i] //i % 2 === 0 ? "#FFCC00" : "#FF9900";
            ctx.beginPath();
            ctx.arc(300, 300, outsideRadius, angle, angle + arc, false);
            ctx.arc(300, 300, insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();
            ctx.save();
            ctx.fillStyle = "black";
            ctx.translate(300 + Math.cos(angle + arc / 2) * textRadius,
                          300 + Math.sin(angle + arc / 2) * textRadius);
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            ctx.fillText(options[i], -ctx.measureText(options[i]).width / 2, 0);
            ctx.restore();
        }
        drawPointer();
    }

    // Function to draw the pointer
    function drawPointer() {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.moveTo(300 - 10, 10); // Start point
        ctx.lineTo(300 + 10, 10); // Bottom point
        ctx.lineTo(300, 40);      // Top point (triangle)
        ctx.closePath();
        ctx.fill();
    }

    function rotateWheel() {
        const spinAngleStart = Math.random() * 5 + 10;
        let spinTime = 1;
        const spinTimeTotal = Math.random() * 300 + 400;

        function rotate() {
            spinTime += 20;
            if (spinTime >= spinTimeTotal) {
                stopRotateWheel();

                return;
            }
            const spinAngle = spinAngleStart - easeOut(spinTime, -10, spinAngleStart, spinTimeTotal);
            startAngle += (spinAngle * Math.PI / 180);
            drawWheel();
            spinTimeout = setTimeout(rotate, 30);
        }

        rotate();
    }

    function stopRotateWheel() {
        clearTimeout(spinTimeout);
        const degrees = startAngle * 180 / Math.PI + 90;
        const arcd = arc * 180 / Math.PI;
        const index = Math.floor((360 - degrees % 360) / arcd);
        alert("You selected: " + options[index]);
		options.splice(index,1);
		colors.splice(index,1);
		drawWheel();
    }

    function easeOut(t, b, c, d) {
        return c * (t = t / d - 1) * t * t + b;
    }

    $('#spinButton').click(function() {
        rotateWheel();
    });

    $('#updateWheel').click(function() {
        const newOptions = $('#optionsList').val().split(',').map(opt => opt.trim());
        if (newOptions.length > 1) {
            options = newOptions;
            arc = Math.PI / (options.length / 2);
            drawWheel();
        }
    });

    drawWheel();
});

function getRandomColor() {
	let colorsList = []
	for(i=1;i<100;i++){
		const r = Math.floor(Math.random() * 256); // Red component (0-255)
		const g = Math.floor(Math.random() * 256); // Green component (0-255)
		const b = Math.floor(Math.random() * 256); // Blue component (0-255)
		colorsList.push(`rgb(${r}, ${g}, ${b})`); // Return the color in RGB format
	}
	return colorsList;
}