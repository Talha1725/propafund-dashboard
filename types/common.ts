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

export interface DataTableProps {
  data: unknown[];
  columns: any[];
  className?: string;
  responsive?: boolean;
  dateHeader?: string;
  showDateHeaders?: boolean;
}

export interface CredentialsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  accountId: string;
  username: string;
  password: string;
  server: string;
  platform?: string;
  showDeleteButton?: boolean;
  onDelete?: () => void;
}

export interface AccountCredentials {
  accountId: string;
  username: string;
  password: string;
  server: string;
  platform?: string;
}

export interface AccountCardProps extends AccountCredentials {
  phase: string;
  tradesCount: number;
  daysTraded: number;
  balance?: boolean;
  isAddNewCard?: boolean;
}

export interface CardContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  customHeader?: React.ReactNode;
}

export interface DataDisplayItemProps {
  label: string;
  value: string;
  valueColor?: "red" | "green" | "white";
  variant?: "horizontal" | "vertical" | "responsive";
}

export interface ChartButtonProps {
  children: string;
  top: string;
  visibility: string;
  isRed?: boolean;
  className?: string;
}

export interface FramedTableProps {
  headers: string[];
  rows: Array<string[]>;
  caption?: string;
  className?: string;
  showHeaders?: boolean;
  showButton?: boolean;
  buttonText?: string;
  boldText?: boolean;
  specialOrderTotal?: boolean;
}

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

export interface PaymentTabsProps {
  selectedPayment: string;
  onPaymentChange: (value: string) => void;
}
