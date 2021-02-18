function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
    }
    
    function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
    }
    
    function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1
    
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
    }
    const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d')
    
    canvas.width = innerWidth
    canvas.height = innerHeight
    
    const mouse = {
        x: innerWidth / 2,
        y: innerHeight / 2
    }
    
    const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']
    
    // Event Listeners
    addEventListener('mousemove', (event) => {
        mouse.x = event.clientX
        mouse.y = event.clientY
    })
    
    addEventListener('resize', () => {
        canvas.width = innerWidth
        canvas.height = innerHeight
    
        init()
    })
    const gravity = 0.01,
        friction = 0.99;
    
    // Objects
    class Particle {
        constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
        }
    
        draw() {
        c.save()
        c.globalAlpha = this.alpha;
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
        c.restore()
        }
    
        update() {
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.velocity.y += gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -=0.005;
        this.draw()
        }
    }
    
    // Implementation
    let particles;
    function init() {
        particles = []
    }
    
    // Animation Loop
    function animate() {
        requestAnimationFrame(animate)
        c.font = '30px Calibri';
        c.fillStyle = 'white';
        c.fillText('Click / Touch to see the effects', canvas.width / 2 - 60, 60);
        c.fillStyle = `rgba(0, 0, 0, 0.05)`
        c.fillRect(0, 0, canvas.width, canvas.height)
    
        particles.forEach((elem, index) => {
            if(elem.alpha > 0.01){
         elem.update()
            } else {
                particles.splice(index, 1);
            }
        })
    }
    
    init()
    animate()
    const power = 20;
    const audio = new Audio('fire.mp3');
    addEventListener('click', (event)=>{
        mouse.x = event.clientX;
        mouse.y = event.clientY;
        const particleCount = 500;
        const angleIncrement = Math.PI * 2 / particleCount;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(mouse.x, mouse.y, 3, `hsl(${Math.random() * 360}, 50%, 50%)`, {
                x: Math.cos(angleIncrement * i) * Math.random() * power,
                y: Math.sin(angleIncrement * i) * Math.random() * power
            }));
            }
            audio.play();
            setTimeout(() => {
                audio.pause();
                
            }, 2000);
    })
    