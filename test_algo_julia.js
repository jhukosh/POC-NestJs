const findMostOccurring = arr => {
  let counts = arr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
  const occurrencesList = Object.values(counts);
  const maxOccurrence = Math.max(...occurrencesList);
  return Object.keys(counts).filter(k => counts[k] === maxOccurrence);
}

const wordToUniqChar = word => {
  // Find letter with the most occurrences 
  const mostOccurringLetter = findMostOccurring(word.split(''));

  // Replace letters
  const result = word.split('').map( l => {
    const isCurrLetterVowel = 'AEIOU'.includes(l);

    // Check if there is only one most occurring letter
    if (mostOccurringLetter.length === 0) {
      // If the letter is equal to the most occurring one we don't need to replace it
      if ( l === mostOccurringLetter[0]) {
        return l;
      };
      // If the most occurring letter and the current letter don't have the same type
      // we replace the current letter by the most occurring one
      if (('AEIOU'.includes(mostOccurringLetter[0]) && !isCurrLetterVowel) || 
          (!'AEIOU'.includes(mostOccurringLetter[0]) && isCurrLetterVowel)) {
        return mostOccurringLetter[0];
      };
    };

    // If there is not one most occurring letter we replace by the other type
    if (isCurrLetterVowel) {
      return 'B';
    };

    return 'A';

  });

  // Check if all letters are the same and return result
  return result.map( l => l !== result[0] ? result[0] : l).join('');
} 

console.log(wordToUniqChar('BANANA'));
console.log(wordToUniqChar('SUFIANE'));
console.log(wordToUniqChar('FBHC'));
console.log(wordToUniqChar('FOXEN'));
console.log(wordToUniqChar('ABRICOT'));
