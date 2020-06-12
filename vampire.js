class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let count = 0;
    let curr = this;
    while (curr.creator) {
      curr = curr.creator;
      count += 1;
    }
    return count;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (!this.name) return null;
    let vamps = [this];
    while (vamps.length) {
      let curr = vamps.pop();
      if (curr.name === name) {
        return curr;
      } else {
        if (curr.offspring) {
          vamps = [...vamps, ...curr.offspring];
        }
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let count = 0;
    let vamps = this.offspring;
    while (vamps.length) {
      let curr = vamps.pop();
      count += 1;
      if (curr.offspring) {
        vamps = [...vamps, ...curr.offspring];
      }
    }
    return count;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millenials = [];
    let vamps = [this];
    while (vamps.length) {
      let curr = vamps.pop();
      if (curr.yearConverted > 1980) {
        millenials.push(curr);
      }
      if (curr.offspring) {
        vamps = [...vamps, ...curr.offspring];
      }
    }
    return millenials;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let curr = this;
    let other = vampire;
    let currNumFromCreator = this.numberOfVampiresFromOriginal;
    let otherNumFromCreator = vampire.numberOfVampiresFromOriginal;

    if (!curr.creator || !other.creator) {
      return !curr.creator ? curr : other;
    }

    while (currNumFromCreator > otherNumFromCreator) {
      currNumFromCreator -= 1;
      curr = curr.creator;
    }

    while (otherNumFromCreator > currNumFromCreator) {
      otherNumFromCreator -= 1;
      other = other.creator;
    }
     
    if (curr.name === other.name) {
      return curr;
    }

    while (curr.creator.name !== other.creator.name) {
      curr = curr.creator;
      other = other.creator;
    }

    return curr.creator;
  }
}

module.exports = Vampire;

