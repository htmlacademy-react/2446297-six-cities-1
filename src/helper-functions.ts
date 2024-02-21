function capitalizeFirstLetter(inputString: string): string {
  if (!inputString) {
    return '';
  }
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

export function formatDate(date: string): string {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-US', {year: 'numeric', month: 'long'});
}

export default capitalizeFirstLetter;
