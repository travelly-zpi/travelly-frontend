import React from "react";

interface LoadingContextInterface {
  loading: boolean;
  setLoading: Function;
}

const LoadingContext = React.createContext<LoadingContextInterface>(
  {} as LoadingContextInterface
);

export default LoadingContext;
