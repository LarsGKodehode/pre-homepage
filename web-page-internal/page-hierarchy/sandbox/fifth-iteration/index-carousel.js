/*
Using the Module Design Pattern to imitate private members and methods.
And to try to be more in line with what I get is a trending Javascript convention.
*/
/*
NOTE TO SELF: Scoping hackery 101
Self contained modules works by creating variables and then discarding all references to them,
except those in the returned members/methods. Making them inaccessible to everything but those.
Works because of Garbage Collection cleaning up all your dirty things.
 */

/**
     * Fetches the next or previous item from items
     *
     * @param container {JQueryElement} scroll-container in which the items can be found
     * @param items {Array} items to be searched through
     * @param isNext {boolean} set to true (default) if you want the next item, to false if you want the previous one
     * @returns {*}
     */
const Carousel = (container, items, isNext) => {

  const carousel = {

  };

  const getNode = () => {};

  const addProject = () => {};


  // public members/methods returned in this object
  return {
    getNode,
    addProject,
  };
};
export default Carousel;