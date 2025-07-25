import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }

    body {
      font-family: 'Roboto', -apple-system, sans-serif;
        background-color: ${({ theme }: { theme: Record<string, any> }) => theme?.colors?.background};
        color: ${({ theme }: { theme: Record<string, any> }) => theme?.colors?.textPrimary};
      height: 100vh;
        
        #root {
            height: 100vh;
        }
    }

    a {
      text-decoration: none;
      color: inherit;
    }
`;
