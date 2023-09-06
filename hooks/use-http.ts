import React from "react";

const defaultErrorMessage =
  "Une erreur est survenue, veuillez essayer plus tard";

const useHttp = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>();
  const [data, setData] = React.useState<any>(undefined);

  const resetError = () => setError(null);

  const sendRequest = async (url: string, options?: RequestInit) => {
    setIsLoading(true);

    try {
      const response = await fetch(url, options);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || defaultErrorMessage);
      }

      setData(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : defaultErrorMessage);
    }

    setIsLoading(false);
  };

  return {
    sendRequest,
    isLoading,
    data,
    error,
    resetError,
  };
};

export default useHttp;
