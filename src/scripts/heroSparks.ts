type SparkType = 'glow' | 'sharp';

type SparkParticle = {
  angle: number;
  speed: number;
  radius: number;
  offset: number;
  type: SparkType;
  layerIndex: number;
};

type LayerConfig = {
  radius: number;
  speed: number;
};

type SparksConfig = {
  particleCount: number;
  layers: LayerConfig[];
  glow: {
    size: number;
    opacity: number;
    blur: number;
  };
  sharp: {
    size: number;
    opacity: number;
    strokeWidth: number;
  };
  drag: {
    followStrength: number;
    damping: number;
  };
  drift: {
    jitter: number;
  };
};

const defaultConfig: SparksConfig = {
  particleCount: 140,
  layers: [
    { radius: 18, speed: 0.018 },
    { radius: 36, speed: -0.014 },
    { radius: 58, speed: 0.011 },
    { radius: 82, speed: -0.008 },
  ],
  glow: {
    size: 6,
    opacity: 0.42,
    blur: 14,
  },
  sharp: {
    size: 3.4,
    opacity: 0.86,
    strokeWidth: 1.25,
  },
  drag: {
    followStrength: 0.08,
    damping: 0.84,
  },
  drift: {
    jitter: 0.6,
  },
};

const sparkPalette = {
  glow: ['rgba(255, 232, 196, 0.9)', 'rgba(255, 210, 160, 0.8)'],
  sharp: ['rgba(255, 250, 240, 0.95)', 'rgba(255, 205, 140, 0.9)'],
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function initHeroSparks(root: HTMLElement, config = defaultConfig) {
  if (!window.matchMedia('(pointer: fine)').matches) {
    return;
  }

  const canvas = root.querySelector<HTMLCanvasElement>('[data-hero-sparks-canvas]');

  if (!canvas) {
    return;
  }

  const context = canvas.getContext('2d');

  if (!context) {
    return;
  }

  const state = {
    width: 0,
    height: 0,
    ratio: Math.min(window.devicePixelRatio || 1, 2),
    target: { x: 0, y: 0 },
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    particles: [] as SparkParticle[],
    animationId: 0,
  };

  const resize = () => {
    const rect = root.getBoundingClientRect();

    state.width = rect.width;
    state.height = rect.height;

    canvas.width = Math.max(1, Math.floor(rect.width * state.ratio));
    canvas.height = Math.max(1, Math.floor(rect.height * state.ratio));
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    context.setTransform(state.ratio, 0, 0, state.ratio, 0, 0);

    if (state.position.x === 0 && state.position.y === 0) {
      state.position.x = rect.width * 0.5;
      state.position.y = rect.height * 0.5;
      state.target.x = state.position.x;
      state.target.y = state.position.y;
    }
  };

  const layers = config.layers.length;
  const particlesPerLayer = Math.max(1, Math.floor(config.particleCount / layers));
  const remainder = config.particleCount - particlesPerLayer * layers;

  state.particles = config.layers.flatMap((layer, layerIndex) => {
    const count = particlesPerLayer + (layerIndex === 0 ? remainder : 0);

    return Array.from({ length: count }, () => {
      const type: SparkType = Math.random() > 0.45 ? 'glow' : 'sharp';
      const angle = Math.random() * Math.PI * 2;
      const speed = layer.speed * (0.6 + Math.random() * 0.8);
      const offset = Math.random() * 12 - 6;

      return {
        angle,
        speed,
        radius: layer.radius,
        offset,
        type,
        layerIndex,
      };
    });
  });

  const update = () => {
    const { followStrength, damping } = config.drag;

    const deltaX = state.target.x - state.position.x;
    const deltaY = state.target.y - state.position.y;

    state.velocity.x += deltaX * followStrength;
    state.velocity.y += deltaY * followStrength;

    state.velocity.x *= damping;
    state.velocity.y *= damping;

    state.position.x += state.velocity.x;
    state.position.y += state.velocity.y;
  };

  const draw = () => {
    context.clearRect(0, 0, state.width, state.height);
    context.save();
    context.globalCompositeOperation = 'lighter';

    for (const particle of state.particles) {
      const layer = config.layers[particle.layerIndex];
      const angle = particle.angle;
      const jitter = (Math.random() - 0.5) * config.drift.jitter;
      const orbitRadius = layer.radius + particle.offset + jitter;

      const x = state.position.x + Math.cos(angle) * orbitRadius;
      const y = state.position.y + Math.sin(angle) * orbitRadius;

      if (particle.type === 'glow') {
        const palette = sparkPalette.glow;
        context.fillStyle = palette[particle.layerIndex % palette.length];
        context.globalAlpha = config.glow.opacity;
        context.shadowColor = context.fillStyle as string;
        context.shadowBlur = config.glow.blur;
        context.beginPath();
        context.arc(x, y, config.glow.size, 0, Math.PI * 2);
        context.fill();
      } else {
        const palette = sparkPalette.sharp;
        context.strokeStyle = palette[particle.layerIndex % palette.length];
        context.globalAlpha = config.sharp.opacity;
        context.lineWidth = config.sharp.strokeWidth;
        context.shadowBlur = 0;
        context.beginPath();
        context.arc(x, y, config.sharp.size, 0, Math.PI * 2);
        context.stroke();
      }

      particle.angle += particle.speed;
    }

    context.restore();
    context.globalAlpha = 1;
  };

  const animate = () => {
    update();
    draw();
    state.animationId = window.requestAnimationFrame(animate);
  };

  const handlePointer = (event: PointerEvent) => {
    const rect = root.getBoundingClientRect();
    const x = clamp(event.clientX - rect.left, 0, rect.width);
    const y = clamp(event.clientY - rect.top, 0, rect.height);

    state.target.x = x;
    state.target.y = y;
  };

  resize();
  animate();

  window.addEventListener('resize', resize);
  root.addEventListener('pointermove', handlePointer);

  return () => {
    window.removeEventListener('resize', resize);
    root.removeEventListener('pointermove', handlePointer);
    window.cancelAnimationFrame(state.animationId);
  };
}
