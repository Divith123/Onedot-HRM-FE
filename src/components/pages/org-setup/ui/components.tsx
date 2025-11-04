import React from 'react';

interface HeaderProps {
  children: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <div className="flex flex-row justify-center items-center gap-2.5 absolute w-[407px] h-10 left-1/2 transform -translate-x-1/2 top-[239px]">
      {children}
    </div>
  );
};

interface WelcomeTextProps {
  text?: string;
}

export const WelcomeText: React.FC<WelcomeTextProps> = ({
  text = "Welcome to OneDot HRM ! Let's get you set up."
}) => {
  return (
    <div className="absolute w-[481px] h-5 left-1/2 transform -translate-x-1/2 top-[297px] font-medium text-xl leading-none text-black" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {text}
    </div>
  );
};

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  disabled = false
}) => {
  return (
    <button
      className="flex flex-row justify-center items-center px-4 py-1.5 gap-2 absolute w-[280px] h-[60px] min-h-9 left-[819px] top-[399px] bg-[#03A9F5] shadow-lg rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  onClick,
  disabled = false
}) => {
  return (
    <button
      className="flex flex-row justify-center items-center px-4 py-1.5 gap-2 absolute w-[278px] h-9 min-h-9 left-[820px] top-[473px] bg-white/10 border border-[#03A9F5] shadow-sm rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

interface InputChipProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

export const InputChip: React.FC<InputChipProps> = ({
  children,
  selected = false,
  onClick
}) => {
  return (
    <div
      className={`flex flex-row justify-center items-center px-0 absolute w-[116px] h-8 left-[902px] top-[527px] border border-[#CAC4D0] rounded-lg cursor-pointer ${
        selected ? 'bg-[#03A9F5] text-white' : 'bg-transparent'
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
