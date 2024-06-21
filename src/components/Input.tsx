import {
  Controller,
  type Control,
  FieldValues,
  UseFormTrigger,
} from "react-hook-form";
import RenderInputTextField from "./RenderInputTextField";

type InputProps = {
  inputType: string;
  label?: string;
  type: string;
  id: string;
  placeholder?: string;
  defaultValue?: string | number;
  control: Control<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
  errors: any;
  options?: string[];
  className?: string;
};

const patternValidation = (type: string) => {
  switch (type) {
    case "name":
      return /^(?! )[\w -]+(?<! )$/;
    case "id":
      return /^(?! )[0-9]+$/;
    case "text":
      return /^(?! )[\w -]+(?<! )$/;
    case "onlyAlphabetsWithoutSpaces":
      return /^(?! )[A-Za-z]+(?: [A-Za-z]+)*$/;
    case "textThatAllowsSpecialCharactersInBetween":
      return /^\S.*\S$|^\S$|^$/;
    case "number":
      return /^[1-9]\d*$/;
    case "email":
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    default:
      return /^.*$/;
  }
};

const errorMessages = (type: string) => {
  switch (type) {
    case "name":
      return "Please enter a valid name which does not start and end with a space and does not have special characters except - or _";
    case "id":
      return "Please enter a valid id which does not start and end with a space and only contains numbers";
    case "text":
      return "Please enter a valid description which does not start with a space and does not have special characters except - or _";
    case "onlyAlphabetsWithoutSpaces":
      return "Only alphabets allowed without any spaces";
    case "textThatAllowsSpecialCharactersInBetween":
      return "Please enter a valid input without any leading or trailing spaces";
    case "number":
      return "Negative numbers, decimal numbers, exponential numbers and 0 are not allowed";
    case "email":
      return "Please enter a valid email address";
    default:
      return "";
  }
};

const Input = ({
  inputType,
  label,
  type,
  id,
  placeholder,
  defaultValue,
  control,
  trigger,
  errors,
  options,
  ...props
}: InputProps) => {
  return (
    <div>
      <label>{label}</label>
      <Controller
        name={id}
        control={control}
        defaultValue={defaultValue}
        // only tab use krte ha when we are fetching data from server
        rules={{
          required: {
            message: "This field is required",
            value: true,
          },
          pattern: {
            value: patternValidation(type),
            message: errorMessages(type),
          },
        }}
        render={({ field }) => {
          return (
            <div className="mb-4">
              <RenderInputTextField
                type={type}
                placeholder={placeholder}
                id={id}
                inputType={inputType}
                field={field}
                trigger={trigger}
                options={options}
                {...props}
              />
              {/* {inputType === "select" && (
                <select id={id} {...field}>
                  {options!.map((option) => (
                    <option>{option}</option>
                  ))}
                </select>
              )}
              {inputType === "textarea" && (
                <textarea
                  id={id}
                  placeholder={placeholder}
                  rows={10}
                  {...field}
                  {...props}
                  onKeyUp={() => {
                    let timer;
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                      trigger(id as any);
                    }, 1000);
                  }}
                />
              )}
              {inputType === undefined && (
                <input
                  type={type}
                  id={id}
                  placeholder={placeholder}
                  {...field}
                  {...props}
                  onKeyUp={() => {
                    let timer;
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                      trigger(id as any);
                    }, 1000);
                  }}
                />
              )} */}

              {errors[id] && typeof errors[id]?.message === "string" ? (
                <div className="text-red-500">{errors[id]?.message}</div>
              ) : null}
            </div>
          );
        }}
      />
    </div>
  );
};

export default Input;
