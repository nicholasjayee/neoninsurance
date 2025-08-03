// THE FIX: The type is imported from the correct, modern package name.
import type { IOptions, RecursivePartial } from "@tsparticles/engine";

// THE FIX: This entire object has been translated to the modern v3 format.
export const particlesConfig: RecursivePartial<IOptions> = {
  // `fullScreen` is still valid, but we will control it in the component.
  // background: {
  //   color: "#ffffff",
  // },
  particles: {
    number: {
      value: 80,
      density: {
        enable: true, // Density is now automatic based on the canvas size
      },
    },
    color: {
      value: "#0052cc", // Your brand blue
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.5,
    },
    size: {
      value: { min: 1, max: 3 }, // `random: true` is now a min/max object
    },
    // 'line_linked' from v1 is now 'links' in v3
    links: {
      enable: true,
      distance: 150,
      color: "#0052cc", // Your brand blue
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      // 'out_mode' from v1 is now 'outModes'
      outModes: {
        default: "out",
      },
    },
  },
  interactivity: {
    // 'detect_on' from v1 is now 'detectsOn'
    detectsOn: "canvas",
    events: {
      // 'onhover' from v1 is now 'onHover'
      onHover: {
        enable: true,
        mode: "repulse",
      },
      // 'onclick' from v1 is now 'onClick'
      onClick: {
        enable: true,
        mode: "push",
      },
    },
    modes: {
      repulse: {
        distance: 100,
      },
      push: {
        // 'particles_nb' from v1 is now 'quantity'
        quantity: 4,
      },
    },
  },
  // 'retina_detect' from v1 is now 'detectRetina'
  detectRetina: true,
};
