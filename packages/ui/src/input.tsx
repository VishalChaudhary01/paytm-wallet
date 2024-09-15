interface InputProps {
     type?: string;
     name: string;
     placeholder?: string;
     className?: string; 
}

export function Input({ type, placeholder, name, className }: InputProps) {
     return (
          <input type={type || "text"} name={name} className={`border px-4 py-2 rounded-lg outline-none hover:border-blue ${className}`} placeholder={placeholder}/>
     )
}