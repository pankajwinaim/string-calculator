export default function add(numbers: string): number {
    // Replace non-digit and non-minus characters with a comma
    numbers = numbers.split('').map((item) => ((item >= '0' && item <= '9') || item === '-') ? item : ',').join('');
    
    if (numbers === '') return 0;
  
    let delimiter: RegExp = /,|\n/;
    const customDelimiterMatch = numbers.match(/^\/\/(\[.*?\]|.)\n/);
    
    if (customDelimiterMatch) {
      let customDelimiter = customDelimiterMatch[1];
      
      if (customDelimiter.startsWith('[') && customDelimiter.endsWith(']')) {
        customDelimiter = customDelimiter.slice(1, -1);
      }
      
      // Escape the custom delimiter for use in a regular expression
      delimiter = new RegExp(customDelimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
      numbers = numbers.substring(customDelimiterMatch[0].length);
    }
  
    const numArray = numbers.split(delimiter);
    const negatives = numArray.filter(num => parseInt(num, 10) < 0);
  
    if (negatives.length > 0) {
      throw new Error(`negative numbers not allowed: ${negatives.join(', ')}`);
    }
  
    return numArray.reduce((sum, num) => sum + (parseInt(num, 10) || 0), 0);
  }
  
  // Example usage:
  // console.log(add('//;\n1;2')); // Output: 3
  