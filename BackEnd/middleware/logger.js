const SENSITIVE = ["password", "confirmPassword"];

const redact = (body) =>
  Object.fromEntries(
    Object.entries(body).map(([key, value]) => [
      key,
      SENSITIVE.includes(key) ? "[hidden]" : value,
    ])
  );

const logger = (req, res, next) => {
  console.log(` ${req.method} Request received at ${req.url}`);
  if (req.body && Object.keys(req.body).length) {
    console.log("Request body: ", redact(req.body));
  }
  next();
};
export default logger;
