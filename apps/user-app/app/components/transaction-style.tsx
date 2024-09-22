export const getStatusText = (status: string) => {
     switch (status) {
       case "Success":
         return "Received";
       case "Processing":
         return "Processing";
       case "Failure":
         return "Failed";
       default:
         return "";
     }
};
   
export const getStatusColor = (status: string) => {
     switch (status) {
          case "Success":
          return "text-green-600";
          case "Processing":
          return "text-yellow-500";
          case "Failure":
          return "text-red-600";
          default:
          return "";
     }
};
   
export const getAmountColor = (status: string) => {
     switch (status) {
       case "Success":
         return "text-green-600";
       case "Processing":
         return "text-yellow-500";
       case "Failure":
         return "text-red-600";
       default:
         return "";
     }
};