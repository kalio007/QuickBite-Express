const bcrypt = require("bcryptjs");

export const GenerateSalt = async () => {
  return await bcrypt.getsalt();
};

export const GeneratePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};
