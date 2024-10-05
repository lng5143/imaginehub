import { Paddle, Environment } from "@paddle/paddle-node-sdk";

const PADDLE_API_KEY = process.env.PADDLE_API_KEY;

export const paddle = new Paddle(PADDLE_API_KEY, { environment: Environment.Sandbox });