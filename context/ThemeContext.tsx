import { createContext, ReactNode, useContext, useState } from "react";

type Theme = {
  background: string;
  text: string;
  card: string;
  primary: string;
  input: string;
};

const lightTheme: Theme = {
  background: "#ffffff",
  text: "#000000",
  card: "#f2f2f2",
  primary: "#007bff",
  input: "#ddd",
};

const darkTheme: Theme = {
  background: "#000000",
  text: "#ffffff",
  card: "#111",
  primary: "#ff0000",
  input: "#333",
};

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider
      value={{
        theme: isDark ? darkTheme : lightTheme,
        isDark,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}