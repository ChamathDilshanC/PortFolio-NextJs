'use client';

import Particles from '@/components/particles';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';

export function ParticlesBackground() {
  const { resolvedTheme } = useTheme();

  const colors = useMemo(() => {
    if (resolvedTheme === 'dark') {
      return ['#00b3ff', '#4ccfff', '#a0e5ff'];
    }

    return ['#070edf', '#070edf', '#070edf'];
  }, [resolvedTheme]);

  return (
    <Particles
      className="fixed inset-0 -z-10 pointer-events-none"
      particleColors={colors}
      particleCount={200}
      particleSpread={10}
      speed={0.1}
      particleBaseSize={100}
      moveParticlesOnHover={false}
      alphaParticles={false}
      disableRotation={false}
    />
  );
}

export default ParticlesBackground;
