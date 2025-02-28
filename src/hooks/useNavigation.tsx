import { useState, createContext, useContext, ReactNode } from "react";

interface NavigationContextType {
  currentPage: string;
  navigateTo: (path: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<string>("home");

  const navigateTo = (path: string) => {
    setCurrentPage(path.toLowerCase());
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation deve ser usado dentro de um NavigationProvider");
  }
  return context;
}
