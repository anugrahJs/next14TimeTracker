"use client";

import { type PropsWithChildren } from "react";
import { store } from "./store";
import { Provider } from "react-redux";

type ProviderComponentProps = PropsWithChildren;
//PropsWithChildren type returns a prop object with a children key
//it also takes a generic type where we can define our other properties other than the children prop

export const ProviderComponent = ({ children }: ProviderComponentProps) => {
  return <Provider store={store}>{children}</Provider>;
};
