import CustomAPIError from "../errors/custom-error.js";

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
  }

  res.send("Fake Login/Register/Signup");
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, John Doe`,
    secret: `Here is your authorized data, ${luckyNumber}`,
  });
};

export { login, dashboard };
