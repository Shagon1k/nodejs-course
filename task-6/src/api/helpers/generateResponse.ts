const generateResponse = (data?: Record<string, any>, error?: string) => ({
  data: data || null,
  error: error || null,
});

export default generateResponse;
