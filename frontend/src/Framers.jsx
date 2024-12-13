export const fadeIn = (direction, delay) => {
    return {
      hidden: {
        y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
        x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
        opacity: 0, 
      },
      show: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
          type: 'tween',
          duration: 1.2,
          delay: delay,
          ease: [0.25, 0.25, 0.25, 0.75],
        },
      },
    };
  };
  
  export const scaleIn = (delay) => {
    return {
      hidden: {
        scale: 0,
        opacity: 0,
      },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          type: 'spring',
          duration: 2, 
          delay: delay,
          stiffness: 100,
          damping: 20,
        },
      },
    };
  };

  export const slideIn = (direction, delay) => {
    return {
      hidden: {
        x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
        y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
        opacity: 0,
      },
      show: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          type: 'tween',
          duration: 2, 
          delay: delay,
          ease: [0.25, 0.1, 0.25, 1],
        },
      },
    };
  };
  

  export const bounce = (delay) => {
    return {
      hidden: {
        y: -50,
        opacity: 0,
      },
      show: {
        y: [0, -20, 0], 
        opacity: 1,
        transition: {
          type: 'spring',
          duration: 2, 
          delay: delay,
          stiffness: 300,
          damping: 10,
        },
      },
    };
  };

  
  export const fadeOut = (delay) => {
    return {
      hidden: {
        opacity: 1,
      },
      show: {
        opacity: 0,
        transition: {
          type: 'tween',
          duration: 2, 
          delay: delay,
          ease: 'easeOut',
        },
      },
    };
  };
  
  