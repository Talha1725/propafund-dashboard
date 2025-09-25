export interface FramedTableProps {
  headers: string[];
  rows: Array<string[]>;
  caption?: string;
  className?: string;
}

export type IconPosition = "bottom-left" | "below-text";
export type IconType = "icon" | "button";

export interface ToolCardProps {
  overrideImage?: any;
  iconPosition?: IconPosition;
  iconType?: IconType;
  buttonText?: string;
  customTitle?: string;
  customDescription?: string;
}

export interface ToolCardsProps {
  title1: string; title2: string; title3: string;
  content1: string; content2: string; content3: string;
  image1: any; image2: any; image3: any;
  icon1?: any; icon2?: any; icon3?: any;
  iconPosition?: IconPosition; // same for all three
  iconType?: IconType; // same for all three
  buttonText1?: string; buttonText2?: string; buttonText3?: string;
  blobClasses?: [string, string, string];
  imageWrapperClasses?: [string, string, string];
  className?: string;
}

export interface SectionHeaderProps {
  title: string;
  text: string;
  className?: string;
}

export interface FrameProps {
  children: React.ReactNode;
  variants?: "white" | "gradient" | "none";
  className?: string;
  topBottomThicknessPx?: number;
  sideThicknessPx?: number;
}

export interface PriceBarProps {
  prices: (string | number)[];
  className?: string;
}


