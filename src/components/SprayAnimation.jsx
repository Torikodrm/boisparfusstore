"use client";

import { useEffect, useRef, useState } from "react";

export function SprayAnimation({ onComplete, duration = 3500 }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let startTime = 0;
    let particles = [];
    let logoPhase = false;
    let logoProgress = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    class SprayParticle {
      constructor(x, y, angle, speed, size, hue, isDroplet = false) {
        this.x = x;
        this.y = y;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.size = size;
        this.initialSize = size;
        this.life = 1;
        this.decay = 0.008 + Math.random() * 0.012;
        this.hue = hue;
        this.isDroplet = isDroplet;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = 0.05 + Math.random() * 0.1;
      }

      update(gravity, wind) {
        if (this.isDroplet) {
          this.vy += gravity;
          this.vx += wind;
          this.life -= this.decay * 0.5;
        } else {
          this.vy += gravity * 0.3;
          this.vx += wind * 0.5;
          this.life -= this.decay;
        }
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        this.wobble += this.wobbleSpeed;
        this.size = this.initialSize * this.life;
      }

      draw(ctx) {
        if (this.life <= 0) return;
        
        ctx.save();
        ctx.globalAlpha = this.life * 0.9;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
        const baseHue = this.hue;
        gradient.addColorStop(0, `hsla(${baseHue}, 60%, 75%, ${this.life * 0.6})`);
        gradient.addColorStop(0.4, `hsla(${baseHue + 10}, 50%, 65%, ${this.life * 0.4})`);
        gradient.addColorStop(1, `hsla(${baseHue + 20}, 40%, 40%, 0)`);

        ctx.fillStyle = gradient;
        
        if (this.isDroplet) {
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size, this.size * 1.3, 0, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.beginPath();
          ctx.ellipse(0, -this.size * 0.3, this.size * 0.3, this.size * 0.2, 0, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${baseHue}, 30%, 90%, ${this.life * 0.3})`;
          ctx.fill();
        } else {
          const wobbleX = Math.sin(this.wobble) * this.size * 0.3;
          ctx.beginPath();
          ctx.ellipse(wobbleX, 0, this.size, this.size * 0.7, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    class MistParticle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100;
        this.size = 1 + Math.random() * 3;
        this.speed = 0.2 + Math.random() * 0.5;
        this.opacity = Math.random() * 0.15;
        this.hue = 42 + Math.random() * 15;
        this.drift = (Math.random() - 0.5) * 0.3;
      }
      update() {
        this.y -= this.speed;
        this.x += this.drift;
        this.opacity *= 0.998;
        if (this.y < -50 || this.opacity < 0.01) this.reset();
      }
      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 40%, 70%, ${this.opacity})`;
        ctx.fill();
      }
    }

    const mistParticles = Array.from({ length: 80 }, () => new MistParticle());

    const sprayColors = [
      { hue: 42, weight: 0.4 },
      { hue: 38, weight: 0.25 },
      { hue: 48, weight: 0.2 },
      { hue: 32, weight: 0.15 },
    ];

    const getRandomSprayColor = () => {
      const rand = Math.random();
      let sum = 0;
      for (const c of sprayColors) {
        sum += c.weight;
        if (rand <= sum) return c.hue;
      }
      return 42;
    };

    const centerX = width / 2;
    const centerY = height / 2 + 50;
    const nozzleX = centerX;
    const nozzleY = centerY + 120;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      ctx.clearRect(0, 0, width, height);

      mistParticles.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      const sprayPhase = progress < 0.65;
      const dispersePhase = progress >= 0.65 && progress < 0.85;
      const logoPhaseStart = progress >= 0.85;

      if (sprayPhase) {
        const sprayIntensity = Math.sin(progress * Math.PI / 0.65 * 0.5) * (1 - progress * 0.3);
        const particleCount = Math.floor(8 + sprayIntensity * 12);
        
        for (let i = 0; i < particleCount; i++) {
          const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.35;
          const speed = 8 + Math.random() * 10 + sprayIntensity * 6;
          const size = 1.5 + Math.random() * 2.5;
          const hue = getRandomSprayColor();
          const isDroplet = Math.random() < 0.15;
          
          particles.push(new SprayParticle(
            nozzleX + (Math.random() - 0.5) * 4,
            nozzleY,
            angle,
            speed,
            size,
            hue,
            isDroplet
          ));
        }

        ctx.save();
        ctx.translate(nozzleX, nozzleY);
        ctx.rotate(-Math.PI / 2);
        
        const bottleGradient = ctx.createLinearGradient(-16, -140, 16, 0);
        bottleGradient.addColorStop(0, "rgba(20,17,18,0.95)");
        bottleGradient.addColorStop(0.3, "rgba(28,24,25,0.9)");
        bottleGradient.addColorStop(0.7, "rgba(165,141,115,0.3)");
        bottleGradient.addColorStop(1, "rgba(201,184,168,0.5)");
        
        ctx.fillStyle = bottleGradient;
        ctx.beginPath();
        ctx.moveTo(-16, 0);
        ctx.bezierCurveTo(-16, -40, -20, -80, -14, -120);
        ctx.lineTo(14, -120);
        ctx.bezierCurveTo(20, -80, 16, -40, 16, 0);
        ctx.closePath();
        ctx.fill();
        
        ctx.strokeStyle = "rgba(165,141,115,0.4)";
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.fillStyle = "rgba(165,141,115,0.6)";
        ctx.beginPath();
        ctx.ellipse(0, -120, 14, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = "rgba(165,141,115,0.8)";
        ctx.beginPath();
        ctx.roundRect(-6, -138, 12, 18, 3);
        ctx.fill();
        
        ctx.restore();

        const nozzleGlow = ctx.createRadialGradient(nozzleX, nozzleY, 0, nozzleX, nozzleY, 30);
        nozzleGlow.addColorStop(0, "rgba(165,141,115,0.3)");
        nozzleGlow.addColorStop(1, "rgba(165,141,115,0)");
        ctx.fillStyle = nozzleGlow;
        ctx.beginPath();
        ctx.arc(nozzleX, nozzleY, 30, 0, Math.PI * 2);
        ctx.fill();
      }

      if (dispersePhase) {
        const disperseProgress = (progress - 0.65) / 0.2;
        ctx.save();
        ctx.globalAlpha = 1 - disperseProgress;
        ctx.translate(nozzleX, nozzleY);
        ctx.rotate(-Math.PI / 2);
        
        const bottleGradient = ctx.createLinearGradient(-16, -140, 16, 0);
        bottleGradient.addColorStop(0, "rgba(20,17,18,0.95)");
        bottleGradient.addColorStop(0.3, "rgba(28,24,25,0.9)");
        bottleGradient.addColorStop(0.7, "rgba(165,141,115,0.3)");
        bottleGradient.addColorStop(1, "rgba(201,184,168,0.5)");
        
        ctx.fillStyle = bottleGradient;
        ctx.beginPath();
        ctx.moveTo(-16, 0);
        ctx.bezierCurveTo(-16, -40, -20, -80, -14, -120);
        ctx.lineTo(14, -120);
        ctx.bezierCurveTo(20, -80, 16, -40, 16, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => {
        p.update(0.15, Math.sin(elapsed * 0.001) * 0.05);
        p.draw(ctx);
      });

      if (logoPhaseStart) {
        logoProgress = Math.min((progress - 0.85) / 0.15, 1);
        const easedLogo = 1 - Math.pow(1 - logoProgress, 3);
        
        const logoY = centerY - 20;
        const logoScale = 0.8 + easedLogo * 0.2;
        const logoAlpha = easedLogo;
        
        ctx.save();
        ctx.translate(centerX, logoY);
        ctx.scale(logoScale, logoScale);
        ctx.globalAlpha = logoAlpha;

        const text = "BOIS PARFUMS";
        const fontSize = Math.min(width / 18, 72);
        ctx.font = `400 ${fontSize}px "Georgia", "Times New Roman", serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        const metrics = ctx.measureText(text);
        const textWidth = metrics.width;
        
        const shimmerProgress = (elapsed * 0.0003) % 1;
        
        for (let i = 0; i < 3; i++) {
          const offset = (i - 1) * 2;
          const gradient = ctx.createLinearGradient(-textWidth/2, -fontSize/2, textWidth/2, fontSize/2);
          const phase = (shimmerProgress + i * 0.3) % 1;
          gradient.addColorStop(0, `rgba(247,243,240,${0.15 - i * 0.05})`);
          gradient.addColorStop(0.5 - phase * 0.5, `rgba(201,184,168,${0.4 - i * 0.1})`);
          gradient.addColorStop(0.5 + phase * 0.5, `rgba(165,141,115,${0.6 - i * 0.15})`);
          gradient.addColorStop(1, `rgba(247,243,240,${0.15 - i * 0.05})`);
          
          ctx.fillStyle = gradient;
          ctx.fillText(text, offset, offset);
        }
        
        const mainGradient = ctx.createLinearGradient(-textWidth/2, -fontSize/2, textWidth/2, fontSize/2);
        mainGradient.addColorStop(0, "#F7F3F0");
        mainGradient.addColorStop(0.35, "#F7F3F0");
        mainGradient.addColorStop(0.5, "#C9B8A8");
        mainGradient.addColorStop(0.65, "#A58D73");
        mainGradient.addColorStop(1, "#8B745E");
        ctx.fillStyle = mainGradient;
        ctx.fillText(text, 0, 0);

        const tagline = "perfumería de nicho";
        ctx.font = `300 ${fontSize * 0.16}px "Geist", system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.fillStyle = `rgba(201,184,168,${logoAlpha * 0.8})`;
        ctx.fillText(tagline, 0, fontSize * 0.7);

        ctx.restore();

        if (logoProgress >= 1 && onComplete) {
          setTimeout(() => {
            setIsPlaying(false);
            onComplete();
          }, 400);
        }
      }

      if (isPlaying) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [onComplete, duration, isPlaying]);

  if (!isPlaying) return null;

  return (
    <div className="fixed inset-0 z-50 bg-bg-primary pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

export function SprayEntrance({ children }) {
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      <SprayAnimation onComplete={() => setShowContent(true)} />
      <div className={showContent ? "animate-in" : "opacity-0 pointer-events-none"} style={{ transition: "opacity 0.6s ease" }}>
        {children}
      </div>
    </>
  );
}