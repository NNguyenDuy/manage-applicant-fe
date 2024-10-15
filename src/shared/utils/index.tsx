export const sanitizeFileName = (fileName: string): string => {
  return fileName.replace(/[\\/:*?"<>|[\]]/g, '')
}

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const statusApply = [
  { label: 'chưa xem', value: 'submitted' },
  { label: 'đang xem xét', value: 'under_review' },
  { label: 'đã chấp nhận', value: 'accepted' },
  { label: 'đã từ chối', value: 'rejected' },
]
