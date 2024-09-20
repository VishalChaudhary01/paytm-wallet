interface InputProps {
     type?: string;
     name: string;
     placeholder?: string;
     className?: string; 
     onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export function Input({ type, placeholder, name, className, onChange }: InputProps) {
     return (
          <input onChange={onChange} type={type || "text"} name={name} className={`border px-4 py-2 rounded-lg outline-none hover:border-blue ${className}`} placeholder={placeholder}/>
     )
}