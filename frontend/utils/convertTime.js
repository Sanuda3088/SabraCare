const convertTime = time => {
    const timeParts = time.split(':');
    let hours = parseInt(timeParts[0]);  // Corrected 'parent' to 'parseInt'
    let minutes = parseInt(timeParts[1]);
  
    let meridiem = 'am';
  
    if (hours >= 12) {  // Modified the condition to '>= 12' to handle noon properly
      meridiem = 'pm';
  
      if (hours > 12) {
        hours -= 12;
      }
    }
  
    return (
      hours.toString().padStart(2, '0') + ":" +
      minutes.toString().padStart(2, '0') +
      " " + meridiem
    );
  };
  
  export default convertTime;
  