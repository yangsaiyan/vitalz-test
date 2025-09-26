"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface DatepickerProps {
  onChange: (date: string) => void;
}

export function Datepicker(props: DatepickerProps) {
  const { onChange } = props;
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    if (date) {
      onChange(
        date?.getFullYear() + "-" + date?.getMonth() + "-" + date?.getDate()
      );
    }
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal !border-[rgba(255,255,255,0.3)] border-1"
        >
          <CalendarIcon />
          {date ? (
            format(date, "PPP")
          ) : (
            <span className="text-white">Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-[#3d3d3d] border-none">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          classNames={{
            root: "text-[10px]",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
