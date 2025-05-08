import { motion } from 'framer-motion';

/**
 * Creates a versatile animation variant.
 *
 * @param {object} [options={}] - Configuration options for the animation.
 * @param {string} [options.type='fade'] - The type of animation ('fade', 'slide', 'scale').
 * @param {number} [options.duration=0.3] - The duration of the animation in seconds.
 * @param {number} [options.delay=0] - The delay before the animation starts in seconds.
 * @param {string} [options.ease='easeInOut'] - The easing function to use.
 * @param {number} [options.distance=20] - The distance for slide animations (in pixels).
  * @param {number} [options.scale=1] - The scale for scale animations.
 * @returns {object} - A Framer Motion variant object.
 */
export const createAnimation = (options = {}) => {
  const {
    type = 'fade',
    duration = 0.3,
    delay = 0,
    ease = 'easeInOut',
    distance = 20,
    scale = 1,
  } = options;

  const baseVariants = {
    transition: { duration, delay, ease },
  };

  let initial = {};
  let animate = { ...baseVariants.transition };
  let exit = { ...baseVariants.transition };

    switch (type) {
    case 'fade':
      initial = { opacity: 0 };
      animate = { ...animate, opacity: 1 };
      exit = { opacity: 0 };
      break;
    case 'slide':
      initial = { opacity: 0, y: distance };
      animate = { ...animate, opacity: 1, y: 0 };
      exit = { opacity: 0, y: -distance };
          break;
    case 'slide-x':
      initial = { opacity: 0, x: distance };
      animate = { ...animate, opacity: 1, x: 0 };
      exit = { opacity: 0, x: -distance };
      break;
    case 'scale':
          initial = { opacity: 0, scale };
          animate = { ...animate, opacity: 1, scale: 1 };
          exit = { opacity: 0, scale };
          break;
    default: // fade
      initial = { opacity: 0 };
      animate = { ...animate, opacity: 1 };
      exit = { opacity: 0 };
  }

  return {
    initial,
    animate,
    exit,
  };
};
