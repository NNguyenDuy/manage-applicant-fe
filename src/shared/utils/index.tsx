export const sanitizeFileName = (fileName: string): string => {
  return fileName.replace(/[\\/:*?"<>|[\]]/g, '')
}

export const upperFirstAndReplaceChar = (str: string): string => {
  return str.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}
