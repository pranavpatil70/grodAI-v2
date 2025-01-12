export const cpanelStorage = {
  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('directory', 'tts-files'); // Subdirectory in your hosting

    try {
      const response = await fetch(`${process.env.REACT_APP_CPANEL_UPLOAD_URL}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_CPANEL_API_KEY}`
        }
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data.fileUrl; // URL to the uploaded file
    } catch (error) {
      throw new Error('Error uploading to cPanel: ' + error.message);
    }
  }
}; 