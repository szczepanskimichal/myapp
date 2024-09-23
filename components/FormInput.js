import { AnimatePresence } from "framer-motion";

export default function FormInput({
  label,
  type,
  value,
  onChange,
  creatingUser,
  error,
}) {
  return (
    <>
      <div className="flex justify-between">
        <label>{label}</label>
        <AnimatePresence>{error !== null && <ErrorMessage />}</AnimatePresence>
      </div>
      <input
        type={type}
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={creatingUser}
      />
    </>
  );
}
