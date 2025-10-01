export interface StatusCardProps {
  title: string;
  value: string;
  active?: boolean;
  small?: boolean;
  tradeUp?: boolean;
  challenges?: boolean;
  icon?: React.ReactNode;
  tradeIcon?: boolean;
  iconClick?: () => void;
  titleShort?: boolean;
  valueDivStyle?: string;
  valueStyle?: string;
  className?: string;
}
