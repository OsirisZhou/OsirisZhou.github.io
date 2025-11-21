
import React, { useRef, useEffect } from 'react';

const NebulaEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const parent = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    // Configuration: Light Sky Blue Theme
    // Base: Sky-50, Clouds: Sky-100, Sky-200, Blue-100
    const COLORS = ['#f0f9ff', '#e0f2fe', '#bae6fd', '#dbeafe'];
    
    // Layer 2: Particles Configuration
    const PARTICLE_COUNT_MAJOR = 15;
    const PARTICLE_COUNT_DUST = 200;
    
    // Interaction Config
    const REPEL_RADIUS = 150;
    
    class Particle {
        x: number; 
        y: number; 
        size: number; 
        vx: number; 
        vy: number;
        brightness: number; 
        blinkSpeed: number;
        isMajor: boolean;

        constructor(w: number, h: number, major: boolean) {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.isMajor = major;
            
            if (major) {
                this.size = Math.random() * 2 + 1; // 1px - 3px
            } else {
                this.size = Math.random() * 1.5 + 0.5; // 0.5px - 2px
            }
            
            this.brightness = Math.random();
            this.blinkSpeed = (Math.random() * 0.02) + 0.005; // Shimmer speed
            
            // Internal Flow Speed (Slow drift)
            this.vx = (Math.random() - 0.5) * 0.2;
            this.vy = (Math.random() - 0.5) * 0.2;
        }
        
        update(mx: number, my: number) {
            this.x += this.vx;
            this.y += this.vy;
            
            // Boundary wrap
            if (this.x < 0) this.x = width;
            else if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            else if (this.y > height) this.y = 0;

            // Interaction: Repel Particles
            if (mx > -100 && my > -100) {
                const dx = mx - this.x;
                const dy = my - this.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < REPEL_RADIUS) {
                    const angle = Math.atan2(dy, dx);
                    const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
                    const push = force * 2.0; // Repel strength
                    
                    this.x -= Math.cos(angle) * push;
                    this.y -= Math.sin(angle) * push;
                }
            }

            // Shimmer Effect
            this.brightness += this.blinkSpeed;
            if (this.brightness > 1 || this.brightness < 0.3) this.blinkSpeed *= -1;
        }

        draw(ctx: CanvasRenderingContext2D) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            
            // Particle Color: Sky Blue / Blue-400 to make them visible on light bg
            // rgba(56, 189, 248, alpha) -> Sky-400
            ctx.fillStyle = `rgba(56, 189, 248, ${Math.abs(this.brightness)})`;
            
            if (this.isMajor) {
                ctx.shadowBlur = 4;
                ctx.shadowColor = 'rgba(14, 165, 233, 0.5)'; // Sky-500 glow
            } else {
                ctx.shadowBlur = 0;
            }
            
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    let particles: Particle[] = [];

    // Nebulae Clouds
    const clouds = [
        { x: 0, y: 0, r: 0, color: COLORS[1], vx: 0.1, vy: 0.05 },
        { x: 0, y: 0, r: 0, color: COLORS[2], vx: -0.08, vy: 0.08 },
        { x: 0, y: 0, r: 0, color: COLORS[3], vx: 0.05, vy: -0.1 },
    ];

    // Layer 3: Shooting Star
    let shootingStar = { x: 0, y: 0, vx: 0, vy: 0, life: 0, active: false };
    let lastStarTime = 0;

    const init = () => {
        if (parent) {
            width = canvas.width = parent.clientWidth;
            height = canvas.height = parent.clientHeight;
        }
        
        particles = [];
        for(let i=0; i<PARTICLE_COUNT_MAJOR; i++) particles.push(new Particle(width, height, true));
        for(let i=0; i<PARTICLE_COUNT_DUST; i++) particles.push(new Particle(width, height, false));
        
        // Init Clouds relative to size
        clouds[0].x = width * 0.2; clouds[0].y = height * 0.3; clouds[0].r = Math.max(width, height) * 0.7;
        clouds[1].x = width * 0.8; clouds[1].y = height * 0.7; clouds[1].r = Math.max(width, height) * 0.8;
        clouds[2].x = width * 0.5; clouds[2].y = height * 0.5; clouds[2].r = Math.max(width, height) * 0.6;
    };

    window.addEventListener('resize', init);
    
    // Mouse Handling attached to parent for better interaction area
    const onMouseMove = (e: MouseEvent) => {
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        mouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };
    const onMouseLeave = () => {
        mouseRef.current = { x: -9999, y: -9999 };
    };
    
    if (parent) {
        parent.addEventListener('mousemove', onMouseMove);
        parent.addEventListener('mouseleave', onMouseLeave);
        init();
    }

    const animate = (time: number) => {
        // Base Color (Sky-50)
        ctx.fillStyle = COLORS[0];
        ctx.fillRect(0, 0, width, height);

        // 1. Nebula (Procedural Swirl simulation)
        // Use 'multiply' or 'source-over' with low opacity for light mode blending
        // 'multiply' on white background makes things darker (colors)
        ctx.globalCompositeOperation = 'multiply'; // Blends blue tones onto white
        
        clouds.forEach(c => {
            c.x += c.vx; c.y += c.vy;
            // Bounce
            if (c.x < -width*0.2 || c.x > width*1.2) c.vx *= -1;
            if (c.y < -height*0.2 || c.y > height*1.2) c.vy *= -1;
            
            const g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
            // Since we are multiplying, we want white (no change) to color
            // But radial gradient goes Inner -> Outer
            g.addColorStop(0, c.color);
            g.addColorStop(1, '#ffffff'); // Fade to white (no change in multiply)
            
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.r, 0, Math.PI*2);
            ctx.fill();
        });
        ctx.globalCompositeOperation = 'source-over'; // Reset

        // 2. Particles
        particles.forEach(p => {
            p.update(mouseRef.current.x, mouseRef.current.y);
            p.draw(ctx);
        });

        // 3. Shooting Star (Accents)
        if (time - lastStarTime > 8000) { // 1 per 8 seconds
            shootingStar.active = true;
            shootingStar.x = Math.random() * width * 0.8 + width * 0.1;
            shootingStar.y = Math.random() * height * 0.3; 
            shootingStar.vx = -3 - Math.random() * 3; 
            shootingStar.vy = 2 + Math.random() * 2; 
            shootingStar.life = 1.0;
            lastStarTime = time;
        }
        
        if (shootingStar.active) {
            shootingStar.x += shootingStar.vx;
            shootingStar.y += shootingStar.vy;
            shootingStar.life -= 0.02;
            
            if (shootingStar.life <= 0) shootingStar.active = false;

            // Draw Tail
            const tailLength = 20;
            const tailX = shootingStar.x - shootingStar.vx * tailLength;
            const tailY = shootingStar.y - shootingStar.vy * tailLength;
            
            const g = ctx.createLinearGradient(shootingStar.x, shootingStar.y, tailX, tailY);
            // Blue-ish tail for light mode
            g.addColorStop(0, `rgba(14, 165, 233, ${shootingStar.life})`); 
            g.addColorStop(1, 'transparent');
            
            ctx.beginPath();
            ctx.moveTo(shootingStar.x, shootingStar.y);
            ctx.lineTo(tailX, tailY);
            ctx.strokeStyle = g;
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.stroke();
        }

        requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
        window.removeEventListener('resize', init);
        if (parent) {
            parent.removeEventListener('mousemove', onMouseMove);
            parent.removeEventListener('mouseleave', onMouseLeave);
        }
        cancelAnimationFrame(animId);
    };

  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in opacity-100" />;
};

export default NebulaEffect;
