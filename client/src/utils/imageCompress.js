export const imageCompress = async (fileSrc) => {
  const options = {
    maxSizeMB: 1,
    useWebWorker: true,
  };

  try {
    return await imageCompress(fileSrc, options);
  } catch (error) {
    alert(error);
  }
};
