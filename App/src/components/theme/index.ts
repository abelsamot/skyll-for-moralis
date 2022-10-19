const defaultTheme = {
    border: '0px solid #5c4dff',
    borderRadius: "6px",
    fontWeight:"800px",
    primaryFont: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
    primaryFontColor: '#282c34',
    treeBackgroundColor: '#282c34',
    disabledTreeOpacity: 0.8,
    headingFont: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
    headingFontColor: 'black',
    headingFontSize: '24px',
    headingHoverColor: '#35373b',
    headingHoverColorTransition: 'background 0.3s ease-out',
    tooltipBackgroundColor: 'white',
    tooltipFontColor: '#282c34',
    tooltipZIndex: 99999,
    nodeBackgroundColor: '#282c34',
    nodeBorderColor: 'white',
    nodeAlternativeFontColor: '#282c34',
    nodeAltenativeActiveFontColor: '#282c34',
    nodeOverlayColor: 'white',
    nodeAlternativeActiveBackgroundColor: `
    linear-gradient(
      to right,
      #b9e562 0%,
      #41e2bd 50%,
      #c284d8 100%
    )`,
    nodeActiveBackgroundColor: "white",
    nodeHoverBorder: '4px solid ',
    nodeHoverBorderColor: "#6aeb87",
    nodeIconWidth: '64px',
    nodeMobileTextNodeHeight: '32px',
    nodeMobileTextNodeWidth: '108px',
    nodeMobileFontSize: '14px',
    nodeDesktopTextNodeHeight: '28px',
    nodeDesktopTextNodeWidth: '144px',
    nodeDesktopFontSize: '16px',
    edgeBorder: '1px solid white',
  };
  
  export type SkillTheme = typeof defaultTheme;
  
  export default defaultTheme;