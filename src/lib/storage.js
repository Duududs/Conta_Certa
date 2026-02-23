export function getStorageValue(key, fallbackValue) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallbackValue;
    return JSON.parse(raw);
  } catch (error) {
    console.warn(`Falha ao ler localStorage em "${key}"`, error);
    return fallbackValue;
  }
}

export function setStorageValue(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Falha ao salvar localStorage em "${key}"`, error);
    return false;
  }
}
