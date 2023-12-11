// 이미지 인덱스를 기반으로 해당하는 이미지의 URL을 반환하는 함수
export function getCoverImageUrl(imageIndex: number) {
  // 이미지 파일의 범위를 0부터 4까지로 제한
  if (imageIndex < 0 || imageIndex > 4) {
    throw new Error("Image index out of range. It should be between 0 and 4.");
  }

  // public 폴더 내의 이미지 파일 경로를 반환
  return `/notebook-cover/${imageIndex}.png`;
}
