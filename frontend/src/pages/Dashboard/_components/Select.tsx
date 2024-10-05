import React from "react";

type Props = {
  options: { name: string; value: string; labelColor?: string }[];
  name: string;
  className?: string;
  onChange: (e: any) => void;
};

const Select = ({ options, name, className, onChange }: Props) => {
  return (
    <select
      name={name}
      className={`select ${className}`}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map(
        (item: { name: string; value: string; labelColor?: string }) => (
          <option
            key={item.value}
            value={item.value}
            className={`font-light p-2 ${
              item.labelColor && `text-${item.labelColor}-400`
            }`}
          >
            {item.name}
          </option>
        )
      )}
    </select>
  );
};

export default Select;
