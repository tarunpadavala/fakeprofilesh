export function saveAudioBlob(audioData, filename) {
  const blob = new Blob([audioData], { type: 'audio/mpeg' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function combineAudioBlobs(blobs) {
  return new Blob(blobs, { type: 'audio/mpeg' });
}