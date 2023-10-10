function addDateTime(message) {
  const dateTimeNow = new Date();
  const dateStr = dateTimeNow.toLocaleDateString();
  const heureStr = dateTimeNow.toLocaleTimeString();

  return dateStr + " " + heureStr + " : " + message;
}

const defaultMessage =
  "This is the best moment to have a look at this website !";
alert(addDateTime(defaultMessage));
