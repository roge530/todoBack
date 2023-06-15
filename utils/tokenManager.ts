import jwt, { Secret } from "jsonwebtoken";

export interface TokenData {
  uid: string;
}

export interface TokenResult {
  token: string;
  expiresIn: number;
}

export const generateToken = (uid: string): TokenResult => {
  try {
    const expiresIn = 60 * 15;
    const token = jwt.sign({ uid }, process.env.JWT_SECRET as Secret, {
      expiresIn,
    });
    return { token, expiresIn };
  } catch (error) {
    console.log(error);
    throw new Error("Error al generar el token");
  }
};
