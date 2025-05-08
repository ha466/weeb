// Matrix Rain Effect
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const matrixContainer = document.getElementById('matrix-canvas');
    
    matrixContainer.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array to store the y position of each column
    const drops = [];
    
    // Initialize all columns to start at random y positions
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
    
    // Characters to display
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
    
    // Draw the matrix rain
    function draw() {
        // Set semi-transparent black background to create trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set color and font
        ctx.fillStyle = '#0f0';
        ctx.font = fontSize + 'px monospace';
        
        // Loop through each column
        for (let i = 0; i < drops.length; i++) {
            // Choose a random character
            const text = chars[Math.floor(Math.random() * chars.length)];
            
            // Calculate x position based on column index
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            // Randomly change character color for visual effect
            if (Math.random() > 0.975) {
                ctx.fillStyle = '#0f8';
            } else if (Math.random() > 0.95) {
                ctx.fillStyle = '#ff006e';
            } else {
                ctx.fillStyle = '#0f0';
            }
            
            // Draw the character
            ctx.fillText(text, x, y);
            
            // Reset to the top when reaching bottom of screen or randomly
            if (y > canvas.height || Math.random() > 0.99) {
                drops[i] = 0;
            }
            
            // Move the drop down
            drops[i]++;
        }
    }
    
    // Update canvas dimensions on window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const columns = Math.floor(canvas.width / fontSize);
        
        // Reset drops array for new column count
        drops.length = 0;
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }
    });
    
    // Run the animation
    setInterval(draw, 35);

    // Parallax effect for background elements
    document.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        document.querySelectorAll('.anime-card').forEach(card => {
            card.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
        });
    });

    // Glitch effect for header
    const glitchHeader = () => {
        const name = document.querySelector('.name');
        const originalText = name.textContent;
        
        const glitchText = () => {
            const chars = '!<>-_\\/[]{}—=+*^?#________';
            let glitched = '';
            
            for (let i = 0; i < originalText.length; i++) {
                if (Math.random() > 0.7) {
                    glitched += chars[Math.floor(Math.random() * chars.length)];
                } else {
                    glitched += originalText[i];
                }
            }
            
            name.textContent = glitched;
        };
        
        const resetText = () => {
            name.textContent = originalText;
        };
        
        // Glitch sequence
        let glitchCount = 0;
        const maxGlitches = Math.floor(Math.random() * 5) + 3;
        
        const glitchSequence = setInterval(() => {
            if (glitchCount % 2 === 0) {
                glitchText();
            } else {
                resetText();
            }
            
            glitchCount++;
            
            if (glitchCount > maxGlitches * 2) {
                clearInterval(glitchSequence);
                resetText();
                
                // Schedule next glitch
                setTimeout(glitchHeader, Math.random() * 10000 + 5000);
            }
        }, 100);
    };
    
    // Start glitch effect after a delay
    setTimeout(glitchHeader, 3000);
});