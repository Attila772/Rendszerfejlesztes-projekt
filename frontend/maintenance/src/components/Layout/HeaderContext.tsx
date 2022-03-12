import * as React from "react";

export type HeaderContextType = {
  headerButtons: React.ReactNode;
  setHeaderButtons: (headerButtons: React.ReactNode) => void;
  headerName: React.ReactNode;
  setHeaderName: (headerName: React.ReactNode) => void;
  headerMenuItems: React.ReactNode;
  setHeaderMenuItems: (headerMenuItems: React.ReactNode[]) => void;
};

type Props = {
  children: React.ReactNode;
};

export const HeaderContext = React.createContext({} as HeaderContextType);

export function useHeader() {
  const context = React.useContext(HeaderContext);

  return context;
}

export const HeaderProvider = ({ children }: Props): JSX.Element => {
  const [headerButtons, setHeaderButtonsState] =
    React.useState<React.ReactNode>(null);
  const [headerName, setHeaderName] = React.useState<React.ReactNode>(null);

  const [headerMenuItems, setHeaderMenuItems] =
    React.useState<React.ReactNode>(null);

  function setHeaderButtons(buttons: React.ReactNode) {
    setHeaderButtonsState(buttons);
  }

  return (
    <HeaderContext.Provider
      value={{
        headerButtons,
        setHeaderButtons,
        headerName,
        setHeaderName,
        headerMenuItems,
        setHeaderMenuItems,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
