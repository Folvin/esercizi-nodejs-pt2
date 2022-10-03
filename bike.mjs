
/**
 * Complete this code to inject the Wheel instance dependencies into the Bike instance
 */

class Bike {
  constructor() {
    this.wheel1 = null
    this.wheel2 = null
  }

  build(frontWheel, backWheel) {
    this.wheel1 = frontWheel
    this.wheel2 = backWheel
  }

  specification() {
    let message = `${this.wheel1.label} wheel diameter = ${this.wheel1.diameter}`;
    message += `, ${this.wheel2.label} wheel diameter = ${this.wheel2.diameter}`;

    return message;
  }
}

class Wheel {
  constructor(label, diameter) {
    this.label = label;
    this.diameter = diameter;
  }
}

const frontWheel = new Wheel("Front", 126);
const backWheel = new Wheel("Back", 42);

const bike = new Bike();

bike.build(frontWheel, backWheel)

console.log(bike);

console.log("Bike specification:", bike.specification());
