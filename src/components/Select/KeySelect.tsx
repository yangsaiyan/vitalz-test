import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface KeySelectProps {
  value: string;
  onChange: (value: string) => void;
  keys: string[];
}

export function KeySelect(props: KeySelectProps) {
  const { value, onChange, keys } = props;

  return (
    <div className="w-full max-w-[200px]">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full text-white !border-[rgba(255,255,255,0.3)]">
          <SelectValue placeholder="Select key" />
        </SelectTrigger>
        <SelectContent className="text-white bg-[#3d3d3d]">
          {keys.map((key) => (
            <SelectItem key={key} value={key}>
              {key}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
