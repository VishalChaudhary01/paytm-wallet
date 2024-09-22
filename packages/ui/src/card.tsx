
interface CardProps {
     title: string;
     children: React.ReactNode
}
export const Card = ({ children, title }: CardProps) => {
     return (
          <div className="border p-4 rounded-md shadow-md bg-sky-50">
               <h1 className="text-xl text-gray-800 font-medium border-b pb-2">
                    {title}
               </h1>
               <div>
                    {children}
               </div>
          </div>
     )
}