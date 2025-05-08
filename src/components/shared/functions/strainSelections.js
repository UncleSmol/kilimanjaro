/**
 * Utility functions for strain selections
 */

/**
 * Shuffles an array using the Fisher-Yates algorithm
 * @param {Array} array The array to shuffle
 * @returns {Array} A new shuffled array
 */
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Gets the weekly strain selections
 * Shuffles every 3 days
 * @param {Array} strains The array of all strains
 * @param {number} count The number of strains to select
 * @returns {Array} Selected strains
 */
export const getWeeklySelections = (strains, count = 3) => {
  // Check if we need to reshuffle
  const now = new Date().getTime();
  const lastShuffleTime = localStorage.getItem('lastStrainShuffleTime');
  const shuffledStrains = localStorage.getItem('shuffledStrains');
  
  // 3 days in milliseconds
  const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
  
  // If we have a previous shuffle that's less than 3 days old, use it
  if (lastShuffleTime && shuffledStrains && (now - parseInt(lastShuffleTime)) < threeDaysMs) {
    try {
      const parsedStrains = JSON.parse(shuffledStrains);
      // Return only the requested count
      return parsedStrains.slice(0, count);
    } catch (e) {
      console.error('Error parsing stored strains:', e);
      // Continue to generate new selections if parsing fails
    }
  }
  
  // Otherwise, create a new shuffle
  const shuffled = shuffleArray(strains);
  const selections = shuffled.slice(0, count);
  
  // Store the shuffle time and selections
  localStorage.setItem('lastStrainShuffleTime', now.toString());
  localStorage.setItem('shuffledStrains', JSON.stringify(selections));
  
  return selections;
};

/**
 * Forces a reshuffle of the weekly selections
 */
export const forceReshuffle = () => {
  localStorage.removeItem('lastStrainShuffleTime');
  localStorage.removeItem('shuffledStrains');
};