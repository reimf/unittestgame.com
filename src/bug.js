export class Bug {
    size = 32;
    beetle = document.createElement('div');
    currentPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    targetPosition = { x: this.currentPosition.x, y: this.currentPosition.y };
    velocity = { x: 0, y: 0 };
    lastTime = 0;
    currentDirection = 0;
    pause = 0;
    constructor() {
        this.beetle.style.position = 'absolute';
        this.beetle.style.width = `${this.size}px`;
        this.beetle.style.height = `${this.size}px`;
        this.beetle.style.transition = 'transform 0s linear';
        this.beetle.style.willChange = 'transform';
        this.beetle.style.pointerEvents = 'auto';
        this.beetle.style.zIndex = '9999';
        this.beetle.style.cursor = 'pointer';
        this.beetle.style.visibility = 'hidden';
        this.beetle.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="#FF0000" fill="#FFFFFF" d="
            M  5  6 h +6 l +1 +1 v +8 l -1 +1 h -6 l -1 -1 v -8 l +1 -1 z 
            M  6  6 v -2 l +1 -1 h +2 l +1 +1 v +2 
          "/>
          <path stroke="#FF0000" fill="transparent" d="
            M  4 11 h -3 
            M 12 11 h +3 
            M  4 14 h -2 v +1 l -1 +1 
            M 12 14 h +2 v +1 l +1 +1 
            M  4  8 h -2 v -1 l -1 -1 
            M 12  8 h +2 v -1 l +1 -1 
            M  7  3 l -2 -2 
            M  9  3 l +2 -2
          "/>
          <path stroke="#FF0000" fill="transparent" d="
            M  6  8 v +2
            M  8  8 h +2 v +2 h -2 z 
            M  6 12 h +2 v +2 h -2 z 
            M 10 12 v +2 
          "/>
      </svg>`;
        this.beetle.addEventListener('click', () => this.beetle.style.display = 'none');
        const root = document.createElement('div');
        root.style.position = 'fixed';
        root.style.left = '0';
        root.style.top = '0';
        root.style.width = '100%';
        root.style.height = '100%';
        root.style.pointerEvents = 'none';
        root.setAttribute('aria-hidden', 'true');
        root.appendChild(this.beetle);
        document.body.appendChild(root);
    }
    start() {
        const bug = this;
        function randBetween(a, b) {
            return Math.round(a + Math.random() * (b - a));
        }
        function loop(currentTime) {
            if (!bug.lastTime)
                bug.lastTime = currentTime;
            let deltaTime = Math.min(currentTime - bug.lastTime, 50);
            bug.lastTime = currentTime;
            if (bug.pause > 0) {
                bug.pause -= deltaTime;
            }
            else {
                const deltaPosition = { x: bug.targetPosition.x - bug.currentPosition.x, y: bug.targetPosition.y - bug.currentPosition.y };
                const distance = Math.hypot(deltaPosition.x, deltaPosition.y);
                if (distance < 10) {
                    bug.targetPosition.x = randBetween(bug.size, window.innerWidth - bug.size);
                    bug.targetPosition.y = randBetween(bug.size, window.innerHeight - bug.size);
                    bug.pause = 1000;
                }
                else {
                    const speed = randBetween(1, 100);
                    bug.velocity.x = (deltaPosition.x / distance) * speed;
                    bug.velocity.y = (deltaPosition.y / distance) * speed;
                    bug.currentPosition.x += bug.velocity.x * (deltaTime / 1000);
                    bug.currentPosition.y += bug.velocity.y * (deltaTime / 1000);
                    const targetDirection = Math.atan2(bug.velocity.y, bug.velocity.x) * (180 / Math.PI) + 90;
                    const deltaDirection = Math.max(-5, Math.min(+5, ((targetDirection - bug.currentDirection + 540) % 360) - 180));
                    bug.currentDirection += deltaDirection;
                    bug.beetle.style.transform = `translate(${bug.currentPosition.x - bug.size / 2}px, ${bug.currentPosition.y - bug.size / 2}px) rotate(${bug.currentDirection}deg)`;
                    bug.beetle.style.visibility = 'visible';
                }
            }
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
    }
}
