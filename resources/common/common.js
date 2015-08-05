function generateRandomNumber(maxLimit){
   return(Math.floor((Math.random() * maxLimit) + 1));
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
