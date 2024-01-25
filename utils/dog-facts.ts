export const FechDogFacts = async (): Promise<string[]> => {
  try {
    return (await (await fetch('http://dog-api.kinduff.com/api/facts?number=5')).json()).facts;
  } catch {
    return [];
  }
}