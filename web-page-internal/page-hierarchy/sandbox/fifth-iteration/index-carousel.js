/*
Using the Module Design Pattern to imitate private members and methods.
And to try to be more in line with what I get is a trending Javascript convention.
*/
/*
NOTE TO SELF: Scoping hackery 101
Self contained modules works by creating variables and then discarding all references to them
except those in the returned members/methods. Making them inaccessible to everything except those.
Works because of Garbage Collection cleaning up all your dirty things.
 */

/**
 * 
 * @returns DOM Node
 */
const Carousel = () => {

const getNode = () => {};

const addProject = () => {};


  // public members/methods returned in this object
  return {
    getNode,
    addProject,
  };
};
export const carousel = Carousel();