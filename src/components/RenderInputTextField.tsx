import {
  ControllerRenderProps,
  FieldValues,
  UseFormTrigger,
} from "react-hook-form";

type inputProps = {
  inputType: string;
  id: string;
  type?: string;
  placeholder?: string;
  field: ControllerRenderProps<FieldValues, string>;
  trigger: UseFormTrigger<FieldValues>;
  options?: string[];
  className?: string;
  //   onChange?: (a: any) => void;
};

const RenderInputTextField = ({
  inputType,
  id,
  type,
  placeholder,
  field,
  trigger,
  options,
  ...props
}: //   onChange,
inputProps) => {
  // onKeyUp={() => {
  //     let timer;
  //     clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       trigger(id as any);
  //       //   console.log("trigger is hit", trigger);
  //     });
  //   }}
  switch (inputType) {
    case "text":
    case "number":
      return (
        <input
          type={type}
          placeholder={placeholder}
          id={id}
          {...field}
          {...props}
          onKeyUp={() => {
            let timer;
            clearTimeout(timer);
            timer = setTimeout(() => {
              trigger(id as any);
              //   console.log("trigger is hit", trigger);
            }, 1000);
          }}
          //   {...field.}
          // name={field.name}
          // ref={field.ref}
          //   onChange={field.onChange}

          //   onChange={() => {}}
        />
      );
    case "textarea":
      return (
        <textarea
          id={id}
          rows={5}
          placeholder={placeholder}
          {...field}
          {...props}
          onKeyUp={() => {
            let timer;
            clearTimeout(timer);
            timer = setTimeout(() => {
              trigger(id as any);
            });
          }}
        />
      );
    case "select":
      return (
        <select id={id} {...field} {...props}>
          <option value="" disabled style={{ color: "gray" }}>
            Client
          </option>
          {options!.map((option) => (
            <option key={Math.random()}>{option}</option>
          ))}
        </select>
      );
    default:
      return (
        <input
          type={type}
          placeholder={placeholder}
          id={id}
          {...field}
          onKeyUp={() => {
            let timer;
            clearTimeout(timer);
            timer = setTimeout(() => {
              trigger(id as any);
            }, 2000);
          }}
        />
      );
  }
};

export default RenderInputTextField;
