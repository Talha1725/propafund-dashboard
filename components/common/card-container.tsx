import { memo } from "react";
import type { CardContainerProps } from "@/types/common";

const CardContainer = memo<CardContainerProps>(({ 
  title, 
  subtitle, 
  children, 
  className = "",
  headerClassName = "",
  contentClassName = "",
  customHeader
}) => {
  return (
    <div className={`border border-white/10 rounded-[12px] xs:rounded-[16px] sm:rounded-[20px] p-5 xs:p-3 sm:p-5 relative overflow-hidden w-full bg-gradient-to-b from-[rgba(110,110,110,0.1)] to-[rgba(19,19,21,0.02)] ${className}`}>
      {/* Header */}
      <div className={`mb-2 xs:mb-3 sm:mb-5 ${headerClassName}`}>
        {customHeader ? (
          customHeader
        ) : (
          <>
            <h2 className="text-white font-lay-grotesk font-semibold text-lg leading-none">
              {title}
            </h2>
            {subtitle && (
              <p className="font-lay-grotesk font-medium text-lg mt-[3px] xs:mt-[5px]" style={{ color: '#FFFFFF80' }}>
                {subtitle}
              </p>
            )}
          </>
        )}
      </div>
      
      {/* Content */}
      <div className={contentClassName}>
        {children}
      </div>
    </div>
  );
});

CardContainer.displayName = "CardContainer";

export default CardContainer;
