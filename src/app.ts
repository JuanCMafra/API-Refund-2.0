import express from "express";
import "express-async-errors";
import cors from "cors";
import { errorHandler } from "./middlewares/error-handler";
import { routes } from "./routes";
import uploadConfig from "@/configs/upload";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes);

app.use(errorHandler);

export { app };
