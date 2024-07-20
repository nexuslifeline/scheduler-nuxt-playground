export const formatDate = (dateString: string) => {
 const dateObj = new Date(dateString);
 const year = dateObj.getFullYear();
 const month = String(dateObj.getMonth() + 1).padStart(2, '0');
 const day = String(dateObj.getDate()).padStart(2, '0');
 return `${year}-${month}-${day}`;
};