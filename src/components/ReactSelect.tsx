import { Control, Controller, FieldValues } from "react-hook-form";
import Select, { GroupBase, Props } from "react-select";

const ReactSelect = <
  Option,
  isMulti extends boolean,
  Group extends GroupBase<Option>
>({
  id,
  control,
  errors,
  onChange,
  ...props
}: Props<Option, isMulti, Group> & {
  id: string;
  control: Control<FieldValues>;
  errors: any;
  // trigger: (name: string) => void;
  // getValues: any;
}) => {
  return (
    <Controller
      name={id}
      control={control}
      // defaultValue=""
      rules={{
        required: {
          value: true,
          message: "Please select an option",
        },
      }}
      render={({ field }) => {
        return (
          <>
            {/* {value.length === 0 ? (errors[id].message = "") : null} */}
            <Select
              {...field}
              {...props}

              // value={props.getValues("designPattern")}
            />
            {errors[id] && typeof errors[id]?.message === "string" && (
              <p className="text-red-500">{errors[id]?.message}</p>
            )}
          </>
        );
      }}
    />
  );
};

export default ReactSelect;

// const { name: buttonName } = e.currentTarget;
// const optionFound = selected.find((option) => option.value === buttonName);

// if (!optionFound) {
//   return;
// }
// const filteredOptions = .filter((option) => option.value !== optionFound.value)
// setValue("designPattern", values);
// // setSelected((prevState) =>
// //   prevState.filter((option) => option.value !== optionFound.value)
// // );
