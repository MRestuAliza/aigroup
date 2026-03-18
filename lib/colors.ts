export const getColorClasses = (color: string) => {
  switch (color) {
    case "green": return "bg-green-100 text-green-700 hover:bg-green-200";
    case "blue": return "bg-blue-100 text-blue-700 hover:bg-blue-200";
    case "pink": return "bg-pink-100 text-pink-700 hover:bg-pink-200";
    case "purple": return "bg-purple-100 text-purple-700 hover:bg-purple-200";
    case "yellow": return "bg-yellow-100 text-yellow-700 hover:bg-yellow-200";
    default: return "bg-gray-100 text-gray-700 hover:bg-gray-200";
  }
};