export const fetchPdfData = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error fetching PDF data:', error);
      throw error;
    }
  };
  