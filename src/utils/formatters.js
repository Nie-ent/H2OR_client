export const getPositionName = (value) => {
  const positions = {
    developer: "Senior Full Stack Developer",
    designer: "UX/UI Designer",
    marketing: "Digital Marketing Manager",
    backend: "Backend Developer (Node.js)",
    hr: "HR Specialist",
  };
  return positions[value] || value;
};

export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleString("th-TH", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};
