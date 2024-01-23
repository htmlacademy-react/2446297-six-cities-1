function capitalizeFirstLetter(inputString: string): string {
  if (!inputString) {
    return '';
  }
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

export default capitalizeFirstLetter;
