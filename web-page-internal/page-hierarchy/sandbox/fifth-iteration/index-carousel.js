/*
Using the Module Design Pattern to imitate classes with private members and methods.
And to try to be more in line with what I get is a trending Javascript convention.
*/
/*
NOTE TO SELF: Scoping hackery 101
Self contained modules works by creating variables and then discarding all references to them,
except those in the returned members/methods. Making them inaccessible to everything but them.
Works because of Garbage Collection cleaning up all your dirty things.
 */

/**
     * Create a carusel virtual DOM node as specified
     * @param createInfo {Object} object containing all the variables used for initialization of "psuedo class"
     * @returns {*}
     */
const Carousel = (createInfo) => {

  const carousel = {}; // virtual carousel object

  const getCarousel = () => {};

  const addProject = () => {};


  // public members/methods to expose
  return {
    getCarousel,
    addProject,
  };
};

// This works
export const carusel = Carousel();

// This does not
// export default Carousel();